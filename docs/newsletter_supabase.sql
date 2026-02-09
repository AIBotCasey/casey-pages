-- Run in Supabase SQL editor
create table if not exists public.newsletter_subscribers (
  id bigserial primary key,
  email text not null unique,
  source text not null default 'site',
  subscribed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Optional: lock direct client writes and use only serverless function with service role key.
alter table public.newsletter_subscribers enable row level security;

-- Keep reads/writes denied for anon by default (no policy added).
