import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";
import { contactInfo } from "@/lib/data";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

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
