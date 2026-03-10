"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/#features" },
  { label: "Subscribe", href: "/#subscribe" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold tracking-tight">PetPulse</div>
          <div className="text-xs text-muted-foreground">
            © {year} PetPulse. All rights reserved.
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="mailto:hello@petpulse.app"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

