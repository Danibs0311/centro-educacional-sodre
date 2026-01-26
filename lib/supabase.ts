import { createClient } from '@supabase/supabase-js';

// Credenciais fornecidas para integração oficial do Educandário Sodré
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Inicialização do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Flag de configuração ativa para habilitar funcionalidades dinâmicas nos serviços
// Flag de configuração ativa para habilitar funcionalidades dinâmicas nos serviços
export const isSupabaseConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';
