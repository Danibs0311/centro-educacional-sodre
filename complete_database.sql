-- ==============================================================================
-- EDUCANDÁRIO SODRÉ - COMPLETE DATABASE SCHEMA
-- ==============================================================================

-- 1. CLEANUP (For fresh start/replacement)
drop table if exists public.orientations cascade;
drop table if exists public.messages cascade;
drop table if exists public.students cascade;
drop table if exists public.contact_messages cascade;
drop table if exists public.posts cascade;
drop table if exists public.profiles cascade;

-- 2. PROFILES (Users)
-- Linked automatically to auth.users via triggers
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  nome text,
  tipo text check (tipo in ('ADMIN', 'BLOG_ADMIN', 'RESPONSAVEL', 'ALUNO')) default 'RESPONSAVEL',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger for Profile Creation on Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome, tipo)
  values (new.id, new.raw_user_meta_data->>'nome', coalesce(new.raw_user_meta_data->>'tipo', 'RESPONSAVEL'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. STUDENTS (Alunos)
create table public.students (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nome text not null,
  data_nascimento date,
  serie text,
  turno text,
  responsavel_id uuid references public.profiles(id), -- Link to Parent User
  responsavel_nome text,
  cpf_responsavel text,
  endereco_responsavel text,
  whatsapp_responsavel text,
  observacoes text, -- NAE Observations
  arquivos_nae text[] -- URLs to documents
);

-- 4. MESSAGES (Communication)
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  remetente_id uuid references public.profiles(id),
  destinatario_id uuid references public.profiles(id), -- If NULL, could interpret as general broadcast
  conteudo text not null,
  lida boolean default false
);

-- 5. ORIENTATIONS (Feedback do NAE)
create table public.orientations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  student_id uuid references public.students(id) on delete cascade,
  professional_id uuid references public.profiles(id),
  titulo text,
  descricao text not null
);

-- 6. BLOG POSTS
create table public.posts (
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

-- 7. CONTACT MESSAGES (Public Form)
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text,
  interest text,
  message text not null,
  status text default 'new'
);

-- 8. STORAGE BUCKETS
insert into storage.buckets (id, name, public) 
values ('nae-documents', 'nae-documents', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.messages enable row level security;
alter table public.orientations enable row level security;
alter table public.posts enable row level security;
alter table public.contact_messages enable row level security;

-- Profiles: Public read (for names), Owner update
create policy "Public Profiles Access" on public.profiles for select using (true);
create policy "User Update Own Profile" on public.profiles for update using (auth.uid() = id);

-- Students: Admins/Pros read all, Parents read their own
create policy "Admins Read All Students" on public.students for select using (
  exists (select 1 from public.profiles where id = auth.uid() and tipo in ('ADMIN', 'PROFISSIONAL'))
);
create policy "Parents Read Linked Students" on public.students for select using (
  responsavel_id = auth.uid()
);
create policy "Admins Write Students" on public.students for all using (
  exists (select 1 from public.profiles where id = auth.uid() and tipo in ('ADMIN', 'PROFISSIONAL'))
);

-- Messages: Users see messages sent by or to them
create policy "Users See Own Messages" on public.messages for select using (
  auth.uid() = remetente_id or auth.uid() = destinatario_id
);
create policy "Users Send Messages" on public.messages for insert with check (
  auth.uid() = remetente_id
);

-- Orientations: Parents read for their kids, Admins write
create policy "Parents Read Orientations" on public.orientations for select using (
  exists (select 1 from public.students s where s.id = orientations.student_id and s.responsavel_id = auth.uid())
);
create policy "Admins Write Orientations" on public.orientations for all using (
  exists (select 1 from public.profiles where id = auth.uid() and tipo in ('ADMIN', 'PROFISSIONAL'))
);

-- Blog: Public read published, Admins manage all
create policy "Public Read Published Posts" on public.posts for select using (publicado = true);
create policy "Admins Manage Posts" on public.posts for all using (auth.role() = 'authenticated'); -- Simplified for demo

-- Contact: Public insert, Admin read
create policy "Public Insert Contact" on public.contact_messages for insert with check (true);
create policy "Admin Read Contact" on public.contact_messages for select using (auth.role() = 'authenticated');

-- Storage Policies
create policy "Public Read Storage" on storage.objects for select using (bucket_id in ('nae-documents', 'blog-images'));
create policy "Auth Upload Storage" on storage.objects for insert with check (auth.role() = 'authenticated');
