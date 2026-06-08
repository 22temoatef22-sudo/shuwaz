-- usage_events table
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  minutes_used numeric(10,2) not null check (minutes_used > 0),
  source text not null default 'extension',
  metadata jsonb,
  created_at timestamptz not null default now()
);
create index if not exists usage_events_user_created_idx on public.usage_events (user_id, created_at desc);

alter table public.usage_events enable row level security;

drop policy if exists "users read own usage" on public.usage_events;
create policy "users read own usage"
  on public.usage_events for select
  to authenticated
  using (auth.uid() = user_id);

-- atomic consume_minutes RPC
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
    return query select 0, false, 'unauthenticated'::text;
    return;
  end if;
  if _minutes is null or _minutes <= 0 then
    return query select 0, false, 'invalid_minutes'::text;
    return;
  end if;

  select p.remaining_minutes into _current
    from public.profiles p
    where p.id = _uid
    for update;

  if _current is null then
    return query select 0, false, 'no_profile'::text;
    return;
  end if;

  _to_deduct := ceil(_minutes)::int;

  if _current < _to_deduct then
    return query select _current, false, 'insufficient_minutes'::text;
    return;
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
