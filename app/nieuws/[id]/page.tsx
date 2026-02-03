import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import StrapiBlocksRenderer from "@/components/blocks-renderer";
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";
import { fetchNewsArticles, fetchNewsByDocumentId } from "@/lib/strapi";
import type { Metadata } from "next";
import Link from "next/link";

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

const SITE_URL = "https://www.architect-kindt.be";

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateStaticParams() {
  try {
    const articles = await fetchNewsArticles();
    return articles.map((article) => ({
      id: article.documentId,
    }));
  } catch (error) {
    console.error("Error generating static params for news:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await fetchNewsByDocumentId(id);

  if (!article) {
    return {
      title: "Artikel niet gevonden | Architectenbureau Paul Kindt",
      description: "Het artikel dat u zoekt is niet gevonden.",
    };
  }

  const articleUrl = `${SITE_URL}/nieuws/${id}`;
  const imageUrl = article.thumbnail || `${SITE_URL}/og-image.png`;
  const description = article.description.substring(0, 160).replace(/\n/g, " ");

  return {
    title: `${article.title} | Architectenbureau Paul Kindt`,
    description,
    keywords: [article.title, ...article.categories, "architectuur", "nieuws"],
    openGraph: {
      type: "article",
      url: articleUrl,
      title: `${article.title} | Architectenbureau Paul Kindt`,
      description,
      siteName: "Architectenbureau Paul Kindt",
      locale: "nl_NL",
      publishedTime: article.date,
      tags: article.categories,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Architectenbureau Paul Kindt`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const [article, allArticles] = await Promise.all([
    fetchNewsByDocumentId(id),
    fetchNewsArticles(),
  ]);

  if (!article) {
    return (
      <main className="bg-background text-foreground">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-4">Artikel niet gevonden</h1>
            <Link
              href="/nieuws"
              className="text-sm font-light tracking-widest hover:opacity-60 transition"
            >
              Terug naar nieuws →
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Find related articles in the same category, excluding current article
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.documentId !== article.documentId &&
        a.categories.some((cat) => article.categories.includes(cat)),
    )
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate JSON-LD schemas for this article
  const blogPostingSchema = generateBlogPostingSchema({
    title: article.title,
    description: article.description.substring(0, 160),
    content: article.description,
    image: article.thumbnail || "",
    author: "Architectenbureau Paul Kindt",
    datePublished: article.date,
    slug: id,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: "/" },
    { label: "Nieuws", url: "/nieuws" },
    { label: article.title, url: `/nieuws/${id}` },
  ]);

  const combinedSchemas = combineSchemas([blogPostingSchema, breadcrumbSchema]);

  return (
    <main className="bg-background text-foreground">
      <Navigation />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combinedSchemas }}
      />

      <section className="pt-44 md:pt-50 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              href="/nieuws"
              className="text-sm font-light tracking-widest hover:opacity-60 transition mb-8 inline-block"
            >
              ← TERUG NAAR NIEUWS
            </Link>
          </div>

          {/* 4-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-32">
            {/* Left Column: Metadata & Sidebar */}
            <div className="lg:col-span-1">
              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-light tracking-tight mb-8 leading-tight">
                {article.title}
              </h1>

              {/* Decorative Line */}
              <div className="w-12 h-px bg-foreground/20 mb-8"></div>

              {/* Meta Info */}
              <div className="space-y-8">
                {/* Publication Date */}
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    GEPUBLICEERD
                  </p>
                  <p className="text-sm font-light text-foreground/80">
                    {formatDate(article.date)}
                  </p>
                </div>

                {/* Categories */}
                {article.categories.length > 0 && (
                  <div>
                    <p className="text-xs font-light tracking-widest text-muted-foreground mb-3">
                      CATEGORIËN
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.categories.map((cat, idx) => (
                        <Link
                          key={`${cat}-${idx}`}
                          href={`/nieuws?category=${encodeURIComponent(cat)}`}
                          className="inline-flex items-center px-3 py-1.5 bg-secondary hover:bg-secondary/80 transition text-xs font-light tracking-wide text-foreground rounded"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Content (3 columns) */}
            <div className="lg:col-span-3 space-y-12">
              {/* Featured Image */}
              {article.thumbnail && (
                <div className="relative w-full aspect-video bg-muted overflow-hidden rounded-sm">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose-custom space-y-6">
                {article.descriptionBlocks &&
                article.descriptionBlocks.length > 0 ? (
                  <StrapiBlocksRenderer
                    content={article.descriptionBlocks as any}
                  />
                ) : (
                  article.description.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base lg:text-lg font-light text-foreground/70 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))
                )}
              </div>

              {/* External Link CTA - Option 2 */}
              {article.link && (
                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-sm font-light text-muted-foreground mb-4 tracking-wide">
                    Wil je het volledige artikel lezen?
                  </p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-light tracking-wide hover:opacity-80 transition rounded"
                  >
                    Link naar volledige artikel
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-border pt-24">
              <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-3">
                Andere {article.categories[0]}
              </h2>
              <div className="w-12 h-px bg-foreground/20 mb-12"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.documentId}
                    href={`/nieuws/${related.documentId}`}
                    className="group"
                  >
                    {/* Image */}
                    <div className="relative h-72 bg-muted overflow-hidden rounded-sm mb-6">
                      {related.thumbnail && (
                        <img
                          src={related.thumbnail}
                          alt={related.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      )}
                    </div>

                    {/* Category Tags */}
                    {related.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {related.categories.slice(0, 2).map((cat, idx) => (
                          <span
                            key={`${cat}-${idx}`}
                            className="text-xs font-light tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-light group-hover:opacity-60 transition mb-3 line-clamp-2">
                      {related.title}
                    </h3>

                    {/* Date */}
                    <p className="text-xs font-light text-muted-foreground">
                      {formatDate(related.date)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
