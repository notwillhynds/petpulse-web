# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npx prettier --check .   # Check formatting
npx prettier --write .   # Fix formatting
```

No test framework is configured.

## Architecture

**Next.js 16 App Router** application for pet health monitoring (smart harness product). Uses TypeScript strict mode, Tailwind CSS 4, and shadcn/ui (New York style, stone base color).

### Key Layers

- **`app/`** - Pages using App Router. Server components by default; client components marked with `'use client'`.
- **`components/ui/`** - shadcn/ui primitives (add new ones via `npx shadcn add <component>`).
- **`components/petpulse-ui/`** - Custom app components (navbar, footer, breed cards, forms).
- **`lib/supabase/`** - Supabase client/server/proxy split for SSR auth. `client.ts` for browser, `server.ts` for server components/actions.
- **`lib/dog-api.ts`, `lib/cat-api.ts`** - External API integrations (TheDog API, TheCat API). Server-side only (use secret API keys).
- **`supabase/migrations/`** - Database schema. Profiles table with RLS policies and auto-creation trigger on signup.

### Auth Flow

Supabase handles auth. `proxy.ts` (middleware) refreshes sessions on each request. The `lib/supabase/` directory has separate client/server implementations following Supabase SSR patterns. Protected routes (e.g., `/user/settings`) redirect unauthenticated users.

### Path Aliases

`@/*` maps to the project root (e.g., `@/components/ui/button`, `@/lib/utils`).

## Code Style

- Prettier: single quotes, trailing commas (es5), 2-space indent, 100 char width, semicolons
- Prettier plugin auto-sorts Tailwind classes
- `cn()` from `@/lib/utils` for merging Tailwind classes (clsx + tailwind-merge)

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase connection
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe (integration WIP)
- `THE_DOG_API_KEY` / `THE_CAT_API_KEY` - Breed API keys (server-side only)
