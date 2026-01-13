export default function ContactInfo() {
  return (
    <section className="px-6 py-12 lg:py-24 bg-secondary border-r border-border">
      <div className="max-w-md">
        <h2 className="text-2xl font-light tracking-tight mb-12">Contact Informatie</h2>

        {/* Headquarters */}
        <div className="mb-12">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-3">HOOFDKANTOOR</h3>
          <p className="font-light text-foreground mb-1">Studio Architecten</p>
          <p className="font-light text-foreground/70 text-sm leading-relaxed">
            Prinsengracht 123
            <br />
            1015 EK Amsterdam
            <br />
            Netherlands
          </p>
        </div>

        {/* Contact Details */}
        <div className="mb-12">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-3">CONTACT DETAILS</h3>
          <p className="font-light text-foreground mb-2">
            <a href="tel:+31204551234" className="hover:opacity-60 transition">
              +31 (0)20 455 1234
            </a>
          </p>
          <p className="font-light text-foreground">
            <a href="mailto:info@studioarch.nl" className="hover:opacity-60 transition">
              info@studioarch.nl
            </a>
          </p>
        </div>

        {/* Office Hours */}
        <div className="mb-12">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-3">KANTOORUREN</h3>
          <p className="font-light text-foreground/70 text-sm mb-1">Maandag - Vrijdag</p>
          <p className="font-light text-foreground mb-3">09:00 - 18:00</p>
          <p className="font-light text-foreground/70 text-sm mb-1">Zaterdag & Zondag</p>
          <p className="font-light text-foreground">Gesloten</p>
        </div>

        {/* Regional Office */}
        <div className="pt-12 border-t border-border">
          <h3 className="text-sm font-light tracking-widest text-muted-foreground mb-3">REGIONAAL KANTOOR</h3>
          <p className="font-light text-foreground mb-1">Studio Architecten Rotterdam</p>
          <p className="font-light text-foreground/70 text-sm leading-relaxed">
            Kruiskade 89
            <br />
            3012 EE Rotterdam
            <br />
            Netherlands
          </p>
          <p className="font-light text-foreground text-sm mt-3">
            <a href="tel:+31104561234" className="hover:opacity-60 transition">
              +31 (0)10 456 1234
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
