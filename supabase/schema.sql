-- Donald Okoli Portfolio — Supabase schema
-- Run this in Supabase → SQL Editor (whole file, once) to set up the database.

-- ============================================================
-- SETTINGS (singleton row, id is always 1)
-- ============================================================
create table if not exists settings (
  id int primary key default 1,
  name text not null default 'Donald Okoli',
  title text not null default 'Digital Marketing & Content Strategist',
  tagline text not null default '',
  bio text not null default '',
  email text not null default '',
  phone text not null default '',
  location text not null default '',
  availability_enabled boolean not null default true,
  availability_label text not null default '',
  cv_url text not null default '',
  social_linkedin text default '',
  social_instagram text default '',
  social_clippings text default '',
  social_github text default '',
  updated_at timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);

insert into settings (id) values (1) on conflict (id) do nothing;

-- ============================================================
-- SKILL CATEGORIES
-- ============================================================
create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  items text[] not null default '{}',
  sort_order int not null default 0
);

-- ============================================================
-- SELECTED RESULTS (homepage stat blocks)
-- ============================================================
create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  context text default '',
  sort_order int not null default 0
);

-- ============================================================
-- EXPERIENCE
-- ============================================================
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  start_date text not null,
  end_date text not null default 'Present',
  location text default '',
  summary text default '',
  achievements text[] not null default '{}',
  skills text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0
);

-- ============================================================
-- CASE STUDIES
-- ============================================================
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text not null,
  role text not null,
  industry text not null,
  date text not null,
  status text not null default 'Complete',
  summary text not null,
  services text[] not null default '{}',
  tools text[] not null default '{}',
  context text default '',
  approach text default '',
  execution text default '',
  results text[] not null default '{}',
  cover_image text default '',
  external_url text default '',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true
);

-- ============================================================
-- PROJECTS (Built From Scratch / Digital Experience)
-- ============================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Built From Scratch', 'Digital Experience')),
  role text not null,
  description text not null,
  highlights text[] not null default '{}',
  cover_image text default '',
  external_url text default '',
  link_label text not null default 'Visit site',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default '',
  organization text default '',
  quote text not null,
  photo text default '',
  published boolean not null default false
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public (anon key) can only READ. Writes require an authenticated
-- Supabase user — i.e. you, logged into /studio.
-- ============================================================
alter table settings enable row level security;
alter table skill_categories enable row level security;
alter table results enable row level security;
alter table experience enable row level security;
alter table case_studies enable row level security;
alter table projects enable row level security;
alter table testimonials enable row level security;

create policy "Public read settings" on settings for select using (true);
create policy "Public read skill_categories" on skill_categories for select using (true);
create policy "Public read results" on results for select using (true);
create policy "Public read experience" on experience for select using (true);
create policy "Public read published case_studies" on case_studies for select using (published = true);
create policy "Public read published projects" on projects for select using (published = true);
create policy "Public read published testimonials" on testimonials for select using (published = true);

create policy "Authenticated write settings" on settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write skill_categories" on skill_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write results" on results for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write experience" on experience for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write case_studies" on case_studies for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- IMPORTANT: Studio (/studio) is a public URL, but it requires a
-- Supabase Auth login before any write succeeds — RLS enforces this
-- at the database level even if someone finds the /studio URL.
-- Do NOT enable public sign-up. Create your one admin user manually
-- in Supabase → Authentication → Users → Add user.

-- ============================================================
-- STORAGE (run this separately if it errors — Storage bucket
-- creation via SQL requires the storage extension, already
-- enabled by default on all Supabase projects)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public read portfolio-media" on storage.objects
  for select using (bucket_id = 'portfolio-media');

create policy "Authenticated upload portfolio-media" on storage.objects
  for insert with check (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

create policy "Authenticated update portfolio-media" on storage.objects
  for update using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

create policy "Authenticated delete portfolio-media" on storage.objects
  for delete using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');
