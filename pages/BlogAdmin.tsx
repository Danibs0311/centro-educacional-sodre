
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { BlogPost, UserType } from '../types';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, LayoutDashboard, LogOut, Newspaper, Search, Loader2, GraduationCap, MessageSquare, Phone, Calendar, MessageCircle } from 'lucide-react';

const BlogAdmin: React.FC = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'messages'>('posts');
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    const data = await blogService.getPosts();
    setPosts(data);
    setIsLoadingPosts(false);
  };

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    const data = await blogService.getContactMessages();
    setContactMessages(data);
    setIsLoadingMessages(false);
  };

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      navigate('/blog-login');
      return;
    }
    if (user?.tipo !== UserType.BLOG_ADMIN && user?.tipo !== UserType.ADMIN) {
        navigate('/');
        return;
    }
    fetchPosts();
    fetchMessages();
  }, [isAuthenticated, user, navigate, loading]);

  const handleCreate = () => {
    setCurrentPost({
      id: crypto.randomUUID(),
      titulo: '',
      slug: '',
      resumo: '',
      conteudo: '',
      autor: user?.nome || 'Admin',
      created_at: new Date().toISOString(),
      publicado: false,
      image: 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 100)
    });
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
      await blogService.deletePost(id);
      await fetchPosts();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPost.id && currentPost.titulo && currentPost.conteudo) {
      await blogService.savePost(currentPost as BlogPost);
      await fetchPosts();
      setIsEditing(false);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-brand-dark" size={48} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-brand-dark p-2 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl mr-4">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'posts' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Artigos
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'messages' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Mensagens
            </button>
          </div>
          <span className="text-sm text-gray-500 hidden md:block">Administrador: <span className="font-bold text-brand-dark">{user.nome}</span></span>
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition text-sm font-bold">
            <LogOut size={18} /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-400 font-bold uppercase mb-2">Artigos</p>
              <p className="text-2xl font-black text-gray-900">{posts.length}</p>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-400 font-bold uppercase mb-2">Mensagens</p>
              <p className="text-2xl font-black text-gray-900">{contactMessages.length}</p>
           </div>
        </div>

        {isLoadingPosts ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-dark mb-4" size={48} />
            <p className="text-gray-500 font-medium">Sincronizando com Supabase...</p>
          </div>
        ) : isEditing ? (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Newspaper className="text-brand-dark" />
                  {currentPost.titulo ? 'Editar Artigo' : 'Novo Artigo'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Título do Artigo</label>
                    <input 
                      type="text" 
                      required
                      value={currentPost.titulo || ''}
                      onChange={e => setCurrentPost({...currentPost, titulo: e.target.value, slug: e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-')})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-light outline-none text-gray-900 font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">URL Amigável (Slug)</label>
                    <input 
                      type="text" 
                      required
                      value={currentPost.slug || ''}
                      onChange={e => setCurrentPost({...currentPost, slug: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-light outline-none text-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Resumo</label>
                  <textarea 
                    value={currentPost.resumo || ''}
                    onChange={e => setCurrentPost({...currentPost, resumo: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-light outline-none h-20 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">URL da Imagem</label>
                  <input 
                    type="url" 
                    value={currentPost.image || ''}
                    onChange={e => setCurrentPost({...currentPost, image: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-light outline-none text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Conteúdo (Markdown)</label>
                  <textarea 
                    required
                    value={currentPost.conteudo || ''}
                    onChange={e => setCurrentPost({...currentPost, conteudo: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-light outline-none h-64 font-mono text-sm text-gray-900"
                  />
                </div>
                <div className="flex items-center gap-3 py-4 border-t border-gray-100">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={currentPost.publicado || false}
                      onChange={e => setCurrentPost({...currentPost, publicado: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-light/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-dark"></div>
                    <span className="ml-3 text-sm font-bold text-gray-900">Publicar agora</span>
                  </label>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-dark/90 transition shadow-xl">
                    <Save size={20} /> Salvar Artigo
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : activeTab === 'messages' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="grid gap-4">
                {contactMessages.map(msg => (
                   <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/4 space-y-2">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 bg-brand-light/20 rounded-full flex items-center justify-center text-brand-dark font-black text-xs">
                                  {msg.name[0]}
                               </div>
                               <div>
                                  <p className="font-bold text-gray-900 text-sm leading-tight">{msg.name}</p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(msg.created_at).toLocaleDateString()}</p>
                               </div>
                            </div>
                            {msg.phone && (
                               <a href={`https://wa.me/55${msg.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${msg.name}, vi sua mensagem no site do Educandário Sodré:\n\n"${msg.message}"\n\nComo posso ajudar?`)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 mt-2 rounded-lg font-bold hover:bg-green-600 transition shadow-sm w-full md:w-auto">
                                  <Phone size={16} /> Responder via WhatsApp
                               </a>
                            )}
                            {msg.interest && (
                               <span className="inline-block text-[10px] font-black text-brand-dark bg-brand-light/10 px-2 py-0.5 rounded-full">
                                  {msg.interest}
                               </span>
                            )}
                         </div>
                         <div className="md:w-3/4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">{msg.message}</p>
                         </div>
                      </div>
                   </div>
                ))}
                {contactMessages.length === 0 && (
                   <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                      <MessageSquare className="mx-auto text-gray-200 mb-2" size={48} />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Nenhuma mensagem recebida.</p>
                   </div>
                )}
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-light outline-none shadow-sm transition text-gray-900 font-medium"
                />
              </div>
              <button 
                onClick={handleCreate}
                className="flex items-center justify-center gap-2 bg-brand-dark text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-dark/90 transition shadow-lg shadow-brand-dark/20"
              >
                <Plus size={20} /> Novo Artigo
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Artigo</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Autor</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPosts.map(post => (
                      <tr key={post.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={post.image || 'https://picsum.photos/100/100'} className="w-12 h-12 rounded-lg object-cover shadow-sm" alt="" />
                            <span className="font-bold text-gray-900 line-clamp-1">{post.titulo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{post.autor}</td>
                        <td className="px-6 py-4">
                          {post.publicado ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-100 text-green-700 tracking-tighter">
                              <Eye size={12} /> Publicado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-600 tracking-tighter">
                              <EyeOff size={12} /> Rascunho
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEdit(post)} className="p-2 text-brand-dark hover:bg-brand-light/10 rounded-lg transition">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(post.id!)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogAdmin;

