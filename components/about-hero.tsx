export default function AboutHero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-light tracking-widest text-gray-600 mb-4">OVER ONS</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
            Modern Architecture. Timeless Design.
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg font-light text-gray-700 leading-relaxed">
              Studio Architecten is een gepassioneerde groep architecten en designers die geloven in de kracht van
              thoughtful design. Sinds onze oprichting hebben we honderden projecten gerealiseerd die het dagelijks
              leven van mensen verbeteren.
            </p>
          </div>
          <div>
            <p className="text-lg font-light text-gray-700 leading-relaxed">
              We specialiseren ons in residentiële, industriële en interieurprojecten, elk ontworpen met aandacht voor
              detail, duurzaamheid en de behoeften van onze cliënten.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
