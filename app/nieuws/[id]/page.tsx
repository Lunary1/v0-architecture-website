import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";
import type { Metadata } from "next";
import Link from "next/link";

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

const SITE_URL = "https://www.architect-kindt.be";

const newsArticles: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    author: string;
    content: string;
    image: string;
    description?: string;
  }
> = {
  "news-01": {
    title: "Architectenbureau Paul Kindt Wint Internationaal Design Award",
    date: "2024-11-15",
    category: "Awards",
    author: "Marketing Team",
    description:
      "Ons engagement voor duurzame architectuur is erkend met de prestigieuze International Design Excellence Award.",
    content:
      "Our commitment to sustainable architecture has been recognized with the prestigious International Design Excellence Award. This honor reflects our dedication to creating spaces that are not only beautiful but also environmentally responsible.\n\nThe award was presented at the International Architecture Summit in Berlin, where our founder presented our latest sustainable design initiatives to a global audience of architects and designers.\n\nThis recognition validates our approach to integrating environmental consciousness with innovative design principles. We believe that great architecture should enhance both human experience and environmental stewardship.\n\nLooking forward, we are committed to pushing the boundaries of sustainable design and inspiring other studios to adopt similar practices.",
    image: "/award-ceremony.jpg",
  },
  "news-02": {
    title: "Nieuw Residentieel Project in Amsterdam Officieel Geopend",
    date: "2024-11-10",
    category: "Projects",
    author: "Project Team",
    description:
      "Het Minimalist Villa project in Amsterdam is officieel geopend voor bewoners met innovatieve duurzame woonoplossingen.",
    content:
      "The Minimalist Villa project in Amsterdam has officially opened its doors to residents. This innovative residential complex showcases our commitment to modern design and sustainable living solutions.\n\nThe project features cutting-edge sustainable technology, including solar panels, rainwater harvesting systems, and energy-efficient HVAC systems. Each residence is designed with open floor plans that maximize natural light and create seamless indoor-outdoor living spaces.\n\nResidents have praised the thoughtful design and high-quality finishes. The project includes shared community spaces that foster connection and collaboration among residents.\n\nThis successful completion demonstrates our ability to deliver complex residential projects on time and within budget, while exceeding sustainability standards.",
    image: "/residential-opening.jpg",
  },
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = newsArticles[id];

  if (!article) {
    return {
      title: "Artikel niet gevonden | Architectenbureau Paul Kindt",
      description: "Het artikel dat u zoekt is niet gevonden.",
    };
  }

  const articleUrl = `${SITE_URL}/nieuws/${id}`;
  const imageUrl = article.image || `${SITE_URL}/og-image.png`;
  const description =
    article.description ||
    article.content.substring(0, 160).replace(/\n/g, " ");

  return {
    title: `${article.title} | Architectenbureau Paul Kindt`,
    description,
    keywords: [article.title, article.category, "architectuur", "nieuws"],
    authors: [
      {
        name: article.author,
        url: SITE_URL,
      },
    ],
    openGraph: {
      type: "article",
      url: articleUrl,
      title: `${article.title} | Architectenbureau Paul Kindt`,
      description,
      siteName: "Architectenbureau Paul Kindt",
      locale: "nl_NL",
      publishedTime: article.date,
      authors: [article.author],
      tags: [article.category],
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
  const article = newsArticles[id];

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
    description: article.description || article.content.substring(0, 160),
    content: article.content,
    image: article.image,
    author: article.author,
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

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/nieuws"
            className="text-sm font-light tracking-widest hover:opacity-60 transition mb-12 inline-block"
          >
            ← TERUG NAAR NIEUWS
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-light tracking-widest text-muted-foreground">
                {article.category}
              </span>
              <span className="text-xs font-light text-muted-foreground">
                {formatDate(article.date)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6">
              {article.title}
            </h1>
            <p className="text-base font-light text-muted-foreground">
              By {article.author}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 md:h-[500px] bg-muted mb-16 overflow-hidden">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-lg font-light text-foreground/70 leading-relaxed mb-8"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-12 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                href="/nieuws"
                className="text-sm font-light tracking-widest hover:opacity-60 transition"
              >
                ← Meer nieuws
              </Link>
              <div className="text-right">
                <Link
                  href="/contact"
                  className="text-sm font-light tracking-widest hover:opacity-60 transition"
                >
                  Neem contact op →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
