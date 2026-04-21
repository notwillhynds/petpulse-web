import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LiveMonitorWidget } from '@/components/ui/live-monitor-widget';
import { Activity, Heart, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel } from '@/components/ui/carousel';

const FEATURES = [
  {
    title: 'Real-time vitals',
    description:
      'Continuously monitor heart rate, activity level, and rest so you always know how your pet is doing.',
  },
  {
    title: 'Behavior insights',
    description:
      'Spot subtle changes in sleep, anxiety, and routine before they turn into bigger health issues.',
  },
  {
    title: 'Vet-ready reports',
    description:
      'Share clear, exportable summaries with your vet in seconds for faster, data-informed care.',
  },
  {
    title: 'Multi-pet friendly',
    description:
      'Manage multiple pets in a single dashboard with tailored alerts and recommendations.',
  },
];

const HARNESS_IMAGES = [
  {
    src: '/images/harness-dog-2.png',
    alt: 'Close-up of the PetPulse sensor module on the harness',
  },
  {
    src: '/images/harness-2.png',
    alt: 'Owner checking the PetPulse app while their dog rests',
  },
  {
    src: '/images/harness-3.png',
    alt: 'Dog wearing the PetPulse smart harness on a walk',
  },
  {
    src: '/images/harness-4.png',
    alt: 'a cat wearing the PetPulse smart harness on a walk',
  },
];

export default function Home() {
  return (
    <div className="bg-background">
      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <Badge>Smart pet health tracking</Badge>
            <div className="space-y-4">
              <h1 className="text-foreground text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Know your pet&apos;s health
                <span className="text-primary"> before problems appear.</span>
              </h1>
              <p className="text-muted-foreground max-w-xl text-base text-balance sm:text-lg">
                PetPulse turns your pet&apos;s daily activity into clear health insights, so you can
                catch issues early and spend more time on the good moments.
              </p>
            </div>
            <div className="text-muted-foreground mt-6 flex flex-wrap gap-6 text-sm">
              <span className="inline-flex items-center gap-2">
                <Activity className="text-primary h-4 w-4" aria-hidden="true" />
                Activity tracking
              </span>
              <span className="inline-flex items-center gap-2">
                <Heart className="text-primary h-4 w-4" aria-hidden="true" />
                Health insights
              </span>
              <span className="inline-flex items-center gap-2">
                <Smartphone className="text-primary h-4 w-4" aria-hidden="true" />
                Mobile alerts
              </span>
            </div>
           
          </div>

          <div className="w-full max-w-2xl space-y-4">
            <div className="border-border from-primary/5 rounded-3xl border bg-gradient-to-br to-transparent p-6 shadow-sm backdrop-blur">
              <Carousel images={HARNESS_IMAGES} />
            </div>
            <LiveMonitorWidget />
          </div>
        </section>

        {/* Feature overview */}
        <section id="features" className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              A full picture of your pet&apos;s wellbeing
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
              PetPulse combines continuous sensing, behavior insights, and simple reports into a
              single, pet-first dashboard.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardHeader className="border-border/40 bg-card/60 border-b">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Harness showcase / CTA */}
        <section
          id="subscribe"
          className="border-border bg-card/60 grid gap-8 rounded-3xl border px-6 py-8 sm:px-8 sm:py-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center"
        >
          <div className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Built around real life with pets.
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
              From morning walks to late-night zoomies, PetPulse is designed to stay comfortable,
              secure, and helpful, without getting in the way of how your pet actually lives.
            </p>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Soft, adjustable harness design for all-day wear.</li>
              <li>• Battery life measured in days, not hours.</li>
              <li>• App alerts when something looks off.</li>
            </ul>
          </div>

          <div className="border-border/70 bg-background/80 overflow-hidden rounded-2xl border">
            <Image
              src="/images/harness-10.png"
              alt="PetPulse harness on a dog outdoors"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
