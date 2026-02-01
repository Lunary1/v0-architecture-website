export default function AboutHero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-light tracking-widest text-muted-foreground mb-4">
            OVER ONS
          </p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
            Modern Architecture. Timeless Design.
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg font-light text-foreground/70 leading-relaxed">
              Architectenbureau Paul Kindt staat voor doordachte architectuur
              met respect voor context, materiaal en gebruik. Vanuit een sterke
              passie voor bouwen ontwerpen we projecten die niet alleen
              esthetisch kloppen, maar ook functioneel en duurzaam zijn in het
              dagelijks leven. Elk ontwerp vertrekt vanuit maatwerk en een nauwe
              samenwerking met de bouwheer. Door een zorgvuldige materiaalkeuze
              en oog voor detail realiseren we tijdloze gebouwen met karakter.
            </p>
          </div>
          <div>
            <p className="text-lg font-light text-foreground/70 leading-relaxed">
              We specialiseren ons in residentiële, industriële en
              interieurprojecten, elk ontworpen met aandacht voor detail,
              duurzaamheid en de behoeften van onze cliënten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
