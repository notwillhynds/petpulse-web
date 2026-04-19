import { getDogBreed, getRandDogHealthTip } from '@/lib/dog-api';
import { getCatBreed, getRandCatHealthTip } from '@/lib/cat-api';
import { AlertCircle } from 'lucide-react';

export function BreedCardSkeleton() {
  return (
    <div className="border-border bg-card flex h-full min-h-[280px] animate-pulse flex-col gap-3 rounded-2xl border p-5">
      <div className="bg-muted aspect-4/3 w-full shrink-0 rounded-lg" />
      <div className="bg-muted h-5 w-2/3 rounded" />
      <div className="space-y-2">
        <div className="bg-muted h-3 w-24 rounded" />
        <div className="bg-muted h-16 w-full rounded" />
      </div>
    </div>
  );
}

export function BreedSectionError() {
  return (
    <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center gap-3 rounded-2xl border p-10 text-center">
      <AlertCircle className="text-destructive/60 h-8 w-8" aria-hidden="true" />
      <p className="text-foreground text-sm font-medium">Could not load breed data</p>
      <p className="text-muted-foreground max-w-sm text-xs">
        We couldn&apos;t reach The Dog API right now. Please try again later.
      </p>
    </div>
  );
}

interface BreedCardProps {
  breed: string;
}

function BreedCardImage({
  imageUrl,
  name,
  width,
  height,
}: {
  imageUrl?: string;
  name: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="bg-muted/40 w-full shrink-0 overflow-hidden rounded-lg">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className="block h-auto w-full max-w-full object-contain"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="text-muted-foreground flex aspect-4/3 items-center justify-center p-6 text-center text-xs">
          No image
        </div>
      )}
    </div>
  );
}

function HealthTipBlock({ text }: { text: string }) {
  return (
    <div className="min-w-0 flex-1 space-y-1.5">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Health tip
      </p>
      <p className="text-foreground text-sm leading-relaxed break-words">{text}</p>
    </div>
  );
}

export async function DogBreedCard({ breed }: BreedCardProps) {
  const data = await getDogBreed(breed);
  const name = data?.name ?? breed;
  const imageUrl = data?.image?.url;
  const healthTip = getRandDogHealthTip(breed);

  return (
    <div className="border-border bg-card flex h-full min-h-0 flex-col gap-3 rounded-2xl border p-5">
      <BreedCardImage
        imageUrl={imageUrl}
        name={name}
        width={data?.image?.width}
        height={data?.image?.height}
      />
      <h3 className="text-foreground min-w-0 text-base leading-snug font-medium">{name}</h3>
      <HealthTipBlock text={healthTip} />
    </div>
  );
}

export async function CatBreedCard({ breed }: BreedCardProps) {
  const data = await getCatBreed(breed);
  const name = data?.name ?? breed;
  const imageUrl = data?.image?.url;
  const healthTip = getRandCatHealthTip(breed);

  return (
    <div className="border-border bg-card flex h-full min-h-0 flex-col gap-3 rounded-2xl border p-5">
      <BreedCardImage
        imageUrl={imageUrl}
        name={name}
        width={data?.image?.width}
        height={data?.image?.height}
      />
      <h3 className="text-foreground min-w-0 text-base leading-snug font-medium">{name}</h3>
      <HealthTipBlock text={healthTip} />
    </div>
  );
}
