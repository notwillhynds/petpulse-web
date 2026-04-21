import { Badge } from '@/components/ui/badge';

export function FeaturePreviewPanel() {
  return (
    <div className="border-border bg-card/70 relative overflow-hidden rounded-3xl border p-5 shadow-sm backdrop-blur sm:p-6">
      <div className="bg-primary/10 pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full blur-2xl" />

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-primary text-xs font-medium tracking-[0.18em] uppercase">
              Live Snapshot
            </p>
            <h3 className="text-foreground mt-1 text-lg font-semibold">Luna · Golden Retriever</h3>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            Stable
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="border-border/60 bg-background/80 rounded-xl border p-3">
            <p className="text-muted-foreground text-[11px] tracking-wide uppercase">Heart Rate</p>
            <p className="text-foreground mt-1 text-xl font-semibold">98 bpm</p>
          </div>
          <div className="border-border/60 bg-background/80 rounded-xl border p-3">
            <p className="text-muted-foreground text-[11px] tracking-wide uppercase">Activity</p>
            <p className="text-foreground mt-1 text-xl font-semibold">7.3k steps</p>
          </div>
          <div className="border-border/60 bg-background/80 rounded-xl border p-3">
            <p className="text-muted-foreground text-[11px] tracking-wide uppercase">Temperature</p>
            <p className="text-foreground mt-1 text-xl font-semibold">101.1&deg;F</p>
          </div>
        </div>

        <div className="border-border/60 bg-background/80 space-y-2 rounded-xl border p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground font-medium">Heart rate trend</span>
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
        </div>
      </div>
    </div>
  );
}
