"use client"

import { MapPin } from "lucide-react"

export default function ContactMap() {
  return (
    <section className="relative h-[500px] bg-muted border-t border-border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.9234721234!2d4.8840!3d52.3676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c3db87e6bb%3A0x5c5f1c1c1c1c1c1c!2sPrinsengracht%20123%2C%201015%20Amsterdam!5e0!3m2!1sen!2snl!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Studio Architecten Location"
        className="w-full h-full grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
      />

      {/* Location marker overlay */}
      <div className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-sm border border-border p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-light text-foreground text-sm mb-1">Studio Architecten</p>
            <p className="font-light text-muted-foreground text-xs leading-relaxed">
              Prinsengracht 123
              <br />
              1015 EK Amsterdam, Netherlands
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
