import { MetadataRoute } from "next";
import { fetchProjects, fetchCategories } from "@/lib/strapi";

const SITE_URL = "https://www.architect-kindt.be";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projecten`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nieuws`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/over`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacybeleid`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    // Dynamic project routes from Strapi
    const projects = await fetchProjects();
    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${SITE_URL}/projecten/${project.documentId}`,
      lastModified: project.createdAt
        ? new Date(project.createdAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    // Combine all routes
    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static routes only if Strapi fails
    return staticRoutes;
  }
}
