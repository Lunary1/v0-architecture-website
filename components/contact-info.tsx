import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Share2,
  Facebook,
} from "lucide-react";
import { contactInfo } from "@/lib/data";

export default function ContactInfo() {
  const formatPhoneLink = (phone: string) => {
    return phone.replace(/\s+/g, "");
  };

  const InfoItem = ({
    icon: Icon,
    label,
    children,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="pb-10 border-b border-border/50 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-3 mb-2">
        <Icon className="w-5 h-5 text-muted-foreground/70 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground/50 mb-2">
            {label}
          </h3>
          <div className="font-light text-foreground/90">{children}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:pr-12 py-0">
      <div className="mb-8">
        <h3 className="text-sm font-light tracking-widest text-muted-foreground/50">
          CONTACT
        </h3>
      </div>
      <div className="space-y-0">
        <InfoItem icon={MapPin} label="ADRES">
          <div className="space-y-1">
            <p>{contactInfo.name}</p>
            <p className="text-sm text-muted-foreground">
              {contactInfo.address}
              <br />
              {contactInfo.city}
              <br />
              {contactInfo.country}
            </p>
          </div>
        </InfoItem>

        <InfoItem icon={Phone} label="TELEFOON">
          <a
            href={`tel:${formatPhoneLink(contactInfo.phone)}`}
            className="opacity-80 hover:opacity-100 transition"
          >
            {contactInfo.phone}
          </a>
        </InfoItem>

        <InfoItem icon={Mail} label="E-MAIL">
          <a
            href={`mailto:${contactInfo.email}`}
            className="opacity-80 hover:opacity-100 transition"
          >
            {contactInfo.email}
          </a>
        </InfoItem>

        <InfoItem icon={Clock} label="KANTOORUREN">
          <div className="space-y-2">
            <div className="flex justify-between gap-8">
              <span className="text-sm text-muted-foreground">
                Maandag - Vrijdag
              </span>
              <span className="text-sm">{contactInfo.hours}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-sm text-muted-foreground">
                Zaterdag & Zondag
              </span>
              <span className="text-sm">Gesloten</span>
            </div>
          </div>
        </InfoItem>

        <InfoItem icon={Building2} label="BTW-NUMMER">
          <p>{contactInfo.btw}</p>
        </InfoItem>

        <InfoItem icon={Share2} label="VOLG ONS">
          <a
            href={contactInfo.social.facebook}
            className="opacity-80 hover:opacity-100 transition"
          >
            Facebook
          </a>
        </InfoItem>
      </div>
    </div>
  );
}
