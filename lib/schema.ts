/**
 * JSON-LD Schema Generation Utilities
 * Produces structured data for SEO according to schema.org
 * Used for Organization, LocalBusiness, BreadcrumbList, BlogPosting, and Project schemas
 */

const SITE_URL = "https://www.architect-kindt.be";
const COMPANY_NAME = "Architectenbureau Paul Kindt";
const COMPANY_EMAIL = "info@architect-kindt.be";
const COMPANY_PHONE = "+32 495 20 56 77"; // Update with actual phone

/**
 * Organization Schema
 * Defines the company's basic information for search engines
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE_URL,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Architectenbureau Paul Kindt - Award-winning architecture studio specializing in contemporary residential, industrial, and interior design.",
    foundingDate: "2008",
    areaServed: {
      "@type": "Country",
      name: "NL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: COMPANY_EMAIL,
      telephone: COMPANY_PHONE,
      availableLanguage: ["nl", "en"],
    },
    sameAs: [
      // Add social media URLs when available
      // "https://www.instagram.com/architect-kindt",
      // "https://www.linkedin.com/company/architect-kindt",
    ],
  };
}

/**
 * LocalBusiness Schema
 * Enhances local search visibility for Belgian market
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: COMPANY_NAME,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fremisstraat 1A", // Update with actual address
      addressLocality: "Maarkedal", // Update with actual city
      postalCode: "9680", // Update with actual postal code
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.823180551683386", // Update with actual latitude
      longitude: "3.63889862698422", // Update with actual longitude
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: COMPANY_EMAIL,
      telephone: COMPANY_PHONE,
    },
    priceRange: "€€€",
  };
}

/**
 * BreadcrumbList Schema
 * Improves site navigation visibility in search results
 * @param items Array of breadcrumb items with label and url
 */
export function generateBreadcrumbSchema(
  items: Array<{ label: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * BlogPosting Schema
 * For news/article detail pages
 */
export function generateBlogPostingSchema(article: {
  title: string;
  description: string;
  content: string;
  image?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    articleBody: article.content,
    image: article.image || `${SITE_URL}/og-image.png`,
    author: {
      "@type": "Person",
      name: article.author,
      url: SITE_URL,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/nieuws/${article.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Project/CreativeWork Schema
 * For portfolio project pages
 */
export function generateProjectSchema(project: {
  title: string;
  description: string;
  image?: string;
  location: string;
  year: number;
  categories?: string[];
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image || `${SITE_URL}/og-image.png`,
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "BE",
      },
    },
    dateCreated: `${project.year}-01-01`,
    creator: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/projecten/${project.slug}`,
    },
    ...(project.categories && { keywords: project.categories.join(", ") }),
  };
}

/**
 * Website/SearchAction Schema
 * Enables site-wide search integration in Google
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: COMPANY_NAME,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      query_input: "required name=search_term_string",
    },
  };
}

/**
 * Combine multiple schemas into a single JSON-LD block
 * @param schemas Array of schema objects
 */
export function combineSchemas(schemas: Array<Record<string, any>>) {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas,
  });
}

/**
 * Create JSON-LD script element as string (for metadata scripting)
 * @param schemaData The schema object or array
 */
export function createJsonLdScript(
  schemaData: Record<string, any> | Array<Record<string, any>>,
): string {
  const schema = Array.isArray(schemaData)
    ? combineSchemas(schemaData)
    : JSON.stringify(schemaData);

  return `<script type="application/ld+json">${schema}</script>`;
}
