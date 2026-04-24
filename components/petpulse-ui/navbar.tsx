'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, X, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
];
export function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const router = useRouter();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    // Treat hash links as part of the page they belong to
    const cleanedHref = href.split('#')[0];
    if (cleanedHref === pathname) {
      return true;
    }

    return pathname.startsWith(cleanedHref) && cleanedHref !== '';
  };

  const navLinks = navItems.map((item) => {
    const active = isActive(item.href);

    return (
      <Link
        key={item.label}
        href={item.href}
        className={cn(
          'text-sm font-medium transition-colors',
          'text-muted-foreground hover:text-foreground',
          active && 'text-foreground border-primary border-b-2 pb-1'
        )}
        onClick={() => setMobileOpen(false)}
      >
        {item.label}
      </Link>
    );
  });

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
              PP
            </span>
            <span className="text-base font-semibold tracking-tight">PetPulse</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">{navLinks}</nav>
        <button
          type="button"
          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            className={cn(
              'border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
              mounted && theme === 'light' && 'bg-accent'
            )}
            onClick={() => setTheme('light')}
            aria-label="Toggle theme"
          >
            <Sun className="w-4, h-4" />
          </button>
          <button
            type="button"
            className={cn(
              'border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
              mounted && theme === 'dark' && 'bg-accent'
            )}
            onClick={() => setTheme('dark')}
            aria-label="Toggle theme"
          >
            <Moon className="h-4 w-4" />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="bg-background border-t md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3">{navLinks}</nav>
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4, w-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
