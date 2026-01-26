
import { Message, Orientation, Student, User, UserType } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const dataService = {
  // --- MÉTODOS DE CONSULTA ---
  getMessages: async (userId: string): Promise<Message[]> => {
    if (!isSupabaseConfigured) {
      return [{
        id: 'mock-msg-1',
        remetente_id: 'COORDENACAO_ID',
        destinatario_id: userId,
        conteudo: 'Seja bem-vindo ao novo Portal do Aluno! Aqui você poderá acompanhar todas as novidades.',
        created_at: new Date().toISOString(),
        lida: false,
        remetente_nome: 'Secretaria Escolar'
      }];
    }
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`*, profiles!remetente_id(nome)`)
        .or(`remetente_id.eq.${userId},destinatario_id.eq.${userId}`)
        .order('created_at', { ascending: true });
      if (error) {
        console.error("Erro ao buscar mensagens:", error.message, error.details);
        return [];
      }
      return data.map(m => ({ ...m, remetente_nome: m.profiles?.nome }));
    } catch (e) { return []; }
  },

  getOrientations: async (studentId: string): Promise<Orientation[]> => {
    if (!isSupabaseConfigured) {
      return [{
        id: 'mock-ori-1',
        student_id: studentId,
        professional_id: 'mock-prof-1',
        descricao: 'Aluno demonstra excelente participação nas atividades de grupo. Sugerimos manter o estímulo à leitura em casa.',
        created_at: new Date().toISOString(),
        professional_nome: 'Léia Neves Gomes'
      }];
    }
    try {
      const { data, error } = await supabase
        .from('orientations')
        .select(`*, profiles!professional_id(nome)`)
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });
      if (error) {
        console.error("Erro ao buscar orientações:", error.message);
        return [];
      }
      return data.map(o => ({ ...o, professional_nome: o.profiles?.nome }));
    } catch (e) { return []; }
  },

  getStudents: async (): Promise<Student[]> => {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('nome');

      if (error) {
        console.error("Erro Supabase (getStudents):", error.message, error.hint);
        throw error;
      }
      return data;
    } catch (e: any) {
      console.error("Erro ao buscar alunos:", e.message || e);
      return [];
    }
  },

  getStudentsByResponsavel: async (responsavelId: string): Promise<Student[]> => {
    if (!isSupabaseConfigured) {
      return [{
        id: 'mock-student-1',
        nome: 'Enzo Gabriel',
        data_nascimento: '2015-05-12',
        serie: '4º Ano Fundamental I',
        turno: 'Matutino',
        responsavel_id: responsavelId,
        responsavel_nome: 'Responsável Demo',
        cpf_responsavel: '000.000.000-00',
        endereco_responsavel: 'Rua Exemplo, 123',
        whatsapp_responsavel: '71999999999',
        created_at: new Date().toISOString()
      }];
    }
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('responsavel_id', responsavelId);
      if (error) {
        console.error("Erro ao buscar alunos por responsável:", error.message);
        return [];
      }
      return data;
    } catch (e) { return []; }
  },

  // --- MÉTODOS ADMINISTRATIVOS ---
  getAllProfiles: async (): Promise<User[]> => {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase.from('profiles').select('*').order('nome');
    if (error) {
      console.error("Erro ao buscar perfis:", error.message);
      throw error;
    }
    return data as User[];
  },

  createStudent: async (student: Omit<Student, 'id'>): Promise<void> => {
    if (!isSupabaseConfigured) {
      console.log("Mock: Student created", student);
      return;
    }

    // Mapeamento explícito para garantir que campos extras não causem erro no banco
    const payload = {
      nome: student.nome,
      data_nascimento: student.data_nascimento,
      responsavel_nome: student.responsavel_nome,
      cpf_responsavel: student.cpf_responsavel,
      endereco_responsavel: student.endereco_responsavel,
      whatsapp_responsavel: student.whatsapp_responsavel,
      serie: student.serie,
      turno: student.turno,
      observacoes: student.observacoes,
      arquivos_nae: student.arquivos_nae,
      responsavel_id: student.responsavel_id
    };

    const { error } = await supabase.from('students').insert([payload]);
    if (error) {
      console.error("Erro detalhado ao criar estudante:", error.message, error.details, error.hint);
      throw error;
    }
  },

  updateStudent: async (id: string, student: Partial<Student>): Promise<void> => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.from('students').update(student).eq('id', id);
    if (error) {
      console.error("Erro ao atualizar estudante:", error.message);
      throw error;
    }
  },

  uploadNAEFile: async (file: File, studentName: string): Promise<string> => {
    if (!isSupabaseConfigured) {
      return URL.createObjectURL(file);
    }
    const fileExt = file.name.split('.').pop();
    const fileName = `${studentName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('nae-documents')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Erro no upload de arquivo:", uploadError.message);
      throw uploadError;
    }

    const { data } = supabase.storage.from('nae-documents').getPublicUrl(filePath);
    return data.publicUrl;
  },

  registerProfile: async (id: string, nome: string, tipo: UserType): Promise<void> => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.from('profiles').upsert({ id, nome, tipo });
    if (error) {
      console.error("Erro ao registrar perfil:", error.message);
      throw error;
    }
  },

  sendMessage: async (content: string, fromId: string, toId: string): Promise<Message> => {
    if (!isSupabaseConfigured) {
      return {
        id: crypto.randomUUID(),
        remetente_id: fromId,
        destinatario_id: toId,
        conteudo: content,
        lida: false,
        created_at: new Date().toISOString()
      };
    }
    const { data, error } = await supabase
      .from('messages')
      .insert({ remetente_id: fromId, destinatario_id: toId, conteudo: content, lida: false })
      .select().single();
    if (error) {
      console.error("Erro ao enviar mensagem:", error.message);
      throw error;
    }
    return data;
  }
};
