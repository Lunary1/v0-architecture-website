import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";
import { contactInfo } from "@/lib/data";

// Simple in-memory rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, number[]>();

// Helper function to escape HTML in user input
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Get client IP address
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";
  return ip;
}

// Rate limiting: max 5 submissions per IP per hour
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, [now]);
    return true;
  }

  const timestamps = rateLimitStore.get(ip)!;
  const recentSubmissions = timestamps.filter((time) => time > oneHourAgo);

  if (recentSubmissions.length >= 5) {
    return false; // Rate limit exceeded
  }

  recentSubmissions.push(now);
  rateLimitStore.set(ip, recentSubmissions);
  return true;
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      },
    );

    const data = await response.json();

    // v3: Accept if score > 0.5 (0.0 is bot, 1.0 is human)
    // v2: Accept if success is true
    if (data.score !== undefined) {
      return data.success && data.score > 0.5;
    }

    return data.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // Check rate limiting
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { captchaToken, honeypot, ...formData } = body;

    // Honeypot check: if honeypot field is filled, it's likely a bot
    if (honeypot && honeypot.trim() !== "") {
      console.warn(`[SPAM] Honeypot triggered from IP: ${clientIp}`);
      // Return success to prevent bot enumeration, but don't send email
      return NextResponse.json(
        { success: true, messageId: "honeypot_caught" },
        { status: 200 },
      );
    }

    // Validate reCAPTCHA if token provided (optional for better UX testing)
    if (captchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      const isValidCaptcha = await verifyRecaptcha(captchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 },
        );
      }
    }

    // Validate form data
    const validatedData = contactFormSchema.parse(formData);

    // Additional spam checks
    const messageLength = validatedData.message.trim().length;
    if (messageLength < 10 || messageLength > 5000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters." },
        { status: 400 },
      );
    }

    // Check for common spam patterns
    const spamPatterns = [
      /viagra|cialis|casino|lottery|buy now|click here/gi,
      /http[s]?:\/\/[^\s]+/gi, // Multiple URLs
    ];

    const messageText = validatedData.message.toLowerCase();
    let urlCount = (validatedData.message.match(/https?:\/\//gi) || []).length;

    if (
      spamPatterns.some((pattern) => pattern.test(messageText)) ||
      urlCount > 2
    ) {
      console.warn(`[SPAM] Suspicious content detected from IP: ${clientIp}`);
      return NextResponse.json(
        {
          error:
            "Your message was flagged as spam. Please review and try again.",
        },
        { status: 400 },
      );
    }

    // Initialize Resend only when route is called
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactInfo.email,
      replyTo: validatedData.email,
      subject: `Nieuw contactformulier van ${escapeHtml(validatedData.name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nieuw bericht via contactformulier</h2>
          
          <p><strong>Naam:</strong> ${escapeHtml(validatedData.name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(validatedData.email)}</p>
          
          ${validatedData.company ? `<p><strong>Bedrijf:</strong> ${escapeHtml(validatedData.company)}</p>` : ""}
          ${validatedData.phone ? `<p><strong>Telefoon:</strong> ${escapeHtml(validatedData.phone)}</p>` : ""}
          ${validatedData.projectType ? `<p><strong>Projecttype:</strong> ${escapeHtml(validatedData.projectType)}</p>` : ""}
          ${validatedData.budget ? `<p><strong>Budget:</strong> ${escapeHtml(validatedData.budget)}</p>` : ""}
          
          <h3>Bericht:</h3>
          <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${escapeHtml(validatedData.message)}
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">
            Dit e-mailbericht werd automatisch gegenereerd door het contactformulier op www.architect-kindt.be
          </p>
        </div>
      `,
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, messageId: result.data.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
