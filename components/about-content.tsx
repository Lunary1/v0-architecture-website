export default function AboutContent() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {/* Mission */}
          <div>
            <h3 className="text-xl font-light tracking-wide mb-4">Missie</h3>
            <p className="text-foreground/70 font-light leading-relaxed">
              Architectenbureau Paul Kindt ontwerpt doordachte architectuur die
              esthetiek, functionaliteit en duurzaamheid verenigt. We streven
              naar ontwerpen die helder zijn in opzet, zorgvuldig uitgewerkt en
              afgestemd op hun context en gebruikers.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-xl font-light tracking-wide mb-4">Visie</h3>
            <p className="text-foreground/70 font-light leading-relaxed">
              Wij geloven in architectuur die tijdloos is en een meerwaarde
              vormt voor haar omgeving. Door bewuste keuzes in ontwerp en
              materiaal willen we gebouwen realiseren die vandaag functioneren
              en ook op lange termijn relevant blijven.
            </p>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-xl font-light tracking-wide mb-4">Waarden</h3>
            <p className="text-foreground/70 font-light leading-relaxed">
              Onze werking steunt op vakmanschap, betrokkenheid en samenwerking.
              We luisteren aandachtig naar iedere klant en werken nauw samen met
              alle betrokken partijen om tot een gedragen en kwalitatief
              eindresultaat te komen.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-border">
          <div>
            <p className="text-4xl font-light mb-2">100+</p>
            <p className="text-sm font-light text-muted-foreground tracking-wide">
              Projecten Voltooid
            </p>
          </div>
          <div>
            <p className="text-4xl font-light mb-2">20+</p>
            <p className="text-sm font-light text-muted-foreground tracking-wide">
              Jaren Ervaring
            </p>
          </div>
          <div>
            <p className="text-4xl font-light mb-2">10+</p>
            <p className="text-sm font-light text-muted-foreground tracking-wide">
              Awards Gewonnen
            </p>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-24">
          <h2 className="text-4xl font-light tracking-tight mb-12">
            Ons Proces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                1
              </div>
              <h4 className="text-lg font-light mb-2">Kennismaking</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                We starten met een persoonlijk gesprek waarin we uw wensen,
                budget en verwachtingen bespreken. Daarnaast analyseren we de
                locatie, context en regelgeving om de mogelijkheden van het
                project correct in te schatten.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                2
              </div>
              <h4 className="text-lg font-light mb-2">Voorontwerp</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Op basis van deze input werken we een voorontwerp uit waarin
                volumes, indeling en architecturale keuzes worden vastgelegd.
                Dit ontwerp wordt in overleg verfijnd tot het volledig aansluit
                bij uw visie en noden.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                3
              </div>
              <h4 className="text-lg font-light mb-2">Ontwerp</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Na goedkeuring van het voorontwerp werken we het project
                technisch uit. We bepalen materialen, detaillering en
                constructieve oplossingen en bereiden de plannen voor voor
                vergunning en uitvoering.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                4
              </div>
              <h4 className="text-lg font-light mb-2">
                Begeleiding & oplevering
              </h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Tijdens de uitvoering volgen we de werken op en bewaken we de
                kwaliteit en correcte uitvoering van het ontwerp. We blijven
                betrokken tot en met de oplevering van het project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
