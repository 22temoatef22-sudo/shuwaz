-- =====================================================================
-- Shuwaz — Auth & Profiles schema
-- Run this SQL once in your Supabase project's SQL Editor:
-- https://supabase.com/dashboard/project/xkrvgnwawzzbegnyaycu/sql/new
-- =====================================================================

-- 1) profiles table -----------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  remaining_minutes integer not null default 5,
  subscription_plan text not null default 'free',
  usage_count integer not null default 0
);

alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists remaining_minutes integer not null default 5;
alter table public.profiles add column if not exists subscription_plan text not null default 'free';
alter table public.profiles add column if not exists usage_count integer not null default 0;

update public.profiles
set email = auth.users.email
from auth.users
where public.profiles.id = auth.users.id
  and public.profiles.email is null;

alter table public.profiles alter column email set not null;

-- 2) Row Level Security ------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Inserts happen via trigger below (security definer). No public insert policy.

-- 3) Anti-abuse: signup fingerprints (IP hash + UA, 1 free signup per IP)
create table if not exists public.signup_fingerprints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  ip_hash text,
  user_agent text,
  email text,
  created_at timestamptz not null default now()
);
alter table public.signup_fingerprints add column if not exists user_agent text;
alter table public.signup_fingerprints add column if not exists email text;
create index if not exists signup_fingerprints_ip_hash_idx
  on public.signup_fingerprints (ip_hash);
alter table public.signup_fingerprints enable row level security;
-- No policies = service-role access only.

-- 4) Auto-create profile on signup -------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, remaining_minutes, subscription_plan, usage_count)
  values (new.id, new.email, 5, 'free', 0)
  on conflict (id) do update set
    email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
-- 5) usage_events + consume_minutes RPC (Extension integration)
-- Run this block in the SQL Editor:
-- https://supabase.com/dashboard/project/xkrvgnwawzzbegnyaycu/sql/new
-- =====================================================================
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  minutes_used numeric(10,2) not null check (minutes_used > 0),
  source text not null default 'extension',
  metadata jsonb,
  created_at timestamptz not null default now()
);
create index if not exists usage_events_user_created_idx
  on public.usage_events (user_id, created_at desc);

alter table public.usage_events enable row level security;

drop policy if exists "users read own usage" on public.usage_events;
create policy "users read own usage"
  on public.usage_events for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.consume_minutes(
  _minutes numeric,
  _source text default 'extension',
  _metadata jsonb default null
)
returns table (remaining_minutes integer, ok boolean, reason text)
language plpgsql
security definer
set search_path = public
as $$
declare
  _uid uuid := auth.uid();
  _current integer;
  _to_deduct integer;
begin
  if _uid is null then
    return query select 0, false, 'unauthenticated'::text; return;
  end if;
  if _minutes is null or _minutes <= 0 then
    return query select 0, false, 'invalid_minutes'::text; return;
  end if;

  select p.remaining_minutes into _current
    from public.profiles p
    where p.id = _uid
    for update;

  if _current is null then
    return query select 0, false, 'no_profile'::text; return;
  end if;

  _to_deduct := ceil(_minutes)::int;

  if _current < _to_deduct then
    return query select _current, false, 'insufficient_minutes'::text; return;
  end if;

  update public.profiles
    set remaining_minutes = remaining_minutes - _to_deduct,
        usage_count = usage_count + 1
    where id = _uid
    returning public.profiles.remaining_minutes into _current;

  insert into public.usage_events (user_id, minutes_used, source, metadata)
    values (_uid, _minutes, coalesce(_source, 'extension'), _metadata);

  return query select _current, true, 'ok'::text;
end;
$$;

grant execute on function public.consume_minutes(numeric, text, jsonb) to authenticated;

notify pgrst, 'reload schema';
