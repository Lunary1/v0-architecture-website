import { services } from "@/lib/data"

export default function ServicesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-light tracking-widest text-gray-600 mb-4">ONZE DIENSTEN</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Wat wij bieden</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 border border-gray-200 hover:border-black transition bg-white group">
              <h3 className="text-xl font-light tracking-tight mb-4 group-hover:opacity-70 transition">
                {service.title}
              </h3>
              <p className="text-base font-light text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
