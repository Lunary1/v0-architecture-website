import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";
import { contactInfo } from "@/lib/data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactFormSchema.parse(body);

    // Send email via Resend
    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactInfo.email,
      replyTo: validatedData.email,
      subject: `Nieuw contactformulier van ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nieuw bericht via contactformulier</h2>
          
          <p><strong>Naam:</strong> ${escapeHtml(validatedData.name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(validatedData.email)}</p>
          
          ${validatedData.phone ? `<p><strong>Telefoon:</strong> ${escapeHtml(validatedData.phone)}</p>` : ""}
          
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
      return Response.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 },
      );
    }

    return Response.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return Response.json({ error: "Invalid form data" }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

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
