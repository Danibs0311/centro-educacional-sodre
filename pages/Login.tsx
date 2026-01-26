import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, Mail, Loader2, ArrowLeft, AlertCircle, Info } from 'lucide-react';
import SEO from '../components/SEO';

const Login: React.FC = () => {
  // ... rest of component

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/area-responsavel');
    } catch (err: any) {
      // Tradução de erros comuns do Supabase para o usuário
      let message = 'Erro ao realizar login. Verifique suas credenciais.';
      if (err.message === 'Invalid login credentials') {
        message = 'E-mail ou senha incorretos.';
      } else if (err.message === 'Email not confirmed') {
        message = 'Este e-mail ainda não foi confirmado. Verifique sua caixa de entrada.';
      } else {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative">
      <Link to="/" className="absolute top-6 left-4 md:top-8 md:left-8 flex items-center gap-2 text-gray-600 hover:text-brand-dark font-medium transition p-2 bg-white/50 rounded-lg">
        <ArrowLeft size={20} /> <span className="hidden md:inline">Voltar para Home</span>
      </Link>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-yellow">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-100 text-brand-dark rounded-full flex items-center justify-center mb-4">
            <GraduationCap size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Portal Sodré</h2>
          <p className="text-gray-500 text-sm mt-2">Área restrita para Pais e Alunos</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in zoom-in">
            <AlertCircle size={20} className="shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!error && (
          <div className="bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded-xl flex items-center gap-3 text-xs font-medium">
            <Info size={16} className="shrink-0" />
            <p>Utilize o e-mail cadastrado na secretaria para acessar seu painel.</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent transition bg-gray-50"
                placeholder="Seu e-mail"
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
                className="block w-full pl-10 px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent transition bg-gray-50"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button type="button" className="text-xs font-bold text-brand-dark hover:underline">
              Esqueceu a senha?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-brand-dark hover:bg-brand-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light transition disabled:opacity-70 shadow-lg shadow-brand-dark/20 uppercase tracking-widest"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Acessar Portal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
