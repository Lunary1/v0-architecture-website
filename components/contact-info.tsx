import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { contactInfo } from "@/lib/data";

export default function ContactInfo() {
  const formatPhoneLink = (phone: string) => {
    return phone.replace(/\s+/g, "");
  };

  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24 bg-secondary/30 border-r border-border">
      <div className="max-w-lg mx-auto lg:mx-0">
        <h2 className="text-2xl font-light tracking-tight mb-8">
          Contact Informatie
        </h2>

        {/* Address */}
        <div className="mb-10">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-2">
                ADRES
              </h3>
              <p className="font-light text-foreground mb-1">
                {contactInfo.name}
              </p>
              <p className="font-light text-muted-foreground text-sm leading-relaxed">
                {contactInfo.address}
                <br />
                {contactInfo.city}
                <br />
                {contactInfo.country}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-10">
          <div className="flex items-start gap-3 mb-4">
            <Phone className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-2">
                TELEFOON
              </h3>
              <p className="font-light text-foreground">
                <a
                  href={`tel:${formatPhoneLink(contactInfo.phone)}`}
                  className="hover:text-muted-foreground transition"
                >
                  {contactInfo.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-2">
                E-MAIL
              </h3>
              <p className="font-light text-foreground">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-muted-foreground transition"
                >
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="mb-10">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-3">
                KANTOORUREN
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between gap-8">
                  <span className="font-light text-muted-foreground text-sm">
                    Maandag - Vrijdag
                  </span>
                  <span className="font-light text-foreground text-sm">
                    {contactInfo.hours}
                  </span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="font-light text-muted-foreground text-sm">
                    Zaterdag & Zondag
                  </span>
                  <span className="font-light text-foreground text-sm">
                    Gesloten
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BTW Number */}
        <div className="mb-10 pb-10 border-b border-border">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-2">
            BTW-NUMMER
          </h3>
          <p className="font-light text-foreground">{contactInfo.btw}</p>
        </div>

        {/* Social Links */}
        <div className="pt-6">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-4">
            VOLG ONS
          </h3>
          <div className="flex gap-4">
            <a
              href={contactInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition group"
            >
              <Facebook className="w-5 h-5" />
              <span className="text-sm font-light">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
