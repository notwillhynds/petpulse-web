'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
      className={cn('border-border bg-card relative overflow-hidden rounded-2xl border', className)}
    >
      <div className="bg-muted aspect-[4/3] w-full">
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
        className="bg-background/80 text-foreground hover:bg-background absolute top-1/2 left-3 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-medium shadow-sm"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={showNext}
        className="bg-background/80 text-foreground hover:bg-background absolute top-1/2 right-3 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-medium shadow-sm"
      >
        Next
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={cn('bg-border h-1.5 w-1.5 rounded-full', i === index && 'bg-primary')}
          />
        ))}
      </div>
    </div>
  );
}
