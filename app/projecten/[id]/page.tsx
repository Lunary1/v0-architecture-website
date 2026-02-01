import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { fetchProjects, fetchProjectByDocumentId } from "@/lib/strapi";
import Link from "next/link";
import ProjectDetailClient from "./project-detail-client";

export const metadata = {
  title: "Project | Architectenbureau Paul Kindt",
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
  const [project, allProjects] = await Promise.all([
    fetchProjectByDocumentId(id),
    fetchProjects(),
  ]);

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

  // Find related projects in the same category, excluding current project
  const relatedProjects = allProjects
    .filter(
      (p) =>
        p.documentId !== project.documentId &&
        p.categories.some((cat) => project.categories.includes(cat)),
    )
    .slice(0, 3);

  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <ProjectDetailClient
        project={project}
        relatedProjects={relatedProjects}
      />
      <Footer />
    </main>
  );
}
