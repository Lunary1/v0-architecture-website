import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { fetchProjects, fetchProjectByDocumentId } from "@/lib/strapi";
import {
  generateProjectSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";
import type { Metadata } from "next";
import Link from "next/link";
import ProjectDetailClient from "./project-detail-client";

const SITE_URL = "https://www.architect-kindt.be";

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

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchProjectByDocumentId(id);

  if (!project) {
    return {
      title: "Project niet gevonden | Architectenbureau Paul Kindt",
      description: "Het project dat u zoekt is niet gevonden.",
    };
  }

  const projectUrl = `${SITE_URL}/projecten/${project.documentId}`;
  const imageUrl =
    project.thumbnail || project.imageUrl || `${SITE_URL}/og-image.png`;

  return {
    title: `${project.title} | Architectenbureau Paul Kindt`,
    description:
      project.description ||
      `Een architectuurproject van Architectenbureau Paul Kindt in ${project.location}.`,
    keywords: [
      project.title,
      ...project.categories,
      project.location,
      "architectuur",
      "ontwerp",
    ],
    authors: [
      {
        name: "Architectenbureau Paul Kindt",
        url: SITE_URL,
      },
    ],
    openGraph: {
      type: "website",
      url: projectUrl,
      title: `${project.title} | Architectenbureau Paul Kindt`,
      description:
        project.description ||
        `Een architectuurproject in ${project.location}.`,
      siteName: "Architectenbureau Paul Kindt",
      locale: "nl_NL",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Architectenbureau Paul Kindt`,
      description:
        project.description ||
        `Een architectuurproject in ${project.location}.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
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

  // Generate JSON-LD schemas for this project
  const projectSchema = generateProjectSchema({
    title: project.title,
    description: project.description,
    image: project.thumbnail || project.imageUrl || undefined,
    location: project.location,
    year: project.year,
    categories: project.categories,
    slug: project.documentId,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: "/" },
    { label: "Projecten", url: "/projecten" },
    { label: project.title, url: `/projecten/${project.documentId}` },
  ]);

  const combinedSchemas = combineSchemas([projectSchema, breadcrumbSchema]);

  return (
    <main className="bg-background text-foreground">
      <Navigation />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combinedSchemas }}
      />

      <ProjectDetailClient
        project={project}
        relatedProjects={relatedProjects}
      />
      <Footer />
    </main>
  );
}
