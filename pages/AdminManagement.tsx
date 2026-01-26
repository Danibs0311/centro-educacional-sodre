
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Student, UserType } from '../types';
import { 
  Users, 
  GraduationCap, 
  ArrowLeft, 
  Loader2, 
  Save, 
  Search, 
  Plus, 
  FileText, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  MapPin, 
  Phone, 
  CreditCard, 
  UserCheck, 
  BookOpen,
  Calendar,
  Layers,
  Clock
} from 'lucide-react';

const AdminManagement: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  // Data State
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'register'>('list');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Form State
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({ 
    nome: '', 
    data_nascimento: '', 
    responsavel_nome: '',
    cpf_responsavel: '',
    endereco_responsavel: '',
    whatsapp_responsavel: '',
    serie: '',
    turno: '',
    observacoes: '',
    arquivos_nae: []
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const studentsData = await dataService.getStudents();
      setStudents(studentsData);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated || user?.tipo !== UserType.ADMIN) {
      navigate('/blog-login');
      return;
    }
    loadData();
  }, [isAuthenticated, user, navigate, loading]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !newStudent.nome) {
      alert("Por favor, preencha o nome do aluno antes de enviar arquivos.");
      return;
    }

    setIsUploading(true);
    try {
      const url = await dataService.uploadNAEFile(file, newStudent.nome);
      setNewStudent(prev => ({
        ...prev,
        arquivos_nae: [...(prev.arquivos_nae || []), url]
      }));
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar arquivo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Limpeza de campos para o Supabase
      const studentData = { ...newStudent };
      
      await dataService.createStudent(studentData);
      
      // Feedback de Sucesso
      alert("Matrícula Unificada salva com sucesso no Supabase!");
      
      // Reset Form
      setNewStudent({ 
        nome: '', 
        data_nascimento: '', 
        responsavel_nome: '',
        cpf_responsavel: '',
        endereco_responsavel: '',
        whatsapp_responsavel: '',
        serie: '',
        turno: '',
        observacoes: '', 
        arquivos_nae: [] 
      });
      
      await loadData();
      setActiveTab('list');
    } catch (err) {
      console.error("Erro na submissão:", err);
      alert("Falha ao salvar no Supabase. Verifique a conexão ou se as colunas da tabela 'students' estão corretas.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.responsavel_nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-brand-dark" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Fixo */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/blog-admin" className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-brand-dark leading-none uppercase tracking-tighter">Gestão Educandário</h1>
            <span className="text-[10px] font-bold text-brand-light uppercase tracking-widest mt-1">Matrículas Unificadas</span>
          </div>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl">
           <button 
             onClick={() => setActiveTab('list')}
             className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${activeTab === 'list' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             Lista de Alunos
           </button>
           <button 
             onClick={() => setActiveTab('register')}
             className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${activeTab === 'register' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             Nova Matrícula
           </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        {isLoadingData ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-dark" size={48} />
            <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">Sincronizando Banco de Dados...</p>
          </div>
        ) : activeTab === 'list' ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Buscar aluno ou responsável..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-white bg-white rounded-2xl focus:ring-4 focus:ring-brand-light/10 outline-none text-gray-900 font-bold shadow-sm transition-all"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                   <Users size={14} /> Total: {students.length} Alunos Ativos
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Aluno / Série</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pai ou Responsável</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ficha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredStudents.map(s => (
                        <tr 
                          key={s.id} 
                          onClick={() => setSelectedStudent(s)}
                          className="hover:bg-brand-light/5 transition-colors cursor-pointer group"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-brand-light/20 rounded-xl flex items-center justify-center text-brand-dark font-black">
                                  {s.nome[0]}
                               </div>
                               <div>
                                  <div className="font-black text-gray-900 group-hover:text-brand-dark transition-colors">{s.nome}</div>
                                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                    {s.serie || 'Série N/I'} • {s.turno || '---'}
                                  </div>
                               </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <UserCheck size={14} className="text-gray-300" />
                               <span className="font-bold text-gray-700">{s.responsavel_nome}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            {s.whatsapp_responsavel ? (
                               <a 
                                 href={`https://wa.me/55${s.whatsapp_responsavel.replace(/\D/g,'')}`}
                                 target="_blank"
                                 rel="noreferrer"
                                 onClick={(e) => e.stopPropagation()}
                                 className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-black text-sm transition-colors"
                               >
                                 <Phone size={14} /> {s.whatsapp_responsavel}
                               </a>
                            ) : <span className="text-gray-300 italic text-xs">Sem contato</span>}
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="inline-flex items-center justify-center bg-gray-50 text-brand-dark p-2 rounded-lg group-hover:bg-brand-dark group-hover:text-white transition-all shadow-sm">
                                <FileText size={18} />
                             </div>
                          </td>
                        </tr>
                      ))}
                      {filteredStudents.length === 0 && (
                        <tr>
                           <td colSpan={4} className="px-8 py-20 text-center">
                              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Nenhum aluno cadastrado com este termo.</p>
                           </td>
                        </tr>
                      )}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
               <div className="bg-brand-dark p-10 text-white relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <GraduationCap size={120} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
                    <Save className="text-brand-yellow" /> Matrícula Unificada
                  </h2>
                  <p className="text-brand-light font-bold text-xs uppercase tracking-[0.2em]">Registro direto de Pais e Alunos no Supabase</p>
               </div>
               
               <form onSubmit={handleCreateStudent} className="p-10 space-y-12">
                  
                  {/* DADOS DO RESPONSÁVEL */}
                  <div className="space-y-6">
                     <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                        <div className="p-2 bg-brand-light/20 rounded-lg text-brand-dark">
                           <UserCheck size={18} />
                        </div>
                        <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest">1. Dados do Pai / Responsável</h3>
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                           <input 
                              type="text" required
                              value={newStudent.responsavel_nome}
                              onChange={e => setNewStudent({...newStudent, responsavel_nome: e.target.value})}
                              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-brand-light focus:bg-white outline-none text-gray-900 font-bold transition-all"
                              placeholder="Nome do Pai, Mãe ou Tutor"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CPF do Responsável</label>
                           <input 
                              type="text" required
                              value={newStudent.cpf_responsavel}
                              onChange={e => setNewStudent({...newStudent, cpf_responsavel: e.target.value})}
                              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-brand-light focus:bg-white outline-none text-gray-900 font-bold transition-all"
                              placeholder="000.000.000-00"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Endereço de Cobrança / Residencial</label>
                           <input 
                              type="text" required
                              value={newStudent.endereco_responsavel}
                              onChange={e => setNewStudent({...newStudent, endereco_responsavel: e.target.value})}
                              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-brand-light focus:bg-white outline-none text-gray-900 font-bold transition-all"
                              placeholder="Rua, Número, Bairro, CEP..."
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp de Contato</label>
                           <input 
                              type="tel" required
                              value={newStudent.whatsapp_responsavel}
                              onChange={e => setNewStudent({...newStudent, whatsapp_responsavel: e.target.value})}
                              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-brand-light focus:bg-white outline-none text-gray-900 font-bold transition-all"
                              placeholder="(71) 90000-0000"
                           />
                        </div>
                     </div>
                  </div>

                  {/* DADOS DO ALUNO */}
                  <div className="space-y-6">
                     <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                        <div className="p-2 bg-brand-light/20 rounded-lg text-brand-dark">
                           <BookOpen size={18} />
                        </div>
                        <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest">2. Dados do Estudante</h3>
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Completo do Aluno</label>
                           <input 
                              type="text" required
                              value={newStudent.nome}
                              onChange={e => setNewStudent({...newStudent, nome: e.target.value})}
                              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-brand-light focus:bg-white outline-none text-gray-900 font-bold transition-all"
                              placeholder="Nome da criança ou jovem"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Data de Nascimento</label>
                           <input 
                              type="date" required
                              value={newStudent.data_nascimento}
                              onChange={e => setNewStudent({...newStudent, data_nascimento: e.target.value})}
                              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-brand-light focus:bg-white outline-none text-gray-900 font-bold transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Série / Ano Letivo</label>
                           <select 
                              required
                              value={newStudent.serie}
                              onChange={e => setNewStudent({...newStudent, serie: e.target.value})}
                              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-brand-light focus:bg-white outline-none text-gray-900 font-bold transition-all"
                           >
                              <option value="">Selecione a série...</option>
                              <option value="G1 - Grupo 1">G1 - Grupo 1</option>
                              <option value="G2 - Grupo 2">G2 - Grupo 2</option>
                              <option value="G3 - Grupo 3">G3 - Grupo 3</option>
                              <option value="1º Ano Fundamental">1º Ano Fundamental</option>
                              <option value="2º Ano Fundamental">2º Ano Fundamental</option>
                              <option value="3º Ano Fundamental">3º Ano Fundamental</option>
                              <option value="1º Ano Médio">1º Ano Médio</option>
                              <option value="2º Ano Médio">2º Ano Médio</option>
                              <option value="3º Ano Médio">3º Ano Médio</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Turno</label>
                           <div className="grid grid-cols-2 gap-4">
                              <button 
                                 type="button"
                                 onClick={() => setNewStudent({...newStudent, turno: 'Matutino'})}
                                 className={`py-4 rounded-2xl font-black uppercase text-xs border-2 transition-all ${newStudent.turno === 'Matutino' ? 'bg-brand-dark text-white border-brand-dark shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-brand-light'}`}
                              >
                                 Matutino
                              </button>
                              <button 
                                 type="button"
                                 onClick={() => setNewStudent({...newStudent, turno: 'Vespertino'})}
                                 className={`py-4 rounded-2xl font-black uppercase text-xs border-2 transition-all ${newStudent.turno === 'Vespertino' ? 'bg-brand-dark text-white border-brand-dark shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-brand-light'}`}
                              >
                                 Vespertino
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* NAE & ARQUIVOS */}
                  <div className="space-y-6 p-8 bg-brand-light/5 rounded-[2rem] border-2 border-brand-light/10">
                     <div className="flex items-center gap-3 border-b border-brand-light/20 pb-2">
                        <div className="p-2 bg-brand-light/20 rounded-lg text-brand-dark">
                           <FileText size={18} />
                        </div>
                        <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest">3. Relatório NAE / Inclusão</h3>
                     </div>
                     
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Observações de Acompanhamento</label>
                        <textarea 
                           placeholder="Diagnósticos, alergias, dificuldades ou histórico escolar relevante..."
                           value={newStudent.observacoes}
                           onChange={e => setNewStudent({...newStudent, observacoes: e.target.value})}
                           className="w-full px-5 py-4 bg-white border-2 border-gray-50 rounded-2xl focus:border-brand-light outline-none h-32 text-gray-900 font-medium transition-all"
                        />
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Documentação Digital (Laudos/Histórico)</label>
                        <div className="flex flex-wrap gap-4">
                           <label className={`cursor-pointer flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-dashed transition-all ${isUploading ? 'bg-gray-100 border-gray-300 opacity-50' : 'bg-white border-brand-light/40 hover:border-brand-light hover:bg-white text-brand-dark'}`}>
                              <input 
                                 type="file" 
                                 className="hidden" 
                                 onChange={handleFileUpload}
                                 disabled={isUploading || isSubmitting || !newStudent.nome}
                                 accept=".pdf,.doc,.docx,image/*"
                              />
                              {isUploading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                              <span className="font-black text-xs uppercase tracking-tighter">
                                 {isUploading ? 'Sincronizando...' : 'Anexar PDF / Foto'}
                              </span>
                           </label>
                           
                           {newStudent.arquivos_nae?.map((url, i) => (
                              <div key={i} className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center gap-2 text-[10px] font-bold text-gray-500 shadow-sm animate-in zoom-in">
                                 <FileText size={12} className="text-brand-light" />
                                 Arquivo {i+1}
                                 <CheckCircle2 size={12} className="text-green-500" />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <button 
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full py-6 bg-brand-dark text-white rounded-[1.5rem] font-black uppercase tracking-[0.25em] text-lg hover:bg-brand-dark/90 transition-all shadow-2xl shadow-brand-dark/20 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:transform-none"
                  >
                     {isSubmitting ? (
                       <>
                         <Loader2 className="animate-spin" /> Salvando no Supabase...
                       </>
                     ) : (
                       <>
                         <Save size={24} className="text-brand-yellow" /> Concluir Matrícula Unificada
                       </>
                     )}
                  </button>
               </form>
            </div>
          </div>
        )}
      </main>

      {/* Ficha Completa (Modal) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/70 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="bg-brand-light/10 p-8 flex items-center justify-between border-b border-brand-light/20">
                 <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-brand-dark text-3xl font-black shadow-xl border-4 border-white">
                       {selectedStudent.nome[0]}
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-brand-dark leading-none tracking-tighter">{selectedStudent.nome}</h2>
                       <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-black bg-brand-dark text-white px-2 py-0.5 rounded uppercase tracking-widest">{selectedStudent.serie}</span>
                          <span className="text-[10px] font-black bg-brand-yellow text-brand-dark px-2 py-0.5 rounded uppercase tracking-widest">{selectedStudent.turno}</span>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setSelectedStudent(null)} className="p-3 text-gray-400 hover:text-brand-dark hover:bg-white rounded-full transition-all shadow-sm">
                   <X size={28} />
                 </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-10 space-y-10 overflow-y-auto scrollbar-thin">
                 
                 {/* Seção Dados do Responsável */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
                       <UserCheck size={14} className="text-brand-dark" /> Informações do Responsável
                    </h4>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400">Nome do Pai/Responsável:</p>
                          <p className="font-black text-gray-900 text-lg">{selectedStudent.responsavel_nome}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400">CPF Registrado:</p>
                          <p className="font-black text-gray-800">{selectedStudent.cpf_responsavel || 'Não informado'}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400">WhatsApp:</p>
                          <p className="font-black text-green-600 flex items-center gap-2">
                            <Phone size={14} /> {selectedStudent.whatsapp_responsavel}
                          </p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400">Endereço Completo:</p>
                          <div className="flex items-start gap-2">
                             <MapPin size={14} className="text-brand-dark shrink-0 mt-0.5" />
                             <p className="text-sm font-medium text-gray-700 leading-snug">{selectedStudent.endereco_responsavel}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Seção Dados do Aluno */}
                 <div className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-widest border-b border-brand-light/20 pb-2 flex items-center gap-2">
                       <GraduationCap size={14} /> Dados Escolares
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="flex items-center gap-3">
                          <Calendar className="text-brand-light" size={18} />
                          <div>
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Nascimento</p>
                             <p className="font-black text-gray-800">{new Date(selectedStudent.data_nascimento).toLocaleDateString()}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <Layers className="text-brand-light" size={18} />
                          <div>
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Série / Turno</p>
                             <p className="font-black text-gray-800">{selectedStudent.serie} ({selectedStudent.turno})</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Seção NAE */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-widest border-b border-gray-100 pb-2">Acompanhamento NAE</h4>
                    <div className="bg-blue-50/50 p-6 rounded-2xl border-2 border-white shadow-inner">
                       <p className="text-sm text-gray-600 leading-relaxed font-medium italic">
                          {selectedStudent.observacoes || 'Nenhuma observação clínica ou pedagógica registrada.'}
                       </p>
                    </div>
                 </div>

                 {/* Documentos */}
                 {selectedStudent.arquivos_nae && selectedStudent.arquivos_nae.length > 0 && (
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Anexos Digitais</h4>
                      <div className="grid gap-3">
                         {selectedStudent.arquivos_nae.map((url, i) => (
                            <a 
                               key={i} 
                               href={url} 
                               target="_blank" 
                               rel="noreferrer" 
                               className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:border-brand-light hover:shadow-md transition-all group"
                            >
                               <div className="flex items-center gap-3">
                                  <FileText className="text-brand-light" size={20} />
                                  <span className="text-sm font-bold text-gray-700">Documento de Matrícula {i+1}</span>
                               </div>
                               <ExternalLink size={16} className="text-gray-300 group-hover:text-brand-dark" />
                            </a>
                         ))}
                      </div>
                   </div>
                 )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                 <button 
                   onClick={() => setSelectedStudent(null)} 
                   className="w-full py-4 bg-brand-dark text-white rounded-[1.25rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-brand-dark/20 hover:bg-brand-dark/90 transition-all"
                 >
                   Fechar Ficha Técnica
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
