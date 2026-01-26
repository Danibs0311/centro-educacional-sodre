
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserType } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados do Superusuário para Garantia de Acesso
const SUPER_USER_ID = 'b328bed0-6c90-4604-8602-4e12a4d9d656';
const SUPER_USER_EMAIL = 'danibs2109@gmail.com';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (id: string, email: string): Promise<User | null> => {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.warn("Perfil não encontrado ou erro de política (RLS):", error.message);
        return null;
      }

      if (data) {
        // Regra de Superusuário: Se for o Daniel, sempre retorna ADMIN independente do que está no banco
        const tipoFinal = (id === SUPER_USER_ID || email === SUPER_USER_EMAIL) 
          ? UserType.ADMIN 
          : data.tipo as UserType;

        return {
          id: data.id,
          nome: data.nome,
          email: email,
          tipo: tipoFinal,
          created_at: data.created_at
        };
      }
      return null;
    } catch (err) {
      console.error("Exceção ao buscar perfil:", err);
      return null;
    }
  };

  const ensureProfileExists = async (id: string, email: string): Promise<User> => {
    // 1. Tenta buscar o perfil real
    let profile = await fetchProfile(id, email);
    
    if (profile) {
      setUser(profile);
      return profile;
    }

    // 2. Tenta criar/atualizar no banco (UPSERT)
    try {
      const tipoPadrao = (id === SUPER_USER_ID || email === SUPER_USER_EMAIL) ? 'ADMIN' : 'RESPONSAVEL';
      const nomePadrao = (id === SUPER_USER_ID) ? 'Daniel Guimarães' : email.split('@')[0];

      const { error: insertError } = await supabase
        .from('profiles')
        .upsert({ 
          id: id, 
          nome: nomePadrao,
          tipo: tipoPadrao
        });
      
      if (!insertError) {
        profile = await fetchProfile(id, email);
        if (profile) {
          setUser(profile);
          return profile;
        }
      } else {
        console.warn("Erro ao fazer upsert do perfil:", insertError.message);
      }
    } catch (e) {
      console.error("Erro na resiliência do perfil:", e);
    }

    // 3. FALLBACK: Perfil Sintético (Garante que o login nunca trave, mesmo com recursão de RLS)
    const syntheticUser: User = {
      id: id,
      nome: (id === SUPER_USER_ID) ? 'Daniel Guimarães' : email.split('@')[0],
      email: email,
      tipo: (id === SUPER_USER_ID || email === SUPER_USER_EMAIL) ? UserType.ADMIN : UserType.RESPONSAVEL,
      created_at: new Date().toISOString()
    };
    
    setUser(syntheticUser);
    return syntheticUser;
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          await ensureProfileExists(data.session.user.id, data.session.user.email!);
        }
      } catch (e) {
        console.error("Erro na sessão inicial:", e);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await ensureProfileExists(session.user.id, session.user.email!);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    if (!isSupabaseConfigured) throw new Error("Supabase não configurado.");
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;

      if (data.user) {
        await ensureProfileExists(data.user.id, data.user.email!);
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      setUser(null);
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
