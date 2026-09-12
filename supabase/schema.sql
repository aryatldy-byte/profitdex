-- ==================================================================
-- Profitdex Ventures — "Open an account" lead capture
-- Run this once in: Supabase Dashboard > SQL Editor > New Query
-- ==================================================================

create table if not exists public.account_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists account_requests_created_at_idx
  on public.account_requests (created_at desc);

alter table public.account_requests enable row level security;

-- Anyone visiting the site can submit the "Open an account" form —
-- but they can never read back any submitted data (insert-only).
drop policy if exists "Anyone can submit an account request" on public.account_requests;
create policy "Anyone can submit an account request"
  on public.account_requests for insert
  to anon, authenticated
  with check (true);

-- Only a signed-in Supabase user can view or update submissions.
drop policy if exists "Authenticated can view account requests" on public.account_requests;
create policy "Authenticated can view account requests"
  on public.account_requests for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update account requests" on public.account_requests;
create policy "Authenticated can update account requests"
  on public.account_requests for update
  to authenticated
  using (true);

-- ==================================================================
-- NOTE ON VIEWING SUBMISSIONS
-- ==================================================================
-- The admin login in this app is currently a local placeholder (not
-- real Supabase Auth), so the in-app Admin Dashboard cannot securely
-- query this table yet (the "authenticated" policies above require
-- an actual Supabase-authenticated session).
--
-- Until admin login is wired to real Supabase Auth, view and manage
-- submitted account requests directly in:
--   Supabase Dashboard > Table Editor > account_requests
-- That view is already protected by your own Supabase account login.
-- ==================================================================
