# Profitdex Ventures

<<<<<<< HEAD
A mobile-friendly React web app for Profitdex Ventures — a mutual fund and
trading company. Includes public marketing pages, a client dashboard with
daily market news, and an admin dashboard for publishing that news.

Built with **React (Vite) + React Router + Tailwind CSS v4**. Authentication
and data are currently mocked (localStorage-backed) with clear `TODO`
comments marking where to plug in Supabase.
=======
A mobile-friendly React web app for Profitdex Ventures — mutual fund, trading,
and commodity risk-management services. Public marketing pages, a lead-capture
flow ("Get Started / Open Account"), and an admin dashboard for publishing
market/company updates, all backed by Supabase.

Built with **React (Vite) + React Router + Tailwind CSS v4 + Supabase**.
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)

## Project structure

```
src/
<<<<<<< HEAD
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
=======
  components/
    Navbar, Footer, Layout, ProtectedRoute   Site chrome
    AccountModal                              "Get started" popup (4 paths, see below)
    ProductsGrid                              Product tiles, used on About + /products
    OwnerProfile                              Vivek Krishna's profile card
    NewsCard, MiniLineChart                   Presentational pieces for market/news content
  context/
    AuthContext.jsx          Real Supabase Auth for /admin
    AccountModalContext.jsx  Opens/closes the "Get started" modal from anywhere
  data/
    productsService.js   `products` table (with a static fallback)
    ownerService.js      `owner_profile` table (with a static fallback)
    leadsService.js       `leads` table + WhatsApp forward link builder
    contactService.js    `contact_messages` table
    newsService.js         `news` table (admin dashboard)
  lib/
    supabaseClient.js   Supabase client (reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
  pages/
    Home, About, Products, FAQ, Contact       Public pages
    admin/AdminLogin, admin/AdminDashboard    Admin area (real Supabase Auth)
    NotFound
  App.jsx       Routes
  main.jsx      Entry point
  index.css     Tailwind + design tokens (ledger colour palette, fonts)
supabase/
  schema.sql    Full schema: products, owner_profile, leads, news, contact_messages
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
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

<<<<<<< HEAD
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
=======
## Environment variables

Copy `.env.example` to `.env` (already done in this bundle, reusing your
existing project's values) and make sure these are set:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Vite only exposes variables prefixed with `VITE_` to client code. These are
also the two variables you should add as Environment Variables in the Vercel
project settings for production builds.

## Setting up Supabase

1. Open your Supabase project's **SQL Editor** and run `supabase/schema.sql`
   in full. This creates and seeds:
   - `products` — the 12-item product grid (Stocks, IPO, IAP, Mutual Funds,
     IMP, PMS, AIF, Insurance, Bonds, US Stocks, OFS/Buy Back, Dealer Request)
   - `owner_profile` — Vivek Krishna's profile (name, bio, expertise,
     certifications, current association)
   - `leads` — SIP/Mutual Fund, Insurance and Hedging form submissions
   - `news` — admin-published market/company updates
   - `contact_messages` — Contact page submissions
   - Row Level Security policies on every table (public can read
     products/owner/news and submit leads/contact messages; only an
     authenticated user can manage content or view leads)

2. **Create the admin account.** The `/admin` area now uses real Supabase
   Auth — there are no hard-coded credentials in the app. Go to
   **Authentication > Users > Add user** in the Supabase Dashboard and create
   an email/password login for whoever should manage the News section, then
   sign in at `/admin/login` with those credentials.

3. **Update Vivek Krishna's profile with verified details.** The seed row in
   `owner_profile` (and the fallback in `src/data/ownerService.js`) uses
   reasonable placeholder wording for certifications and his current
   association with Motilal Oswal — please confirm the exact wording,
   registration numbers, and any certifications directly with him before
   publishing, then update the row from **Table Editor > owner_profile**.

4. **Check the WhatsApp Business number.** SIP/Mutual Fund, Insurance, and
   Hedging leads are forwarded via a `wa.me` link to the number in
   `OWNER_WHATSAPP_NUMBER` (`src/data/leadsService.js`), currently
   `+91 9633776456`. Update it there if the WhatsApp Business number differs
   from the general contact number.

## How "Get Started / Open Account" works

Clicking **Get Started / Open Account** (in the navbar, hero, or footer)
opens a modal with four paths:

| Option | Behaviour |
|---|---|
| Trading / Demat | Opens `https://mosl.co/MOSWEB/oLz0Yca1cJ` in a new tab — no form, no data stored. |
| SIP / Mutual Fund | Shows a form (Name, Email, Mobile, PAN) → saves to `leads` → opens WhatsApp pre-filled to forward the enquiry. |
| Insurance | Same form + `leads` + WhatsApp flow as above. |
| Commodity Hedging | Same form + `leads` + WhatsApp flow as above. |

## How the News feature works

`src/data/newsService.js` reads/writes the `news` table directly — there is
no local seed data or mock content. The Admin Dashboard (`/admin/dashboard`,
behind Supabase Auth) is where updates are published, edited, and deleted.

## Design

The palette, typography and "ledger" motif in `src/index.css` are matched to
the Profitdex logo (deep ink navy, warm ivory paper, muted profit-green,
restrained gold) and reused for the new commodity risk-management highlight,
product grid, and owner profile sections. All pages are responsive
(mobile-first, tested down to small phone widths).

**Removed:** the fake scrolling market ticker, the hard-coded "Daily Ledger"
sample data on the homepage, and the fabricated stats strip (assets advised,
client count, etc.) — the site no longer shows any invented market data or
client numbers.

## Deploying to Vercel

`vercel.json` is already set up to rewrite all routes to `index.html` for
client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

1. Push this project to a Git repository (or use `vercel` CLI directly).
2. Import it into Vercel.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under
   **Project Settings > Environment Variables**.
4. Deploy — Vercel will run `npm run build` and serve the `dist/` output.

## Company details used throughout the site

- **Registered office:** PROFITDEX VENTURES PRIVATE LIMITED, A.M Cross Road,
  Door No: 8/2186, Mattancherry, Kochi, Kerala 682002, India
- **Email:** profitdexinvest@gmail.com
- **Phone:** +91 9633776456, +91-4843555877

These are unchanged from the original project and appear in the Navbar CTA,
Footer, Contact page, and the "Get started" modal's confirmation screen.
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
