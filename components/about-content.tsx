export default function AboutContent() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {/* Mission */}
          <div>
            <h3 className="text-xl font-light tracking-wide mb-4">Missie</h3>
            <p className="text-foreground/70 font-light leading-relaxed">
              We streven ernaar om transformatieve architectuuroplossingen te creëren die esthetisch overtuigend,
              functioneel en duurzaam zijn.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-xl font-light tracking-wide mb-4">Visie</h3>
            <p className="text-foreground/70 font-light leading-relaxed">
              Een wereld waar architectuur en design positief bijdragen aan het welzijn van gemeenschappen en de
              gezondheid van onze planeet.
            </p>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-xl font-light tracking-wide mb-4">Waarden</h3>
            <p className="text-foreground/70 font-light leading-relaxed">
              Integriteit, innovatie en inclusiviteit vormen de kern van alles wat we doen. We geloven in samenwerking
              en luisteren naar onze cliënten.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-b border-border">
          <div>
            <p className="text-4xl font-light mb-2">500+</p>
            <p className="text-sm font-light text-muted-foreground tracking-wide">Projecten Voltooid</p>
          </div>
          <div>
            <p className="text-4xl font-light mb-2">25+</p>
            <p className="text-sm font-light text-muted-foreground tracking-wide">Jaren Ervaring</p>
          </div>
          <div>
            <p className="text-4xl font-light mb-2">50+</p>
            <p className="text-sm font-light text-muted-foreground tracking-wide">Team Leden</p>
          </div>
          <div>
            <p className="text-4xl font-light mb-2">15+</p>
            <p className="text-sm font-light text-muted-foreground tracking-wide">Awards Gewonnen</p>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-24">
          <h2 className="text-4xl font-light tracking-tight mb-12">Ons Proces</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                1
              </div>
              <h4 className="text-lg font-light mb-2">Verkenning</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                We beginnen met diepgaande gesprekken om uw behoeften en visie te begrijpen.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                2
              </div>
              <h4 className="text-lg font-light mb-2">Concept</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Ons team ontwikkelt innovatieve concepten die uw doelstellingen weerspiegelen.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                3
              </div>
              <h4 className="text-lg font-light mb-2">Ontwerp</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                We verfijnen designs tot in detail en creëren gedetailleerde plannen.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full mb-4 font-light">
                4
              </div>
              <h4 className="text-lg font-light mb-2">Realisatie</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                We begeleiden het project van bouw tot oplevering met voortdurend toezicht.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
