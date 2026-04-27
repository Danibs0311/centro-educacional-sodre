
export enum UserType {
  ADMIN = 'ADMIN',
  BLOG_ADMIN = 'BLOG_ADMIN'
}

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: UserType;
  created_at: string;
}


export interface Professional {
  slug: string;
  nome: string;
  cargo: string;
  especialidade: string;
  bio: string;
  abordagens: string[];
  image: string;
}



export interface BlogPost {
  id: string;
  titulo: string;
  slug: string;
  resumo?: string;
  conteudo: string;
  autor: string;
  created_at: string;
  publicado: boolean;
  image?: string;
}

export interface NavItem {
  label: string;
  path: string;
  subItems?: NavItem[];
}

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  phone?: string;
  interest?: string;
  message: string;
  status: 'new' | 'read' | 'archived';
}
