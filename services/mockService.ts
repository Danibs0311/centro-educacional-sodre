
import { User, Message, Orientation, Student, UserType } from '../types';

// Mock Data Store
const MOCK_USER: User = {
  id: 'user-123',
  nome: 'Responsável João',
  email: 'pais@exemplo.com',
  tipo: UserType.RESPONSAVEL,
  created_at: new Date().toISOString()
};

// Fix: Added missing required properties (responsavel_nome, cpf_responsavel, endereco_responsavel, whatsapp_responsavel, serie, turno)
const MOCK_STUDENT: Student = {
  id: 'student-456',
  nome: 'Lucas Silva',
  data_nascimento: '2015-05-20',
  responsavel_id: 'user-123',
  responsavel_nome: 'Responsável João',
  cpf_responsavel: '000.000.000-00',
  endereco_responsavel: 'Estrada do Matadouro, Águas Claras, Salvador - BA',
  whatsapp_responsavel: '(71) 99999-9999',
  serie: '3º Ano Fundamental',
  turno: 'Matutino',
  observacoes: 'Diagnóstico de TEA nível 1 de suporte.'
};

const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    remetente_id: 'prof-leia-999',
    remetente_nome: 'Léia Neves Gomes (Psicopedagoga)',
    destinatario_id: 'user-123',
    conteudo: 'Olá João, o Lucas teve um ótimo dia hoje! Participou bem da atividade de reconhecimento de padrões.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    lida: true
  },
  {
    id: 'msg-2',
    remetente_id: 'prof-888',
    remetente_nome: 'Prof. Carlos (Matemática)',
    destinatario_id: 'user-123',
    conteudo: 'Gostaria de agendar uma conversa sobre as adaptações da prova para a próxima semana.',
    created_at: new Date().toISOString(),
    lida: false
  }
];

const MOCK_ORIENTATIONS: Orientation[] = [
  {
    id: 'ori-1',
    student_id: 'student-456',
    professional_id: 'prof-leia-999',
    professional_nome: 'Léia Neves Gomes',
    titulo: 'Organização da Rotina de Estudos',
    descricao: 'Para o desenvolvimento da autonomia do Lucas, sugerimos utilizar o quadro visual de tarefas que enviamos. Isso reduz a ansiedade de transição entre as atividades.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ori-2',
    student_id: 'student-456',
    professional_id: 'prof-leia-999',
    professional_nome: 'Léia Neves Gomes',
    titulo: 'Estímulo à Leitura Compartilhada',
    descricao: 'A leitura antes de dormir ajuda no letramento e no vínculo. Tente fazer perguntas abertas sobre os personagens.',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];

export const mockService = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_USER), 800);
    });
  },

  getMessages: async (userId: string): Promise<Message[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_MESSAGES), 500);
    });
  },

  getOrientations: async (studentId: string): Promise<Orientation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ORIENTATIONS), 500);
    });
  },
  
  sendMessage: async (content: string): Promise<Message> => {
     return new Promise((resolve) => {
        const newMsg: Message = {
            id: `msg-${Date.now()}`,
            remetente_id: 'user-123',
            destinatario_id: 'prof-leia-999',
            remetente_nome: 'Você',
            conteudo: content,
            created_at: new Date().toISOString(),
            lida: false
        }
        setTimeout(() => resolve(newMsg), 300);
     })
  }
};
