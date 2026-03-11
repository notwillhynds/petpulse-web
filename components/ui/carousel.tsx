"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  images: { src: string; alt: string }[];
  className?: string;
};

export function Carousel({ images, className }: CarouselProps) {
  const [index, setIndex] = React.useState(0);

  const showPrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <div className="aspect-[4/3] w-full bg-muted">
        {/* In a real app, swap this for next/image */}
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="h-full w-full object-cover"
        />
      </div>

      <button
        type="button"
        onClick={showPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground shadow-sm hover:bg-background"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={showNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground shadow-sm hover:bg-background"
      >
        Next
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-border",
              i === index && "bg-primary",
            )}
          />
        ))}
      </div>
    </div>
  );
}

