import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
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
            <div className="w-12 h-px bg-primary-foreground/30 mb-4" />
            <h4 className="text-lg font-light tracking-widest mb-6 uppercase">
              Architectenbureau PAUL KINDT
            </h4>
            <p className="font-light opacity-70 text-sm leading-relaxed">
              Architectenbureau gespecialiseerd in residentiële architectuur en
              renovatie.
            </p>
          </div>

          {/* Quick Links */}
          <div className="border-l border-primary-foreground/10 pl-8">
            <h4 className="text-sm font-light tracking-widest opacity-50 mb-6">
              PAGINA'S
            </h4>
            <div className="space-y-3">
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/projecten" className="footer-link">
                Projecten
              </Link>
              <Link href="/over" className="footer-link">
                Over Ons
              </Link>
              <Link href="/nieuws" className="footer-link">
                Nieuws
              </Link>
              <Link href="/contact" className="footer-link">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-l border-primary-foreground/10 pl-8">
            <h4 className="text-sm font-light tracking-widest opacity-50 mb-6">
              CONTACT
            </h4>
            <div className="space-y-4 text-sm">
              <a
                href={`tel:${formatPhoneLink(contactInfo.phone)}`}
                className="flex items-start gap-3 font-light opacity-70 hover:opacity-100 transition group"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary-foreground transition" />
                <span>{contactInfo.phone}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-start gap-3 font-light opacity-70 hover:opacity-100 transition group"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary-foreground transition" />
                <span>{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 font-light opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  {contactInfo.address}
                  <br />
                  {contactInfo.city}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-l border-primary-foreground/10 pl-8">
            <h4 className="text-sm font-light tracking-widest opacity-50 mb-6">
              VOLGEN
            </h4>
            <div className="flex gap-4">
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-button"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-button"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light opacity-50">
            <p>
              &copy; {currentYear} Architectenbureau Paul Kindt. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacybeleid" className="footer-link">
                Privacybeleid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
