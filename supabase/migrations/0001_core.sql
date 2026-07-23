create extension if not exists pgcrypto;
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, timezone text not null default 'Europe/Berlin', created_at timestamptz not null default now());
create table public.shift_templates (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, code text not null, name text not null, segments jsonb not null, pause_mode jsonb not null, created_at timestamptz not null default now(), unique(user_id,code));
alter table public.profiles enable row level security;
alter table public.shift_templates enable row level security;
create policy "profiles own rows" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "shift templates own rows" on public.shift_templates for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
