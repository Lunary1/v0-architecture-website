import { fetchProjects } from "@/lib/strapi";

export default async function Hero() {
  const projects = await fetchProjects();

  // Get the newest project (most recent by createdAt)
  const newestProject = projects.sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  )[0];

  const backgroundImage = newestProject?.thumbnail || "";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image - Featured Project Thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage
            ? `url('${backgroundImage}')`
            : "none",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground max-w-2xl mx-auto px-6">
        <p className="text-sm font-light tracking-widest mb-4 opacity-80">
          ARCHITECTUUR
        </p>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
          Residentieel · Industrieel · Interieur
        </h1>
        <p className="text-lg font-light opacity-80 mb-12">
          Modern design. Timeless quality. Sustainable solutions.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
