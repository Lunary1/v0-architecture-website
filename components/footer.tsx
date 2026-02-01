import Link from "next/link";
import { contactInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const formatPhoneLink = (phone: string) => {
    return phone.replace(/\s+/g, "");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-light tracking-widest mb-6">
              PAUL KINDT
            </h4>
            <p className="font-light opacity-70 text-sm leading-relaxed">
              Modern architecture studio specializing in residential,
              industrial, and interior design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-light tracking-widest opacity-50 mb-6">
              PAGINA'S
            </h4>
            <div className="space-y-3">
              <Link
                href="/"
                className="block font-light opacity-70 hover:opacity-100 transition text-sm"
              >
                Home
              </Link>
              <Link
                href="/projecten"
                className="block font-light opacity-70 hover:opacity-100 transition text-sm"
              >
                Projecten
              </Link>
              <Link
                href="/over"
                className="block font-light opacity-70 hover:opacity-100 transition text-sm"
              >
                Over Ons
              </Link>
              <Link
                href="/nieuws"
                className="block font-light opacity-70 hover:opacity-100 transition text-sm"
              >
                Nieuws
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-light tracking-widest opacity-50 mb-6">
              CONTACT
            </h4>
            <div className="space-y-3 text-sm">
              <p className="font-light opacity-70">
                <a
                  href={`tel:${formatPhoneLink(contactInfo.phone)}`}
                  className="hover:opacity-100 transition"
                >
                  {contactInfo.phone}
                </a>
              </p>
              <p className="font-light opacity-70">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:opacity-100 transition"
                >
                  {contactInfo.email}
                </a>
              </p>
              <p className="font-light opacity-70">
                {contactInfo.address}
                <br />
                {contactInfo.city}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-light tracking-widest opacity-50 mb-6">
              VOLGEN
            </h4>
            <div className="space-y-3">
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-light opacity-70 hover:opacity-100 transition text-sm"
              >
                Facebook
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-light opacity-70 hover:opacity-100 transition text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light opacity-50">
            <p>&copy; {currentYear} Studio Architecten. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:opacity-100 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:opacity-100 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
