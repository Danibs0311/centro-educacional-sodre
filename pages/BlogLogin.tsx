
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Newspaper, Lock, Mail, Loader2, ArrowLeft, AlertCircle, ShieldAlert } from 'lucide-react';
import { UserType } from '../types';

const BlogLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Se o usuário já estiver logado e for admin, redireciona
  useEffect(() => {
    if (isAuthenticated && (user?.tipo === UserType.ADMIN || user?.tipo === UserType.BLOG_ADMIN)) {
      navigate('/blog-admin');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      // O useEffect acima cuidará do redirecionamento se for admin
      // Mas forçamos uma verificação aqui para feedback imediato
    } catch (err: any) {
      console.error("Erro no login admin:", err);
      if (err.message.includes("Invalid login")) {
        setError('E-mail ou senha incorretos.');
      } else {
        setError(err.message || 'Erro ao acessar o painel administrativo.');
      }
      setIsLoading(false);
    }
  };

  // Se logou mas não é admin, mostra erro específico
  const isLoggedButNotAdmin = isAuthenticated && user?.tipo !== UserType.ADMIN && user?.tipo !== UserType.BLOG_ADMIN;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 relative">
      <Link 
        to="/" 
        className="absolute top-6 left-4 md:top-8 md:left-8 flex items-center gap-2 text-gray-600 hover:text-brand-dark font-medium transition p-2 bg-white/50 rounded-lg"
      >
        <ArrowLeft size={20} /> <span className="hidden md:inline">Voltar para Home</span>
      </Link>
      
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-light">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-brand-light/20 text-brand-dark rounded-2xl flex items-center justify-center mb-4">
             <Newspaper size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Blog Admin</h2>
          <p className="mt-2 text-sm text-gray-600 font-medium">
            Gestão de Conteúdo Sodré
          </p>
        </div>

        {isLoggedButNotAdmin && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 p-5 rounded-xl space-y-3 animate-in fade-in zoom-in">
            <div className="flex items-center gap-3">
              <ShieldAlert size={24} className="shrink-0" />
              <p className="font-bold">Acesso Negado</p>
            </div>
            <p className="text-xs leading-relaxed">
              Você está conectado como <strong>{user?.nome}</strong>, mas sua conta está definida como <strong>{user?.tipo}</strong>. 
              Apenas administradores podem acessar esta área.
            </p>
            <div className="bg-white/50 p-2 rounded text-[10px] font-mono break-all">
              Seu ID: {user?.id}
            </div>
            <p className="text-[10px] italic">
              Use o ID acima no SQL Editor do Supabase para se tornar ADMIN: <br/>
              <code className="bg-gray-800 text-white px-1 rounded">UPDATE profiles SET tipo = 'ADMIN' WHERE id = 'ID_ACIMA';</code>
            </p>
          </div>
        )}

        {error && !isLoggedButNotAdmin && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in zoom-in">
            <AlertCircle size={20} className="shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        {!isLoggedButNotAdmin && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent transition"
                  placeholder="E-mail do Administrador"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent transition"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-dark hover:bg-brand-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light transition disabled:opacity-70 shadow-md"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Acessar Painel'}
            </button>
          </form>
        )}

        {isLoggedButNotAdmin && (
           <button
            onClick={() => window.location.reload()}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-bold rounded-xl text-gray-600 bg-gray-50 hover:bg-gray-100 transition"
          >
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogLogin;
