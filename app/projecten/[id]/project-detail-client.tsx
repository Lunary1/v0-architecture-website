"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StrapiBlocksRenderer, {
  BlocksContent,
} from "@/components/blocks-renderer";
import ImageLightbox from "@/components/image-lightbox";
import { Project } from "@/lib/strapi";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects?: Project[];
}

export default function ProjectDetailClient({
  project,
  relatedProjects = [],
}: ProjectDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Record<number, number>
  >({});

  // On mount, check for cached images that may have already loaded
  useEffect(() => {
    const images = document.querySelectorAll("[data-gallery-image]");
    const ratios: Record<number, number> = {};

    images.forEach((img) => {
      const indexStr = img.getAttribute("data-image-index");
      if (indexStr !== null && img instanceof HTMLImageElement) {
        const index = parseInt(indexStr, 10);
        if (img.complete && img.naturalWidth > 0) {
          // Image is already loaded (cached)
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          ratios[index] = aspectRatio;
        }
      }
    });

    if (Object.keys(ratios).length > 0) {
      setImageAspectRatios(ratios);
    }
  }, []);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleImageLoad = (
    index: number,
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspectRatios((prev) => ({
      ...prev,
      [index]: aspectRatio,
    }));
  };

  const shouldSpanTall = (index: number) => {
    const aspectRatio = imageAspectRatios[index];
    if (aspectRatio === undefined) return false; // Don't span while loading

    // Only portrait images can span (aspect ratio < 1 = taller than wide)
    if (aspectRatio >= 1) return false;

    // Within each group of 5, identify which images are most portrait-like
    const totalImages = project.imageUrls.length;
    const groupStart = Math.floor(index / 5) * 5;
    const groupEnd = Math.min(groupStart + 5, totalImages);

    // Get all images in this group with their aspect ratios
    const groupImages = [];
    for (let i = groupStart; i < groupEnd; i++) {
      if (imageAspectRatios[i] !== undefined) {
        groupImages.push({ index: i, ratio: imageAspectRatios[i] });
      }
    }

    // Sort by aspect ratio (lowest/most portrait first)
    groupImages.sort((a, b) => a.ratio - b.ratio);

    // Only the top 2 most portrait-like images in each group can span
    const canSpanIndices = groupImages.slice(0, 2).map((img) => img.index);

    return canSpanIndices.includes(index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              href="/projecten"
              className="text-sm font-light tracking-widest hover:opacity-60 transition mb-8 inline-block"
            >
              ← TERUG NAAR PROJECTEN
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Column - Title */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8">
                {project.title}
              </h1>
              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    CATEGORIE
                  </p>
                  <p className="text-base font-light">
                    {project.categories.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    LOCATIE
                  </p>
                  <p className="text-base font-light">{project.location}</p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    JAAR
                  </p>
                  <p className="text-base font-light">{project.year}</p>
                </div>
                <div>
                  <p className="text-xs font-light tracking-widest text-muted-foreground mb-2">
                    OPPERVLAKTE
                  </p>
                  <p className="text-base font-light">{project.surface} m²</p>
                </div>
              </div>
            </div>

            {/* Right Column - Description (spans 3 columns) */}
            <div className="lg:col-span-3">
              {/* Image Gallery - Bento Box Layout */}
              {project.imageUrls.length > 0 && (
                <div className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[280px]">
                    {project.imageUrls.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`overflow-hidden rounded-sm bg-muted cursor-pointer ${
                          shouldSpanTall(index) ? "row-span-2" : ""
                        }`}
                        onClick={() => handleImageClick(index)}
                      >
                        <img
                          src={imageUrl}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:opacity-90 transition duration-300"
                          data-gallery-image
                          data-image-index={index}
                          onLoad={(e) => handleImageLoad(index, e)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-12">
              {project.descriptionBlocks &&
                project.descriptionBlocks.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-light tracking-tight mb-6"></h2>
                    <StrapiBlocksRenderer
                      content={project.descriptionBlocks as BlocksContent}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* More Projects */}
      <section className="py-24 px-6 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light tracking-tight">
              Meer Projecten
            </h2>
          </div>
          <div
            className={`grid gap-8 ${
              relatedProjects.length > 0
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {relatedProjects.length > 0 ? (
              relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.documentId}
                  href={`/projecten/${relatedProject.documentId}`}
                  className="group cursor-pointer"
                >
                  <div className="relative h-72 bg-muted mb-4 overflow-hidden rounded-sm">
                    {relatedProject.imageUrls.length > 0 ? (
                      <img
                        src={
                          relatedProject.thumbnail ||
                          relatedProject.imageUrls[0]
                        }
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:opacity-80 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-sm text-slate-500">No image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-light tracking-tight group-hover:opacity-60 transition">
                    {relatedProject.title}
                  </h3>
                </Link>
              ))
            ) : (
              <Link href="/projecten" className="group cursor-pointer">
                <div className="relative h-72 bg-muted mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm text-slate-500">
                      Browse all projects
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-light tracking-tight group-hover:opacity-60 transition">
                  Verken ons volledige portfolio
                </h3>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={project.imageUrls}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </>
  );
}
