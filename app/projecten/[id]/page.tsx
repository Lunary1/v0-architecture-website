import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import StrapiBlocksRenderer from "@/components/blocks-renderer";
import { fetchProjects, fetchProjectByDocumentId } from "@/lib/strapi";
import Link from "next/link";

export const metadata = {
  title: "Project | Studio Architecten",
  description: "Ontdek ons architectuurproject in detail",
};

export const revalidate = 3600; // ISR: revalidate every hour

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({
    id: project.documentId,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await fetchProjectByDocumentId(id);

  if (!project) {
    return (
      <main className="bg-background text-foreground">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-4">Project niet gevonden</h1>
            <Link
              href="/projecten"
              className="text-sm font-light tracking-widest hover:opacity-60 transition"
            >
              Terug naar projecten →
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
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
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                {project.title}
              </h1>
              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    CATEGORIE
                  </p>
                  <p className="text-base font-light">{project.categories}</p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    LOCATIE
                  </p>
                  <p className="text-base font-light">{project.location}</p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    JAAR
                  </p>
                  <p className="text-base font-light">{project.year}</p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    OPPERVLAKTE
                  </p>
                  <p className="text-base font-light">{project.surface} m²</p>
                </div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:col-span-2">
              {/* Image Gallery - Masonry Layout */}
              {project.imageUrls.length > 0 && (
                <div className="mb-12">
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {project.imageUrls.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="break-inside-avoid overflow-hidden rounded-lg bg-muted"
                      >
                        <img
                          src={imageUrl}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-auto object-cover hover:opacity-90 transition duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-12">
                {project.descriptionBlocks && project.descriptionBlocks.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-light tracking-tight mb-6">
                      Beschrijving
                    </h2>
                    <StrapiBlocksRenderer content={project.descriptionBlocks} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Projects */}
      <section className="py-24 px-6 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light tracking-tight">
              Meer Projecten
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/projecten" className="group cursor-pointer">
              <div className="relative h-72 bg-muted mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm text-slate-500">
                    Browse all projects
                  </span>
                </div>
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
  );
}
