import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react"

export default function ContactInfo() {
  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24 bg-secondary/30 border-r border-border">
      <div className="max-w-lg mx-auto lg:mx-0">
        <h2 className="text-2xl font-light tracking-tight mb-8">Contact Informatie</h2>

        {/* Headquarters */}
        <div className="mb-10">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-2">HOOFDKANTOOR</h3>
              <p className="font-light text-foreground mb-1">Studio Architecten</p>
              <p className="font-light text-muted-foreground text-sm leading-relaxed">
                Prinsengracht 123
                <br />
                1015 EK Amsterdam
                <br />
                Netherlands
              </p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-10">
          <div className="flex items-start gap-3 mb-4">
            <Phone className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-2">TELEFOON</h3>
              <p className="font-light text-foreground">
                <a href="tel:+31204551234" className="hover:text-muted-foreground transition">
                  +31 (0)20 455 1234
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-2">E-MAIL</h3>
              <p className="font-light text-foreground">
                <a href="mailto:info@studioarch.nl" className="hover:text-muted-foreground transition">
                  info@studioarch.nl
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="mb-10">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-3">KANTOORUREN</h3>
              <div className="space-y-2">
                <div className="flex justify-between gap-8">
                  <span className="font-light text-muted-foreground text-sm">Maandag - Vrijdag</span>
                  <span className="font-light text-foreground text-sm">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="font-light text-muted-foreground text-sm">Zaterdag & Zondag</span>
                  <span className="font-light text-foreground text-sm">Gesloten</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-4">VOLG ONS</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition group"
            >
              <Facebook className="w-5 h-5" />
              <span className="text-sm font-light">Facebook</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition group"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-light">Instagram</span>
            </a>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-border">
          <h3 className="text-xs font-light tracking-widest text-muted-foreground mb-2">REGIONAAL KANTOOR</h3>
          <p className="font-light text-foreground text-sm mb-0.5">Studio Architecten Rotterdam</p>
          <p className="font-light text-muted-foreground text-xs">Kruiskade 89, 3012 EE Rotterdam</p>
          <p className="font-light text-foreground text-sm mt-2">
            <a href="tel:+31104561234" className="hover:text-muted-foreground transition">
              +31 (0)10 456 1234
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
