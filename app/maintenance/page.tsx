import type { Metadata } from "next";
import { contactInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Website in opbouw | Architectenbureau Paul Kindt",
  description:
    "Onze website is momenteel in opbouw. Neem gerust contact met ons op.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[oklch(0.145_0_0)] text-[oklch(0.985_0_0)] flex flex-col items-center justify-center px-6">
      {/* Logo / Studio name */}
      <div className="mb-12 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[oklch(0.65_0_0)] mb-3">
          Architectenbureau
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase">
          Paul Kindt
        </h1>
      </div>

      {/* Divider */}
      <div className="w-12 border-t border-[oklch(0.45_0_0)] mb-12" />

      {/* Message */}
      <div className="text-center max-w-md mb-16">
        <h2 className="text-lg font-light tracking-wide mb-4">
          Website in opbouw
        </h2>
        <p className="text-[oklch(0.65_0_0)] text-sm leading-relaxed">
          We zijn druk bezig om onze nieuwe website klaar te maken.
          <br />
          Kom binnenkort terug voor meer informatie over onze projecten en
          diensten.
        </p>
      </div>

      {/* Contact */}
      <div className="text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[oklch(0.45_0_0)] mb-5">
          Contacteer ons
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-[oklch(0.85_0_0)] hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 1.27h3.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.05 6.05l1.2-1.24a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z" />
            </svg>
            {contactInfo.phone}
          </a>
          <span className="hidden sm:block w-px h-4 bg-[oklch(0.3_0_0)]" />
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-[oklch(0.85_0_0)] hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {contactInfo.email}
          </a>
        </div>
      </div>

      {/* Footer note */}
      <p className="absolute bottom-6 text-[oklch(0.35_0_0)] text-xs tracking-wider">
        © {new Date().getFullYear()} Architectenbureau Paul Kindt
      </p>
    </div>
  );
}
