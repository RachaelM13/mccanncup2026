# Rachael's World Cup 2026

Family bracket challenge for FIFA World Cup 2026. Built with Next.js, Supabase, Tailwind CSS, shadcn/ui, and Framer Motion.

---

## Setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **API keys** (anon + service_role) from Settings → API.

### 2. Run the database schema

In the Supabase **SQL Editor**, run these files in order:

```
supabase/schema.sql
supabase/seed.sql
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase URL, anon key, service role key, and admin password.

### 4. Install dependencies

```bash
npm install
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in [vercel.com](https://vercel.com).
3. Add all environment variables from `.env.example`.
4. Deploy.

---

## Scoring

| Round        | Points per correct pick |
|--------------|------------------------|
| Round of 32  | 1 pt                   |
| Round of 16  | 2 pts                  |
| Quarterfinal | 4 pts                  |
| Semifinal    | 8 pts                  |
| Final        | 16 pts                 |
| Champion     | +10 bonus pts          |

**Maximum possible: 90 points**

---

## Admin

Visit `/admin` and enter your `ADMIN_PASSWORD` to:
- Record match results
- Advance winners through the bracket
- Reset the tournament (dev only)

---

## Architecture

```
lib/providers/
  types.ts                        ← TournamentDataProvider interface
  ManualTournamentProvider.ts     ← Supabase implementation
  index.ts                        ← Factory function

lib/supabase/
  client.ts                       ← Browser Supabase client
  server.ts                       ← Server Supabase client (RSC + Actions)
  database.types.ts               ← Generated DB types

lib/scoring.ts                    ← Pure scoring functions (testable)
types/index.ts                    ← All TypeScript types
supabase/                         ← SQL schema, seed data, migrations
```

To swap in a live football API later, implement `TournamentDataProvider`
and update the factory in `lib/providers/index.ts`. No UI code changes needed.
