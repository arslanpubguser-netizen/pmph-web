# PUBG Mobile Pakistan Hub

Pakistan's leading PUBG Mobile esports platform — find teams, recruit players, join tournaments, and stay ahead of the game.

## Features

- **Teams** — Discover competitive teams, view rosters, and apply to join
- **Players** — Browse player profiles with stats, ranks, and roles
- **Tournaments** — Find and register for PUBG Mobile tournaments
- **Rankings** — Live team and player leaderboards
- **News** — Professional esports news portal with categories
- **Marketplace** — Premium gaming accessories store
- **Dashboard** — Player and team management dashboard
- **Admin** — Full platform administration panel
- **Auth** — Email/password and Google OAuth via Supabase

## Tech Stack

- React 18 + TypeScript
- Vite 5
- React Router 7
- Tailwind CSS 3
- Framer Motion
- Lucide React
- Supabase (auth + database)
- TanStack Query
- Zustand
- React Hook Form + Zod

## Installation

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the schema migration from `supabase/schema.sql`
3. Apply RLS policies from `supabase/rls.sql`
4. Seed data with `supabase/seed.sql`
5. Configure authentication providers in Supabase dashboard

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run typecheck # TypeScript check
```

## Deployment

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`

### GitHub

1. Push to GitHub repository
2. Connect to Cloudflare Pages for automatic deployments

## Security Notes

- RLS is enabled on all tables
- Service role key is never exposed to the browser
- Input validation via Zod on all forms
- Protected routes with role-based access control

## License

© 2026 PUBG Mobile Pakistan Hub. All rights reserved.
