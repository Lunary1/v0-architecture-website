import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-light tracking-widest opacity-70 mb-6">LATEN WE SAMENWERKEN</p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          Klaar om uw project tot leven te brengen?
        </h2>
        <p className="text-lg font-light opacity-70 mb-12">
          Neem contact met ons op en ontdek hoe Studio Architecten uw visie kan realiseren met innovatief design en
          vakmanschap.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary font-light tracking-wide hover:bg-primary-foreground/90 transition"
        >
          Start Project Discussion
        </Link>
      </div>
    </section>
  )
}
