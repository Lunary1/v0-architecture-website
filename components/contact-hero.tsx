export default function ContactHero() {
  return (
    <section className="pt-36 md:pt-52 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8 md:mb-12 text-center md:text-left">
          Laten we samen bouwen
        </h1>

        {/* Decorative Divider */}
        <div className="mb-12 md:mb-16 flex md:block justify-center">
          <div className="w-12 h-px bg-primary/30"></div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-center md:text-left">
          Hebt u een project in gedachte? We horen graag van u. Neem vandaag nog
          contact op voor een vrijblijvend gesprek over uw architectuurproject.
        </p>
      </div>
    </section>
  );
}
