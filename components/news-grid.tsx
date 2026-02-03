"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NewsArticle } from "@/lib/strapi";

export default function NewsGrid() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState("Alle Nieuws");
  const [categories, setCategories] = useState<string[]>(["Alle Nieuws"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setArticles(data);

        // Extract unique categories from articles
        const uniqueCategories = new Set<string>();
        data.forEach((article: NewsArticle) => {
          article.categories.forEach((cat) => uniqueCategories.add(cat));
        });

        setCategories(["Alle Nieuws", ...Array.from(uniqueCategories).sort()]);
      } catch (error) {
        console.error("Error loading news articles:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const filteredNews = (
    activeCategory === "Alle Nieuws"
      ? articles
      : articles.filter((article) =>
          article.categories.includes(activeCategory),
        )
  ).sort(
    (a, b) =>
      new Date(b.publishedAt || b.date).getTime() -
      new Date(a.publishedAt || a.date).getTime(),
  );

  // Show up to 2 featured articles, rest below
  const featuredArticles = filteredNews.slice(0, 2);
  const restArticles = filteredNews.slice(2);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="pt-36 md:pt-52 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 md:mb-12 text-center md:text-left">
            Blijf op de hoogte
          </h1>
          <div className="mb-12 md:mb-16 flex md:block justify-center">
            <div className="w-12 h-px bg-primary/30"></div>
          </div>
          <p className="text-center text-muted-foreground">Laden...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-36 md:pt-52 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 md:mb-12 text-center md:text-left">
          Blijf op de hoogte
        </h1>

        {/* Decorative Divider */}
        <div className="mb-12 md:mb-16 flex md:block justify-center">
          <div className="w-12 h-px bg-primary/30"></div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg font-light text-muted-foreground mb-12 text-center md:text-left">
          Ontdek het laatste nieuws, persberichten en projectaankondigingen van
          Architectenbureau Paul Kindt.
        </p>

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

        {/* Featured Articles Grid (2 columns) */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Uitgelicht
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {featuredArticles.map((article) => (
                <Link
                  key={article.documentId}
                  href={`/nieuws/${article.documentId}`}
                  className="group cursor-pointer"
                >
                  {/* Image with consistent aspect ratio */}
                  <div className="relative w-full aspect-video bg-muted mb-4 rounded-sm overflow-hidden">
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      {article.categories.map((cat, idx) => (
                        <span
                          key={`${cat}-${idx}`}
                          className="text-xs font-light tracking-widest text-muted-foreground"
                        >
                          {cat}
                        </span>
                      ))}
                      <span className="text-xs font-light text-muted-foreground">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-light tracking-tight group-hover:opacity-60 transition mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground line-clamp-2">
                      {article.description.substring(0, 120)}...
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

        {/* Rest of Articles */}
        {restArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Meer Nieuws
            </h2>
            <div className="space-y-12">
              {restArticles.map((article) => (
                <Link
                  key={article.documentId}
                  href={`/nieuws/${article.documentId}`}
                  className="group cursor-pointer block"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 border-b border-border hover:opacity-60 transition">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-3 flex-wrap">
                        {article.categories.map((cat, idx) => (
                          <span
                            key={`${cat}-${idx}`}
                            className="text-xs font-light tracking-widest text-muted-foreground"
                          >
                            {cat}
                          </span>
                        ))}
                        <span className="text-xs font-light text-muted-foreground">
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-light tracking-tight mb-3">
                        {article.title}
                      </h3>
                      <p className="text-base font-light text-foreground/70 leading-relaxed mb-4">
                        {article.description.substring(0, 200)}...
                      </p>
                    </div>
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {article.thumbnail && (
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      )}
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
