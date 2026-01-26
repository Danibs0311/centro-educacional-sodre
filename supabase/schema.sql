-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null,
  nome text,
  tipo text, -- 'RESPONSAVEL', 'PROFISSIONAL', 'ADMIN', 'BLOG_ADMIN'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Students table
create table public.students (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  data_nascimento date,
  responsavel_nome text,
  cpf_responsavel text,
  endereco_responsavel text,
  whatsapp_responsavel text,
  serie text,
  turno text,
  observacoes text,
  arquivos_nae text[], -- Array of URLs
  responsavel_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  remetente_id uuid references public.profiles(id) not null,
  destinatario_id uuid references public.profiles(id) not null,
  conteudo text not null,
  lida boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orientations table
create table public.orientations (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.students(id) not null,
  professional_id uuid references public.profiles(id) not null,
  titulo text,
  descricao text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog Posts table
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  titulo text not null,
  slug text unique not null,
  resumo text,
  conteudo text,
  autor text,
  publicado boolean default false,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Storage Buckets (Execute in Supabase SQL Editor or via API)
-- insert into storage.buckets (id, name, public) values ('nae-documents', 'nae-documents', true);
-- insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true);

-- Policies for storage need to be set up in the dashboard or via SQL
