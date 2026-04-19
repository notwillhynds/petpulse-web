import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

export default function SubscribeSuccessPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/8 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <CircleCheck className="h-16 w-16 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Subscription Confirmed
        </h1>
        <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          Thank you for subscribing to PetPulse! Your plan is now active.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go to Dashboard</Link>
        </Button>
      </main>
    </div>
  );
}
