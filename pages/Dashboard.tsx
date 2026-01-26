
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/dataService';
import { Message, Orientation, Student } from '../types';
import { useNavigate, Link } from 'react-router-dom';
// Fix: Added missing icons GraduationCap, LayoutDashboard, and Info to the import list
import { Mail, FileText, User as UserIcon, LogOut, Send, Menu, Home, Loader2, Bell, Calendar, BookOpen, Star, GraduationCap, LayoutDashboard, Info } from 'lucide-react';
import SEO from '../components/SEO';

const Dashboard: React.FC = () => {
   const { user, logout, isAuthenticated } = useAuth();
   // ... (keep existing hook calls)

   if (!user) return null;

   return (
      <div className="min-h-screen bg-[#f8fafc] flex">
         <SEO title="Painel do Responsável" />
         {/* Sidebar Mobile Overlay */}
         {isSidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
         )}

         {/* Sidebar Lateral */}
         <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white shadow-xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 flex flex-col`}>
            <div className="p-8 border-b border-gray-100 flex items-center gap-3">
               <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center text-brand-dark shadow-lg">
                  <GraduationCap size={24} />
               </div>
               <div>
                  <h2 className="text-lg font-black text-brand-dark tracking-tighter">Portal Sodré</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Área do Aluno</p>
               </div>
            </div>

            <nav className="p-6 space-y-1.5 flex-1">
               <button
                  onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'overview' ? 'bg-brand-dark text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                  <LayoutDashboard size={20} />
                  <span className="font-bold text-sm">Visão Geral</span>
               </button>
               <button
                  onClick={() => { setActiveTab('messages'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'messages' ? 'bg-brand-dark text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                  <Mail size={20} />
                  <span className="font-bold text-sm">Mensagens</span>
               </button>
               <button
                  onClick={() => { setActiveTab('orientations'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'orientations' ? 'bg-brand-dark text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                  <FileText size={20} />
                  <span className="font-bold text-sm">NAE / Inclusão</span>
               </button>
               <button
                  onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-brand-dark text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                  <UserIcon size={20} />
                  <span className="font-bold text-sm">Dados Escolares</span>
               </button>

               <div className="pt-8 opacity-40">
                  <hr className="border-gray-200" />
               </div>

               <Link to="/" className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:text-brand-dark transition-colors">
                  <Home size={20} />
                  <span className="font-bold text-sm">Sair do Portal</span>
               </Link>
            </nav>

            <div className="p-6">
               <button onClick={() => { logout(); navigate('/'); }} className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                  <LogOut size={20} /> Sair do Sistema
               </button>
            </div>
         </aside>

         {/* Main Content Area */}
         <main className="flex-1 overflow-y-auto h-screen scrollbar-thin">
            {/* Header Superior */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 px-8 py-4 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-gray-100 rounded-lg">
                     <Menu size={24} className="text-gray-600" />
                  </button>
                  <h1 className="text-xl font-black text-gray-800 tracking-tight">
                     Olá, {user.nome.split(' ')[0]} 👋
                  </h1>
               </div>
               <div className="flex items-center gap-4">
                  <button className="p-2 text-gray-400 hover:text-brand-dark transition relative">
                     <Bell size={22} />
                     <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-yellow rounded-full"></span>
                  </button>
                  <div className="h-10 w-10 bg-brand-light/30 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-brand-dark font-black">
                     {user.nome[0]}
                  </div>
               </div>
            </header>

            {isLoading ? (
               <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
                  <Loader2 className="animate-spin text-brand-dark" size={48} />
                  <p className="mt-4 text-gray-500 font-medium">Sincronizando portal...</p>
               </div>
            ) : (
               <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">

                  {activeTab === 'overview' && (
                     <div className="space-y-8">
                        {/* Banner de Boas Vindas */}
                        <div className="bg-gradient-to-r from-brand-dark to-[#4a69a2] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                           <div className="relative z-10">
                              <span className="bg-brand-yellow text-brand-dark px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Comunicado</span>
                              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">Prepare-se para o novo ciclo!</h2>
                              <p className="text-brand-light text-lg max-w-xl opacity-90 leading-relaxed">
                                 No Sodré, cada dia é uma nova oportunidade de descoberta. Verifique suas orientações abaixo.
                              </p>
                           </div>
                        </div>

                        {/* Cards de Acesso Rápido */}
                        <div className="grid md:grid-cols-3 gap-6">
                           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                 <Calendar size={24} />
                              </div>
                              <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Aulas</p>
                                 <p className="font-black text-gray-800">Segunda a Sexta</p>
                              </div>
                           </div>
                           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
                                 <Star size={24} />
                              </div>
                              <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Eventos</p>
                                 <p className="font-black text-gray-800">2 Programados</p>
                              </div>
                           </div>
                           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                 <BookOpen size={24} />
                              </div>
                              <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Atividades</p>
                                 <p className="font-black text-gray-800">Em andamento</p>
                              </div>
                           </div>
                        </div>

                        {/* Resumo do Aluno */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                           <div className="flex items-center justify-between mb-8">
                              <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                                 <UserIcon className="text-brand-yellow" /> Seus Filhos
                              </h3>
                           </div>
                           <div className="grid gap-6">
                              {students.map(s => (
                                 <div key={s.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-brand-light transition-all">
                                    <div className="flex items-center gap-4">
                                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-dark shadow-sm border border-gray-200">
                                          <GraduationCap size={28} />
                                       </div>
                                       <div>
                                          <h4 className="font-black text-gray-900 text-lg">{s.nome}</h4>
                                          <p className="text-sm text-gray-400">Nascimento: {new Date(s.data_nascimento).toLocaleDateString('pt-BR')}</p>
                                       </div>
                                    </div>
                                    <button
                                       onClick={() => setActiveTab('profile')}
                                       className="mt-4 md:mt-0 bg-white px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-brand-dark hover:text-white transition-all"
                                    >
                                       Ficha Completa
                                    </button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'messages' && (
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h2 className="text-2xl font-black text-gray-800">Canal de Comunicação</h2>
                        </div>
                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[600px]">
                           <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gray-50 scrollbar-thin">
                              {messages.map((msg) => {
                                 const isMe = msg.remetente_id === user.id;
                                 return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                       <div className={`max-w-[75%] p-5 rounded-3xl ${isMe ? 'bg-brand-dark text-white rounded-br-none shadow-lg' : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none shadow-md'}`}>
                                          <p className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60">{isMe ? 'Você' : msg.remetente_nome}</p>
                                          <p className="text-sm font-medium leading-relaxed">{msg.conteudo}</p>
                                          <p className="text-[10px] text-right mt-3 opacity-40 font-bold">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>
                           <div className="p-6 bg-white border-t border-gray-100">
                              <form onSubmit={handleSendMessage} className="flex gap-4">
                                 <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Escreva sua mensagem aqui..."
                                    className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-light transition"
                                 />
                                 <button type="submit" className="bg-brand-dark text-white p-4 rounded-2xl hover:scale-105 transition-transform shadow-lg">
                                    <Send size={24} />
                                 </button>
                              </form>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'orientations' && (
                     <div className="space-y-8">
                        <h2 className="text-2xl font-black text-gray-800">Orientações do Núcleo (NAE)</h2>
                        <div className="grid gap-6">
                           {orientations.map(ori => (
                              <div key={ori.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                                 <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow"></div>
                                 <div className="flex justify-between items-start mb-6">
                                    <div>
                                       <h3 className="text-xl font-black text-gray-900 group-hover:text-brand-dark transition-colors">{ori.titulo}</h3>
                                       <div className="flex items-center gap-2 mt-1">
                                          <div className="w-6 h-6 bg-brand-light/30 rounded-full flex items-center justify-center text-[10px] font-bold">
                                             {ori.professional_nome?.[0]}
                                          </div>
                                          <span className="text-xs text-gray-400 font-bold uppercase">{ori.professional_nome}</span>
                                       </div>
                                    </div>
                                    <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest">{new Date(ori.created_at).toLocaleDateString()}</span>
                                 </div>
                                 <p className="text-gray-600 leading-relaxed font-medium">{ori.descricao}</p>
                              </div>
                           ))}
                           {orientations.length === 0 && (
                              <div className="bg-white p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-200">
                                 <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                                 <p className="text-gray-400 font-bold">Ainda não há orientações pedagógicas para este aluno.</p>
                              </div>
                           )}
                        </div>
                     </div>
                  )}

                  {activeTab === 'profile' && selectedStudent && (
                     <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-2xl font-black text-gray-800">Ficha do Estudante</h2>
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-8">
                           <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-50 pb-8">
                              <div className="w-24 h-24 bg-brand-light/20 rounded-[2rem] flex items-center justify-center text-brand-dark text-4xl font-black border-2 border-white shadow-lg">
                                 {selectedStudent.nome[0]}
                              </div>
                              <div className="text-center md:text-left">
                                 <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{selectedStudent.nome}</h3>
                                 <p className="text-brand-light font-bold">Matrícula Ativa 2024</p>
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Data de Nascimento</p>
                                 <p className="font-black text-gray-800">{new Date(selectedStudent.data_nascimento).toLocaleDateString('pt-BR')}</p>
                              </div>
                              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Responsável</p>
                                 <p className="font-black text-gray-800">{user.nome}</p>
                              </div>
                           </div>

                           <div className="p-8 bg-blue-50/50 rounded-3xl border-2 border-white shadow-inner">
                              <div className="flex items-center gap-2 mb-4">
                                 <Info size={18} className="text-brand-dark" />
                                 <h4 className="text-xs font-black text-brand-dark uppercase tracking-widest">Observações NAE</h4>
                              </div>
                              <p className="text-gray-600 font-medium leading-relaxed">{selectedStudent.observacoes || 'Nenhuma observação clínica registrada para este estudante.'}</p>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            )}
         </main>
      </div>
   );
};

export default Dashboard;
