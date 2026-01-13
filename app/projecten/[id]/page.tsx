import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { projectDetails } from "@/lib/data"
import Link from "next/link"

export const metadata = {
  title: "Project | Studio Architecten",
  description: "Ontdek ons architectuurproject in detail",
}

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params
  const project = projectDetails[id]

  if (!project) {
    return (
      <main className="bg-background text-foreground">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-4">Project niet gevonden</h1>
            <Link href="/projecten" className="text-sm font-light tracking-widest hover:opacity-60 transition">
              Terug naar projecten →
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              href="/projecten"
              className="text-sm font-light tracking-widest hover:opacity-60 transition mb-8 inline-block"
            >
              ← TERUG NAAR PROJECTEN
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Title & Meta */}
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">{project.title}</h1>
              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">CATEGORIE</p>
                  <p className="text-base font-light">{project.category}</p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">LOCATIE</p>
                  <p className="text-base font-light">{project.location}</p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">JAAR</p>
                  <p className="text-base font-light">{project.year}</p>
                </div>
                {project.area && (
                  <div>
                    <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">OPPERVLAKTE</p>
                    <p className="text-base font-light">{project.area}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">STATUS</p>
                  <p className="text-base font-light">{project.status}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:col-span-2">
              <div className="relative h-96 md:h-96 bg-muted mb-12 overflow-hidden">
                <img
                  src={`/.jpg?height=400&width=800&query=${project.title}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-light tracking-tight mb-6">Overzicht</h2>
                  <p className="text-lg font-light text-foreground/70 leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-light tracking-tight mb-6">De Uitdaging</h2>
                  <p className="text-lg font-light text-foreground/70 leading-relaxed">{project.challenge}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-light tracking-tight mb-6">Onze Oplossing</h2>
                  <p className="text-lg font-light text-foreground/70 leading-relaxed">{project.solution}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-light tracking-tight mb-6">Hoogtepunten</h2>
                  <ul className="space-y-4">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="text-foreground font-light mt-1">•</span>
                        <span className="text-lg font-light text-foreground/70">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-24 px-6 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light tracking-tight">Meer Projecten</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/projecten" className="group cursor-pointer">
              <div className="relative h-72 bg-muted mb-4 overflow-hidden">
                <img
                  src="/architecture-project.jpg"
                  alt="More projects"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="text-xl font-light tracking-tight group-hover:opacity-60 transition">
                Verken ons volledige portfolio
              </h3>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
