"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/#features" },
  { label: "Subscribe", href: "/#subscribe" },
];

export function Navbar() {
  const pathname = usePathname();
  const supabase = createClient();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!isMounted) return;
        setIsAuthenticated(!!data.user);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadingAuth(false);
      });

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    // Treat hash links as part of the page they belong to
    const cleanedHref = href.split("#")[0];
    if (cleanedHref === pathname) {
      return true;
    }

    return pathname.startsWith(cleanedHref) && cleanedHref !== "";
  };

  const navLinks = navItems.map((item) => {
    const active = isActive(item.href);

    return (
      <Link
        key={item.label}
        href={item.href}
        className={cn(
          "text-sm font-medium transition-colors",
          "text-muted-foreground hover:text-foreground",
          active && "text-foreground border-b-2 border-primary pb-1",
        )}
        onClick={() => setMobileOpen(false)}
      >
        {item.label}
      </Link>
    );
  });
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              PP
            </span>
            <span className="text-base font-semibold tracking-tight">
              PetPulse
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks}
        </nav>

        <div className="flex items-center gap-3">
          {!loadingAuth && !isAuthenticated && (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
          {!loadingAuth && isAuthenticated && (
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Logout
            </button>
          )}

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3">
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
