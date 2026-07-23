alter table public.profiles
  add column if not exists profession text,
  add column if not exists region_code text,
  add column if not exists weekly_hours numeric(5,2),
  add column if not exists pay_grade text,
  add column if not exists pay_step integer;

create table if not exists public.user_work_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  enabled_rules jsonb not null default '[]'::jsonb,
  balances jsonb not null default '{}'::jsonb,
  rhythm_start_date date not null,
  rhythm_days jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_work_settings enable row level security;

drop policy if exists "work settings own rows" on public.user_work_settings;
create policy "work settings own rows"
on public.user_work_settings
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
