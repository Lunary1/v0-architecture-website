"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Project, Category } from "@/lib/strapi";
import { slugify } from "@/lib/utils";

interface ProjectsGridProps {
  projects: Project[];
  categories: Category[];
}

const defaultCategories = [
  "Alle Projecten",
  "Residentieel Modern",
  "Residentieel Klassiek",
  "Kantoor- en industriebouw",
  "Interieur",
];

// Define category order for consistent sorting
const categoryOrder: Record<string, number> = {
  "Alle Projecten": 0,
  "Residentieel Modern": 1,
  "Residentieel Klassiek": 2,
  "Kantoor- en industriebouw": 3,
  Interieur: 4,
};

export default function ProjectsGrid({
  projects,
  categories,
}: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState("Alle Projecten");

  // Build category list from Strapi, fallback to defaults, then sort by categoryOrder
  const displayCategories = useMemo(() => {
    // Always start with "Alle Projecten"
    if (categories.length === 0) return defaultCategories;

    const strapiCategoryNames = categories.map((c) => c.name);
    const otherCategories = strapiCategoryNames.filter(
      (cat) => cat !== "Alle Projecten",
    );

    // Sort other categories by categoryOrder
    const sortedOthers = otherCategories.sort(
      (a, b) => (categoryOrder[a] || 999) - (categoryOrder[b] || 999),
    );

    // Always put "Alle Projecten" first
    return ["Alle Projecten", ...sortedOthers];
  }, [categories]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Alle Projecten") {
      return projects;
    }
    // Check if project has ANY of the active categories (many-to-many relationship)
    return projects.filter((project) =>
      project.categories.includes(activeCategory),
    );
  }, [activeCategory, projects]);

  return (
    <section className="pt-36 md:pt-52 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 md:mb-12 text-center md:text-left">
          Ons volledige portfolio
        </h1>

        {/* Decorative Divider */}
        <div className="mb-12 md:mb-16 flex md:block justify-center">
          <div className="w-12 h-px bg-primary/30"></div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg font-light text-muted-foreground mb-12 text-center md:text-left">
          Verken ons uitgebreide portfolio van residentiële, industriële en
          interieurprojecten
        </p>

        {/* Filter Categories */}
        <div className="mb-12 flex flex-wrap gap-2 md:gap-3">
          {displayCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-light tracking-wide transition whitespace-nowrap ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-input hover:border-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Count */}
        <div className="mb-8 pb-8 border-b border-border">
          <p className="text-sm font-light text-muted-foreground">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projecten"}
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {filteredProjects.map((project) => (
              <Link
                key={project.documentId}
                href={`/projecten/${slugify(project.title)}`}
                className="group cursor-pointer"
              >
                <div className="relative h-56 md:h-80 overflow-hidden bg-muted mb-4">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-300">
                      <span className="text-sm text-slate-500">
                        No image available
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-light tracking-widest text-muted-foreground">
                      {(project.categories || []).join(" · ")}
                    </p>
                    <p className="text-xs font-light text-muted-foreground">
                      {project.year}
                    </p>
                  </div>
                  <h3 className="text-2xl font-light tracking-tight group-hover:opacity-60 transition mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground">
                    {project.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-light text-muted-foreground">
              Geen projecten gevonden in deze categorie
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
