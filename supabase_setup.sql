-- 1. Contact Messages (Safe Create)
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text,
  interest text,
  message text not null,
  status text default 'new'
);

-- Enable RLS (Safe)
alter table public.contact_messages enable row level security;

-- Policies (Drop first to avoid duplication errors if re-running)
drop policy if exists "Anyone can insert messages" on public.contact_messages;
create policy "Anyone can insert messages"
on public.contact_messages for insert
with check (true);

drop policy if exists "Admins can view messages" on public.contact_messages;
create policy "Admins can view messages"
on public.contact_messages for select
using (auth.role() = 'authenticated');


-- 2. Blog Posts (Safe Create)
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  titulo text not null,
  slug text not null unique,
  resumo text,
  conteudo text,
  autor text default 'Educandário Sodré',
  publicado boolean default true,
  image text
);

alter table public.posts enable row level security;

-- Policies
drop policy if exists "Anyone can read published posts" on public.posts;
create policy "Anyone can read published posts"
on public.posts for select
using (publicado = true);

drop policy if exists "Admins can manage posts" on public.posts;
create policy "Admins can manage posts"
on public.posts for all
using (auth.role() = 'authenticated');
