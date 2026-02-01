"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onOpenChange,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update currentIndex when initialIndex prop changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full max-w-6xl max-h-[90vh] p-6 outline-none overflow-hidden">
          <Dialog.Title className="sr-only">Project Image Gallery</Dialog.Title>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Close Button */}
            <Dialog.Close className="absolute top-24 right-6 sm:top-4 sm:right-4 z-[60] text-white hover:opacity-70 transition">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Dialog.Close>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center mb-6 w-full">
              <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1} of ${images.length}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-8 w-full">
              <button
                onClick={handlePrevious}
                className="text-white hover:opacity-70 transition disabled:opacity-50"
                aria-label="Previous image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition ${
                      index === currentIndex
                        ? "w-6 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="text-white hover:opacity-70 transition disabled:opacity-50"
                aria-label="Next image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
