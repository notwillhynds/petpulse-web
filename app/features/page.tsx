'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertCircle, Bell, ClipboardList, Heart } from 'lucide-react';

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

function BreedCardSkeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded-2xl border border-border bg-card p-5">
      <div className="h-32 rounded-lg bg-muted" />
      <div className="h-4 w-2/3 rounded bg-muted" />
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-4/5 rounded bg-muted" />
    </div>
  );
}

function BreedSectionError() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-10 text-center">
      <AlertCircle className="h-8 w-8 text-destructive/60" aria-hidden="true" />
      <p className="text-sm font-medium text-foreground">Could not load breed data</p>
      <p className="max-w-sm text-xs text-muted-foreground">
        We couldn&apos;t reach The Dog API right now. Please try again later.
      </p>
    </div>
  );
}

function FeaturePreviewPanel() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur sm:p-6">
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Live Snapshot</p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">Luna · Golden Retriever</h3>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            Stable
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-background/80 p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Heart Rate</p>
            <p className="mt-1 text-xl font-semibold text-foreground">98 bpm</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Activity</p>
            <p className="mt-1 text-xl font-semibold text-foreground">7.3k steps</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Temperature</p>
            <p className="mt-1 text-xl font-semibold text-foreground">101.1&deg;F</p>
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-border/60 bg-background/80 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">Heart rate trend</span>
            <span className="text-muted-foreground">Last 30 days</span>
          </div>
          <svg
            viewBox="0 0 240 64"
            role="img"
            aria-label="Sample heart rate trend"
            className="h-16 w-full"
            preserveAspectRatio="none"
          >
            <polyline
              points="0,44 20,38 40,42 60,28 80,32 100,24 120,30 140,22 160,28 180,18 200,24 220,20 240,22"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-primary"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="rounded-full border border-border/60 bg-background/90 px-3 py-1 text-muted-foreground">
            Alert threshold: configured
          </div>
          <div className="rounded-full border border-border/60 bg-background/90 px-3 py-1 text-muted-foreground">
            Report: ready for vet export
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  // Dog API integration is wired up in a separate task — loading skeleton shown as placeholder
  const dogApiStatus = 'loading' as 'loading' | 'error' | 'idle';

  return (
    <div className="bg-background">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 lg:gap-16 lg:px-8 lg:py-16">
        {/* Page header */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Features</p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Everything you need to stay ahead of your pet&apos;s health.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              PetPulse brings together continuous sensing, behavior tracking, and clear reporting into
              one platform designed around the way pets actually live.
            </p>
          </div>
          <FeaturePreviewPanel />
        </section>

        {/* Feature cards */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Core capabilities
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Built to monitor what matters most, all day and night.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="h-full">
                  <CardHeader className="border-b border-border/40 bg-card/60">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">{feature.detail}</CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Dog API section — wired up in a separate task */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Breed health guide
              </h2>
              <Badge variant="outline">Powered by The Dog API</Badge>
            </div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Explore breed-specific health profiles and common care considerations.
            </p>
          </div>

          {dogApiStatus === 'error' ? (
            <BreedSectionError />
          ) : dogApiStatus === 'loading' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <BreedCardSkeleton key={i} />
              ))}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
