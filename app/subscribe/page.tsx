'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const TIERS = [
  {
    name: 'Basic',
    price: '$14.99',
    priceId: 'price_1TEyWsPhGXtyKWKNSCeRWFqX',
    cta: 'Get Started',
    features: [
      'Real-time activity tracking',
      'Daily step & movement summary',
      'Basic health alerts (abnormal activity)',
      'Mobile app access (iOS & Android)',
      '7-day data history',
      '1 pet profile',
    ],
  },
  {
    name: 'Pro',
    price: '$34.99',
    priceId: 'price_1TEyXTPhGXtyKWKN4aGssqRw',
    popular: true,
    cta: 'Subscribe',
    features: [
      'Everything in Basic, plus:',
      'Heart rate & respiratory monitoring',
      'Vet insights & health trend reports',
      'AI-powered anomaly detection',
      '90-day data history & export',
      'Multi-pet support (up to 3 pets)',
      'GPS location tracking',
      'Custom alert thresholds',
    ],
  },
];

const handleSubscribe = async (priceId: string) => {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    let payload: { url?: string; error?: string } = {};
    try {
      payload = await res.json();
    } catch {
      payload = { error: `Checkout failed (HTTP ${res.status})` };
    }

    if (!res.ok || payload.error || !payload.url) {
      alert(payload.error ?? `Checkout failed (HTTP ${res.status})`);
      return;
    }

    window.location.href = payload.url;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start checkout';
    alert(message);
  }
};

export default function SubscribePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-primary/5 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 lg:gap-16 lg:px-8 lg:py-16">
        {/* Page header */}
        <section className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pricing</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Find the right plan for you and your pet. Upgrade or cancel anytime.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="mx-auto grid w-full max-w-3xl gap-6 md:grid-cols-2">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                'flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                'border-primary shadow-md'
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  {tier.popular && <Badge>Popular</Badge>}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <ul className="flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant="default"
                  size="lg"
                  onClick={() => handleSubscribe(tier.priceId)}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
