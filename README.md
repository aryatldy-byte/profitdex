# Profitdex Ventures

A mobile-friendly React web app for Profitdex Ventures — a mutual fund and
trading company. Includes public marketing pages, a client dashboard with
daily market news, and an admin dashboard for publishing that news.

Built with **React (Vite) + React Router + Tailwind CSS v4**. Authentication
and data are currently mocked (localStorage-backed) with clear `TODO`
comments marking where to plug in Supabase.

## Project structure

```
src/
  components/       Navbar, Footer, MarketTicker, NewsCard, MiniLineChart,
                     ProtectedRoute, Layout
  context/
    AuthContext.jsx  Placeholder auth (demo accounts, see below)
  data/
    mockNews.json     Seed data for market news
    newsService.js     Data-access layer (localStorage today, Supabase later)
  lib/
    supabaseClient.js  Placeholder Supabase client
  pages/
    Home.jsx, About.jsx, Contact.jsx, FAQ.jsx      Public pages
    client/ClientLogin.jsx, ClientDashboard.jsx     Client area
    admin/AdminLogin.jsx, AdminDashboard.jsx        Admin area
    NotFound.jsx
  App.jsx             Routes
  main.jsx            Entry point
  index.css           Tailwind + design tokens (colors, fonts)
```

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

Build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Demo logins

Auth is a placeholder (see `src/context/AuthContext.jsx`) so the app has
something to log into during development. **Do not use this in
production** — replace it with real Supabase auth before launch.

| Role   | Email                              | Password  |
|--------|--------------------------------------|-----------|
| Client | client@profitdexventures.com        | client123 |
| Admin  | admin@profitdexventures.com         | admin123  |

The client login page pre-fills the client demo credentials; the admin
login page pre-fills the admin demo credentials, for convenience while
developing. Remove that pre-fill once real auth is in place.

## How the news feed works today

- `src/data/mockNews.json` is the seed data.
- `src/data/newsService.js` reads/writes that data to `localStorage`
  (key `profitdex_news_v1`) so the admin dashboard's publish / edit /
  delete actions actually persist across reloads in the browser.
- The client dashboard and admin dashboard both call the same
  `newsService` functions, so swapping the backend only requires
  editing that one file.

## Connecting Supabase (next step)

1. Create a project at [supabase.com](https://supabase.com).
2. `npm install @supabase/supabase-js`
3. Copy `.env.example` to `.env` and fill in:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. In `src/lib/supabaseClient.js`, uncomment the `createClient(...)`
   block and delete the `export const supabase = null` line.
5. Create tables, e.g.:
   ```sql
   create table news (
     id uuid primary key default gen_random_uuid(),
     date date not null default current_date,
     headline text not null,
     category text not null,
     body text not null,
     author text not null default 'Profitdex Research Desk',
     tag text not null default 'normal',
     created_at timestamptz not null default now()
   );

   create table profiles (
     id uuid primary key references auth.users(id),
     role text not null default 'client' check (role in ('client','admin')),
     name text
   );
   ```
6. Update `src/data/newsService.js` — each function has a `TODO` comment
   showing the equivalent Supabase query to swap in.
7. Update `src/context/AuthContext.jsx` — replace the demo-account check
   in `login()` with `supabase.auth.signInWithPassword(...)`, and read
   the user's role from the `profiles` table.
8. Add Row Level Security (RLS) policies so only admins can insert/update/
   delete rows in `news`, and clients can only `select`.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In [Vercel](https://vercel.com), click **New Project** and import the
   repo. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build` — Output directory: `dist` (defaults,
   already correct for Vite).
4. Add your Supabase environment variables under
   **Project Settings → Environment Variables** once Supabase is
   connected (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
5. Deploy. `vercel.json` in this repo already rewrites all routes to
   `index.html` so client-side routing (React Router) works correctly
   on refresh and direct links.

## Pointing profitdexventures.com (GoDaddy) at Vercel

1. In Vercel: **Project → Settings → Domains → Add**, enter
   `profitdexventures.com` (and `www.profitdexventures.com` if you want
   both).
2. Vercel will show the DNS records to add. Typically:
   - **Apex domain** (`profitdexventures.com`): an `A` record pointing to
     `76.76.21.21`.
   - **www subdomain**: a `CNAME` record pointing to `cname.vercel-dns.com`.
   (Vercel's Domains screen always shows the current exact values — use
   those over anything cached here.)
3. In GoDaddy: **My Products → DNS → Manage** for the domain, add/edit
   those records to match what Vercel shows.
4. DNS changes can take anywhere from a few minutes to 24–48 hours to
   propagate. Vercel will mark the domain as verified once it detects
   the correct records, and will auto-provision an SSL certificate.
5. Once verified, set your preferred domain (apex or `www`) as primary
   in Vercel's Domains settings; the other will redirect to it.

## Notes on the design

The visual language is a "ledger" theme — deep ink navy, warm ivory
paper, a restrained profit-green and gold — meant to read as disciplined
and financial rather than flashy. Colors and fonts live as CSS custom
properties in `src/index.css` under the Tailwind v4 `@theme` block, so
the whole palette can be retuned from one place.
