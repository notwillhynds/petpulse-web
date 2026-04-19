import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Bell, ClipboardList, Heart } from 'lucide-react';
import { Suspense } from 'react';
import {
  DogBreedCard,
  CatBreedCard,
  BreedCardSkeleton,
  BreedSectionError,
} from '@/components/petpulse-ui/breedCard';
import { FeaturePreviewPanel } from '@/components/petpulse-ui/featurePanel';
import { getDogBreed, getRandDogBreeds } from '@/lib/dog-api';
import { getRandCatBreeds } from '@/lib/cat-api';

const FEATURES = [
  {
    icon: Heart,
    title: 'Real-Time Vitals',
    description:
      "Continuously monitor heart rate, respiratory rate, and body temperature so you always have a current picture of your pet's health.",
    detail: 'Updates every few seconds directly from the harness sensor.',
  },
  {
    icon: Activity,
    title: 'Activity Tracking',
    description:
      "Track daily steps, exercise intensity, and movement patterns to understand your pet's energy levels and physical trends over time.",
    detail: 'Daily and weekly summaries available in the dashboard.',
  },

  {
    icon: Bell,
    title: 'Smart Alerts',
    description:
      'Receive instant notifications when vitals fall outside normal ranges, so you can act quickly and consult your vet with confidence.',
    detail: 'Customizable thresholds per pet.',
  },
  {
    icon: ClipboardList,
    title: 'Daily Summaries',
    description:
      "Get a clear end-of-day digest of your pet's activity, rest, and vitals so you can spot trends and stay informed without checking constantly.",
    detail: 'Delivered each evening to your dashboard and app.',
  },
];

export default async function FeaturesPage() {
  const dogData = getRandDogBreeds() as string[];
  const catData = getRandCatBreeds() as string[];

  // Dog API integration is wired up in a separate task — loading skeleton shown as placeholder
  const dogApiStatus = 'loading' as 'loading' | 'error' | 'idle';

  return (
    <div className="bg-background">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 lg:gap-16 lg:px-8 lg:py-16">
        {/* Page header */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="space-y-4">
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              Features
            </p>
            <h1 className="text-foreground max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Everything you need to stay ahead of your pet&apos;s health.
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm leading-7 sm:text-base">
              PetPulse brings together continuous sensing, behavior tracking, and clear reporting
              into one platform designed around the way pets actually live.
            </p>
          </div>
          <FeaturePreviewPanel />
        </section>

        {/* Feature cards */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Core capabilities
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Built to monitor what matters most, all day and night.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="h-full">
                  <CardHeader className="border-border/40 bg-card/60 border-b">
                    <div className="bg-primary/10 mb-2 flex h-9 w-9 items-center justify-center rounded-lg">
                      <Icon className="text-primary h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs">
                    {feature.detail}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Dog API section — wired up in a separate task */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
                Breed health guide
              </h2>
              <Badge variant="outline">Powered by The Dog API</Badge>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore breed-specific health profiles and common care considerations.
            </p>
          </div>

          {dogApiStatus === 'error' ? (
            <BreedSectionError />
          ) : (
            <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Suspense key={i} fallback={<BreedCardSkeleton />}>
                  <DogBreedCard breed={dogData[i]} />
                </Suspense>
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <Suspense key={i} fallback={<BreedCardSkeleton />}>
                  <CatBreedCard breed={catData[i]} />
                </Suspense>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
