"use client";

import { Activity, BedSingle, Footprints, HeartPulse, Thermometer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Metric = {
  key: "pulse" | "heartRate" | "steps" | "temp" | "sleep";
  label: string;
  unit: string;
  colorClass: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MetricSeries = Record<Metric["key"], number[]>;

const metrics: Metric[] = [
  { key: "pulse", label: "Pulse", unit: "ms", colorClass: "text-sky-500", icon: Activity },
  { key: "heartRate", label: "Heart Rate", unit: "bpm", colorClass: "text-rose-500", icon: HeartPulse },
  { key: "steps", label: "Steps", unit: "steps", colorClass: "text-emerald-500", icon: Footprints },
  { key: "temp", label: "Temp", unit: "degF", colorClass: "text-amber-500", icon: Thermometer },
  { key: "sleep", label: "Sleep", unit: "hrs", colorClass: "text-violet-500", icon: BedSingle },
];

const SERIES_POINTS = 20;

function nextValue(key: Metric["key"], prev: number) {
  switch (key) {
    case "pulse":
      return clamp(prev + jitter(6), 35, 120);
    case "heartRate":
      return clamp(prev + jitter(5), 68, 160);
    case "steps":
      return clamp(prev + jitter(180), 120, 4200);
    case "temp":
      return round(clamp(prev + jitter(0.25), 99.1, 103.8), 1);
    case "sleep":
      return round(clamp(prev + jitter(0.2), 0.6, 9.6), 1);
  }
}

function jitter(range: number) {
  return (Math.random() - 0.5) * range;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function round(value: number, decimals: number) {
  const power = 10 ** decimals;
  return Math.round(value * power) / power;
}

function buildPath(values: number[], width = 120, height = 36) {
  if (!values.length) return "";

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatMetricValue(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function LiveMonitorWidget() {
  const [series, setSeries] = useState<MetricSeries>({
    pulse: Array.from({ length: SERIES_POINTS }, (_, i) => 70 + i * 1.2),
    heartRate: Array.from({ length: SERIES_POINTS }, (_, i) => 96 + i * 1.1),
    steps: Array.from({ length: SERIES_POINTS }, (_, i) => 450 + i * 70),
    temp: Array.from({ length: SERIES_POINTS }, () => 101.4),
    sleep: Array.from({ length: SERIES_POINTS }, (_, i) => 5.2 + i * 0.07),
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeries((prev) => {
        const updated = { ...prev };
        for (const metric of metrics) {
          const values = prev[metric.key];
          const last = values[values.length - 1];
          const next = nextValue(metric.key, last);
          updated[metric.key] = [...values.slice(1), next];
        }
        return updated;
      });
    }, 1700);

    return () => window.clearInterval(interval);
  }, []);

  const latestValues = useMemo(() => {
    const output: Record<Metric["key"], number> = {
      pulse: 0,
      heartRate: 0,
      steps: 0,
      temp: 0,
      sleep: 0,
    };

    for (const metric of metrics) {
      const values = series[metric.key];
      output[metric.key] = values[values.length - 1];
    }

    return output;
  }, [series]);

  return (
    <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Live Monitor</p>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const points = series[metric.key];
          const path = buildPath(points);
          const value = latestValues[metric.key];

          return (
            <div key={metric.key} className="rounded-xl border border-border/60 bg-background/80 p-2.5">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${metric.colorClass}`} />
                  <span className="text-[11px] font-medium text-muted-foreground">{metric.label}</span>
                </div>
                <span className="text-[11px] font-semibold text-foreground">
                  {formatMetricValue(value)} {metric.unit}
                </span>
              </div>

              <svg viewBox="0 0 120 36" className="h-9 w-full">
                <path d={path} fill="none" className={metric.colorClass} stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
