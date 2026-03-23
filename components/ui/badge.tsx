import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-primary/10 text-primary dark:bg-primary/20 border-transparent',
        variant === 'outline' && 'border-border text-muted-foreground dark:border-input',
        className
      )}
      {...props}
    />
  );
}
