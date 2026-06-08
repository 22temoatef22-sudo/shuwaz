-- Subscriptions table (Easykash)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('starter','pro','agency')),
  billing text not null check (billing in ('monthly','yearly')),
  amount_usd numeric(10,2) not null,
  amount_egp numeric(12,2),
  currency text not null default 'USD',
  easykash_ref text,
  easykash_product_code text,
  customer_reference text not null unique,
  status text not null default 'pending' check (status in ('pending','paid','failed','canceled')),
  payment_method text,
  voucher text,
  paid_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists subscriptions_user_idx on public.subscriptions (user_id, created_at desc);
create index if not exists subscriptions_ref_idx on public.subscriptions (customer_reference);

grant select on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;

alter table public.subscriptions enable row level security;

drop policy if exists "users read own subscriptions" on public.subscriptions;
create policy "users read own subscriptions"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  customer_reference text,
  easykash_ref text,
  status text,
  payload jsonb not null,
  signature_valid boolean not null default false,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists payment_events_ref_idx on public.payment_events (customer_reference);

grant all on public.payment_events to service_role;
alter table public.payment_events enable row level security;
