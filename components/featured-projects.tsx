import Link from "next/link"

interface Project {
  id: string
  title: string
  category: string
  image: string
  location: string
}

const projects: Project[] = [
  {
    id: "residence-01",
    title: "Minimalist Villa",
    category: "Residentieel Modern",
    image: "/modern-villa-architecture.jpg",
    location: "Amsterdam",
  },
  {
    id: "residence-02",
    title: "Classic Estate",
    category: "Residentieel Klassiek",
    image: "/classic-residential-design.jpg",
    location: "Utrecht",
  },
  {
    id: "industrial-01",
    title: "Office Complex",
    category: "Kantoor & Industriebouw",
    image: "/modern-office-building.png",
    location: "Rotterdam",
  },
  {
    id: "interior-01",
    title: "Interior Design",
    category: "Interieur",
    image: "/luxury-interior-design.jpg",
    location: "The Hague",
  },
]

export default function FeaturedProjects() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-light tracking-widest text-muted-foreground mb-4">GESELECTEERDE PROJECTEN</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Onze recente werken</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projecten/${project.id}`} className="group cursor-pointer">
              <div className="relative h-96 md:h-80 overflow-hidden bg-muted mb-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div>
                <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">{project.category}</p>
                <h3 className="text-2xl font-light tracking-tight group-hover:opacity-60 transition">
                  {project.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground mt-2">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Projects */}
        <div className="mt-16 pt-12 border-t border-border">
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 text-sm font-light tracking-widest hover:opacity-60 transition"
          >
            ALLE PROJECTEN BEKIJKEN
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
