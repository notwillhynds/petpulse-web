'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X, Loader, User as UserIcon, LogOut, Cog } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignUpForm from './signup-form';
import LoginForm from './login-form';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/#features' },
  { label: 'Subscribe', href: '/#subscribe' },
];
const supabase = createClient();

export function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
      setLoadingAuth(false);
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [isAuthenticated]);

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.push('/');
  };

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

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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

        <div className="flex items-center gap-3">
          {!loadingAuth && !isAuthenticated && (
            <div className="hidden items-center gap-2 md:flex">
              <LoginForm />
              <SignUpForm />
            </div>
          )}
          {!loadingAuth && isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-1.5 py-1.5 text-sm font-medium transition-colors">
                  <UserIcon className="h-5 w-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" sideOffset={10}>
                <DropdownMenuLabel className="text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    {user?.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/user/settings">
                    <div className="flex items-center gap-2">
                      <Cog className="h-4 w-4" />
                      Settings
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                >
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4, w-4" />}
                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button
            type="button"
            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
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
            {!loadingAuth && !isAuthenticated && (
              <div className="flex flex-row items-center gap-2">
                <LoginForm />
                <SignUpForm />
              </div>
            )}
            {!loadingAuth && !isAuthenticated && (
              <button
                type="button"
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4, w-4" />}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
