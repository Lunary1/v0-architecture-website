export default function AboutHero() {
  return (
    <section className="pt-36 md:pt-52 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8 md:mb-12 text-center md:text-left">
          Moderne Architectuur.
          <br />
          Tijdloos Design.
        </h1>

        {/* Decorative Divider */}
        <div className="mb-12 md:mb-16 flex md:block justify-center">
          <div className="w-12 h-px bg-primary/30"></div>
        </div>

        {/* Description */}
        <div className="space-y-8 md:space-y-10">
          <p className="text-base md:text-lg font-light text-foreground leading-relaxed text-center md:text-left">
            Architectenbureau Paul Kindt staat voor doordachte architectuur met
            respect voor context, materiaal en gebruik. Vanuit een sterke passie
            voor bouwen ontwerpen we projecten die niet alleen esthetisch
            kloppen, maar ook functioneel en duurzaam zijn in het dagelijks
            leven.
          </p>
          <p className="text-base md:text-lg font-light text-foreground leading-relaxed text-center md:text-left">
            Elk ontwerp vertrekt vanuit maatwerk en een nauwe samenwerking met
            de bouwheer. Door een zorgvuldige materiaalkeuze en oog voor detail
            realiseren we tijdloze gebouwen met karakter.
          </p>
          <p className="text-base md:text-lg font-light text-foreground leading-relaxed text-center md:text-left">
            We specialiseren ons in residentiële, industriële en
            interieurprojecten, elk ontworpen met aandacht voor detail,
            duurzaamheid en de behoeften van onze cliënten.
          </p>
        </div>
      </div>
    </section>
  );
}
