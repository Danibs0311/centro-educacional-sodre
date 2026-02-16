
export enum UserType {
  RESPONSAVEL = 'RESPONSAVEL',
  PROFISSIONAL = 'PROFISSIONAL',
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

export interface Student {
  id: string;
  nome: string;
  data_nascimento: string;
  responsavel_id?: string; // Opcional agora que os dados são diretos
  responsavel_nome: string;
  cpf_responsavel: string;
  endereco_responsavel: string;
  whatsapp_responsavel: string;
  serie: string;
  turno: string;
  observacoes: string;
  arquivos_nae?: string[];
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

export interface Message {
  id: string;
  remetente_id: string;
  destinatario_id: string;
  remetente_nome?: string;
  conteudo: string;
  created_at: string;
  lida?: boolean;
}

export interface Orientation {
  id: string;
  student_id: string;
  professional_id: string;
  professional_nome?: string;
  titulo: string;
  descricao: string;
  created_at: string;
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
