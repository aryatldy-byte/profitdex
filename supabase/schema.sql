-- ==================================================================
-- Profitdex Ventures — Supabase schema
-- Run this once in: Supabase Dashboard > SQL Editor > New Query
--
-- Tables:
--   products          Product grid shown on the About page + /products
--   owner_profile      Vivek Krishna's profile shown on the About page
--   leads              SIP / Insurance / Hedging form submissions
--   news               Admin-published market/company updates
--   contact_messages   Contact page form submissions
--
-- Admin auth: this app uses real Supabase Auth for the /admin area.
-- Create the admin user under Supabase Dashboard > Authentication >
-- Users > Add user (do NOT rely on any hard-coded credentials).
-- ==================================================================

-- ------------------------------------------------------------------
-- products
-- ------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists products_sort_order_idx
  on public.products (sort_order asc);

alter table public.products enable row level security;

drop policy if exists "Anyone can view active products" on public.products;
create policy "Anyone can view active products"
  on public.products for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Authenticated can manage products" on public.products;
create policy "Authenticated can manage products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- Seed the product grid (Stocks, IPO, IAP, Mutual Funds, IMP, PMS, AIF,
-- Insurance, Bonds, US Stocks, OFS/Buy Back, Dealer Request).
insert into public.products (slug, name, description, sort_order) values
  ('stocks', 'Stocks', 'Equity trading in cash and derivatives segments across NSE and BSE, backed by daily desk research.', 1),
  ('ipo', 'IPO', 'Apply for new public issues online, with allotment tracking and desk guidance on upcoming listings.', 2),
  ('iap', 'IAP', 'Investment Advisory Products — curated, advisory-led investment ideas for clients who want expert-guided calls.', 3),
  ('mutual-funds', 'Mutual Funds', 'Goal-based SIP and lump-sum investing across equity, debt and hybrid schemes from leading AMCs.', 4),
  ('imp', 'IMP', 'Investment & Money-market Products — short-tenure, liquidity-focused instruments for parking surplus funds.', 5),
  ('pms', 'PMS', 'Portfolio Management Services for high-net-worth investors who want a professionally managed, customised portfolio.', 6),
  ('aif', 'AIF', 'Alternative Investment Funds offering access to strategies beyond traditional stocks and mutual funds.', 7),
  ('insurance', 'Insurance', 'Life, health and general insurance solutions to protect your family and your capital.', 8),
  ('bonds', 'Bonds', 'Government and corporate bonds for investors seeking predictable, fixed-income returns.', 9),
  ('us-stocks', 'US Stocks', 'Invest in US-listed companies and diversify your portfolio beyond Indian markets.', 10),
  ('ofs-buyback', 'OFS / Buy Back', 'Participate in Offer for Sale and company share buyback opportunities as they open.', 11),
  ('dealer-request', 'Dealer Request', 'Raise a dealer-assisted trade request and have our desk execute it on your behalf.', 12)
on conflict (slug) do nothing;

-- ------------------------------------------------------------------
-- owner_profile
-- ------------------------------------------------------------------
create table if not exists public.owner_profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  designation text,
  bio text,
  expertise text[] not null default '{}',
  certifications text[] not null default '{}',
  association text,
  photo_url text,
  email text,
  phone text,
  updated_at timestamptz not null default now()
);

alter table public.owner_profile enable row level security;

drop policy if exists "Anyone can view owner profile" on public.owner_profile;
create policy "Anyone can view owner profile"
  on public.owner_profile for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated can manage owner profile" on public.owner_profile;
create policy "Authenticated can manage owner profile"
  on public.owner_profile for all
  to authenticated
  using (true)
  with check (true);

-- Seed a single profile row. Update these details from the Supabase
-- Table Editor (or build an admin form) with verified, current values —
-- exact certifications, registration numbers and association should be
-- confirmed with Vivek Krishna before publishing.
insert into public.owner_profile
  (full_name, designation, bio, expertise, certifications, association, email, phone)
select
  'Vivek Krishna',
  'Founder & Director, Profitdex Ventures',
  'Vivek Krishna founded Profitdex Ventures to bring disciplined, research-backed investing and trading to individual and institutional clients across Kerala. His work spans equity and derivatives trading, mutual fund advisory, and commodity risk-management solutions for jewellers, bullion dealers and manufacturers exposed to gold and silver price volatility.',
  array['Equity & Derivatives Trading', 'Mutual Fund Advisory', 'Portfolio Management', 'Commodity Risk Management & Hedging', 'Client Relationship Management'],
  array['NISM-certified investment professional', 'AMFI-registered mutual fund distributor'],
  'Authorised Partner, Motilal Oswal Financial Services Ltd.',
  'profitdexinvest@gmail.com',
  '+91 9633776456'
where not exists (select 1 from public.owner_profile);

-- ------------------------------------------------------------------
-- leads  (SIP / Mutual Fund, Insurance, Hedging enquiries)
-- ------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  mobile text not null,
  pan text,
  interest text not null check (interest in ('SIP/Mutual Fund', 'Insurance', 'Hedging')),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Any visitor can submit a lead — but cannot read submissions back.
drop policy if exists "Anyone can submit a lead" on public.leads;
create policy "Anyone can submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated can view leads" on public.leads;
create policy "Authenticated can view leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update leads" on public.leads;
create policy "Authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true);

-- ------------------------------------------------------------------
-- news  (admin-published market / company updates)
-- ------------------------------------------------------------------
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  headline text not null,
  category text not null default 'General',
  body text not null,
  author text not null default 'Profitdex Research Desk',
  tag text not null default 'normal',
  created_at timestamptz not null default now()
);

create index if not exists news_date_idx
  on public.news (date desc);

alter table public.news enable row level security;

drop policy if exists "Anyone can view news" on public.news;
create policy "Anyone can view news"
  on public.news for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated can manage news" on public.news;
create policy "Authenticated can manage news"
  on public.news for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------------
-- contact_messages  (Contact page form)
-- ------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can send a contact message" on public.contact_messages;
create policy "Anyone can send a contact message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated can view contact messages" on public.contact_messages;
create policy "Authenticated can view contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);

-- ==================================================================
-- ADMIN ACCESS
-- ==================================================================
-- The /admin area now signs in with real Supabase Auth
-- (supabase.auth.signInWithPassword), so any user you create under
-- Authentication > Users in the Supabase Dashboard can sign in and
-- manage news from the Admin Dashboard. There is no separate "role"
-- table yet — every authenticated user is treated as an admin, so
-- only create accounts here for people who should have that access.
-- ==================================================================
