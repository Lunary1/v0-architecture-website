"use client";

import { useState } from "react";
import Link from "next/link";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  featured: boolean;
  author: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "news-01",
    title: "Studio Architecten Wint Internationaal Design Award",
    excerpt:
      "Onze innovatieve aanpak van duurzaam design erkend op het internationale podium.",
    content:
      "Our commitment to sustainable architecture has been recognized with the prestigious International Design Excellence Award. This honor reflects our dedication to creating spaces that are not only beautiful but also environmentally responsible.",
    category: "Awards",
    date: "2024-11-15",
    image: "/placeholder.svg?key=award01",
    featured: true,
    author: "Marketing Team",
  },
  {
    id: "news-02",
    title: "Nieu Residentieelproject in Amsterdam Officieel Geopend",
    excerpt:
      "De Minimalist Villa project is nu officieel voor bewoners opengesteld.",
    content:
      "The Minimalist Villa project in Amsterdam has officially opened its doors to residents. This innovative residential complex showcases our commitment to modern design and sustainable living solutions.",
    category: "Projects",
    date: "2024-11-10",
    image: "/placeholder.svg?key=villa01",
    featured: true,
    author: "Project Team",
  },
  {
    id: "news-03",
    title: "Featured in Architecture Today Magazine",
    excerpt:
      "Studio Architecten spotlight in leading architecture publication.",
    content:
      "We're honored to be featured in Architecture Today Magazine, where our latest projects and design philosophy are discussed with industry experts.",
    category: "Press",
    date: "2024-11-05",
    image: "/placeholder.svg?key=mag01",
    featured: false,
    author: "Editorial",
  },
  {
    id: "news-04",
    title: "Sustainability Initiative: Carbon-Neutral Buildings",
    excerpt:
      "Announcing our commitment to carbon-neutral design practices by 2025.",
    content:
      "Studio Architecten launches an ambitious sustainability initiative aimed at achieving carbon-neutral design practices across all projects by 2025. This commitment reflects our responsibility to the environment and future generations.",
    category: "Sustainability",
    date: "2024-10-30",
    image: "/placeholder.svg?key=sust01",
    featured: false,
    author: "CEO",
  },
  {
    id: "news-05",
    title: "New Office Opening in Rotterdam",
    excerpt: "Studio Architecten expands with new regional office.",
    content:
      "We're excited to announce the opening of our new regional office in Rotterdam. This expansion allows us to better serve our clients in the southern Netherlands.",
    category: "Company",
    date: "2024-10-20",
    image: "/placeholder.svg?key=office01",
    featured: false,
    author: "Management",
  },
  {
    id: "news-06",
    title: "Collaboration with International Design Leaders",
    excerpt:
      "Strategic partnership announced with leading European architecture firms.",
    content:
      "We're thrilled to announce a strategic collaboration with leading European architecture firms. This partnership will enhance our capabilities and expand our reach across Europe.",
    category: "Partnerships",
    date: "2024-10-10",
    image: "/placeholder.svg?key=partner01",
    featured: false,
    author: "Business Development",
  },
];

const categories = [
  "Alle Nieuws",
  "Awards",
  "Projects",
  "Press",
  "Sustainability",
  "Company",
  "Partnerships",
];

export default function NewsGrid() {
  const [activeCategory, setActiveCategory] = useState("Alle Nieuws");

  const filteredNews =
    activeCategory === "Alle Nieuws"
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeCategory);

  const featuredArticles = filteredNews.filter((article) => article.featured);
  const regularArticles = filteredNews.filter((article) => !article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-light tracking-widest text-muted-foreground mb-4">
            NIEUWS & PERS
          </p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-8">
            Blijf op de hoogte
          </h1>
          <p className="text-lg font-light text-muted-foreground max-w-2xl">
            Ontdek het laatste nieuws, persberichten en projectaankondigingen
            van Architectenbureau Paul Kindt.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-light tracking-wide transition ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-input hover:border-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Uitgelicht
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/nieuws/${article.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative h-96 overflow-hidden bg-muted mb-4">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-light tracking-widest text-muted-foreground">
                        {article.category}
                      </span>
                      <span className="text-xs font-light text-muted-foreground">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-light tracking-tight group-hover:opacity-60 transition mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-b border-border py-8 mb-16">
              <p className="text-sm font-light text-muted-foreground">
                {filteredNews.length}{" "}
                {filteredNews.length === 1 ? "artikel" : "artikelen"}
              </p>
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Meer Nieuws
            </h2>
            <div className="space-y-12">
              {regularArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/nieuws/${article.id}`}
                  className="group cursor-pointer block"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 border-b border-border hover:opacity-60 transition">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs font-light tracking-widest text-muted-foreground">
                          {article.category}
                        </span>
                        <span className="text-xs font-light text-muted-foreground">
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-light tracking-tight mb-3">
                        {article.title}
                      </h3>
                      <p className="text-base font-light text-foreground/70 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                        <span>By {article.author}</span>
                        <span>→</span>
                      </div>
                    </div>
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-light text-muted-foreground">
              Geen nieuws gevonden in deze categorie
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
