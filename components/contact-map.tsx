"use client";

import { MapPin } from "lucide-react";
import { contactInfo } from "@/lib/data";

export default function ContactMap() {
  // Google Maps embed URL for Fremisstraat 1A, Maarkedal, Belgium
  // Coordinates: 50.7089, 3.8867
  const mapsUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8473456!2d3.8867!3d50.7089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2e8f5c5c5c5c5%3A0x5c5f1c1c1c1c1c1c!2sFremisstraat%201A%2C%209680%20Maarkedal!5e0!3m2!1sen!2sbe!4v1234567890";

  return (
    <section className="relative h-[500px] bg-muted border-t border-border">
      <iframe
        src={mapsUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Architectenbureau Paul Kindt Location"
        className="w-full h-full grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
      />

      {/* Location marker overlay */}
      <div className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-sm border border-border p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-light text-foreground text-sm mb-1">
              {contactInfo.name}
            </p>
            <p className="font-light text-muted-foreground text-xs leading-relaxed">
              {contactInfo.address}
              <br />
              {contactInfo.city}, {contactInfo.country}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
