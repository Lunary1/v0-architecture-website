import Link from "next/link";
import { fetchProjects } from "@/lib/strapi";

export default async function FeaturedProjects() {
  const projects = await fetchProjects();

  // Sort by creation date descending (youngest/most recent first) and take 4
  const featuredProjects = projects
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 4);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-light tracking-widest text-muted-foreground mb-4">
            GESELECTEERDE PROJECTEN
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Onze recente werken
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Link
              key={project.documentId}
              href={`/projecten/${project.documentId}`}
              className="group cursor-pointer"
            >
              <div className="relative h-96 md:h-80 overflow-hidden bg-muted mb-4">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-300">
                    <span className="text-sm text-slate-500">
                      No image available
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                  {(project.categories || []).join(" · ")}
                </p>
                <h3 className="text-2xl font-light tracking-tight group-hover:opacity-60 transition">
                  {project.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground mt-2">
                  {project.location}
                </p>
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
  );
}
