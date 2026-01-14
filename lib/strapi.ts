const STRAPI_URL = "https://grateful-charity-81ae2ee2e5.strapiapp.com/api";

interface StrapiCategoryRelation {
  id: number;
  documentId: string;
  Name: string;
}

interface StrapiProject {
  id: number;
  documentId: string;
  Name: string;
  categories: StrapiCategoryRelation[];
  Description: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  Location: string;
  Buildyear: string;
  Surface: number;
  Thumbnail: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    formats: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  Pictures: Array<{
    id: number;
    documentId: string;
    name: string;
    url: string;
    formats: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Project {
  documentId: string;
  id: number;
  title: string;
  categories: string[];
  location: string;
  year: number;
  surface: number;
  description: string;
  descriptionBlocks: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  imageUrl: string | null;
  thumbnail: string | null;
  imageUrls: string[];
  createdAt?: string;
}

interface StrapiCategory {
  id: number;
  documentId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
}

function extractYearFromDate(dateString: string): number {
  return new Date(dateString).getFullYear();
}

function parseDescription(blocks: StrapiProject["Description"]): string {
  if (!blocks || blocks.length === 0) return "";

  return blocks
    .map((block) => {
      if (block.type === "paragraph" && block.children) {
        return block.children.map((child) => child.text).join("");
      }
      return "";
    })
    .join("\n");
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/projects?populate=*`, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Strapi API returned ${response.status}`);
    }

    const data = await response.json();
    const projects = data.data || [];

    return projects.map((project: StrapiProject): Project => {
      // Extract thumbnail from dedicated Thumbnail field using medium format (750px width)
      const thumbnail =
        project.Thumbnail?.formats?.medium?.url ||
        project.Thumbnail?.formats?.large?.url ||
        project.Thumbnail?.url ||
        null;

      // Extract all images sorted by filename descending (0 -> 1 -> 2 -> 3)
      const imageUrls = (project.Pictures || [])
        .sort((a, b) =>
          b.name.localeCompare(a.name, undefined, { numeric: true })
        )
        .map((pic) => pic.formats?.large?.url || pic.url)
        .filter(Boolean) as string[];

      return {
        documentId: project.documentId,
        id: project.id,
        title: project.Name,
        categories: project.categories?.map((c) => c.Name) || [],
        location: project.Location,
        year: extractYearFromDate(project.Buildyear),
        surface: project.Surface,
        description: parseDescription(project.Description),
        descriptionBlocks: project.Description,
        imageUrl:
          project.Pictures?.[0]?.formats?.large?.url ||
          project.Pictures?.[0]?.url ||
          null,
        thumbnail,
        imageUrls,
        createdAt: project.createdAt,
      };
    });
  } catch (error) {
    console.error("Error fetching projects from Strapi:", error);
    return [];
  }
}

export async function fetchProjectByDocumentId(
  documentId: string
): Promise<Project | null> {
  try {
    const projects = await fetchProjects();
    return projects.find((p) => p.documentId === documentId) || null;
  } catch (error) {
    console.error("Error fetching project by documentId:", error);
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/categories`, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Strapi API returned ${response.status}`);
    }

    const data = await response.json();
    const categories = data.data || [];

    return categories.map(
      (category: StrapiCategory): Category => ({
        id: category.id,
        documentId: category.documentId,
        name: category.Name,
      })
    );
  } catch (error) {
    console.error("Error fetching categories from Strapi:", error);
    return [];
  }
}
