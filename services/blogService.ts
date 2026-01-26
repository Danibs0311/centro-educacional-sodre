
import { BlogPost } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_BLOG_POSTS } from '../constants';

export const blogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    if (!isSupabaseConfigured) {
      return MOCK_BLOG_POSTS;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Se a tabela não existir (código 42P01), retorna mocks
        if (error.code === '42P01') return MOCK_BLOG_POSTS;
        console.error('Erro ao buscar posts:', error.message);
        return MOCK_BLOG_POSTS;
      }
      return data && data.length > 0 ? data : MOCK_BLOG_POSTS;
    } catch (e) {
      return MOCK_BLOG_POSTS;
    }
  },

  getPublishedPosts: async (): Promise<BlogPost[]> => {
    if (!isSupabaseConfigured) {
      return MOCK_BLOG_POSTS;
    }

    try {
      console.log('Fetching fetched posts from Supabase...');
      // Race condition: Supabase query vs 5s timeout
      const queryPromise = supabase
        .from('posts')
        .select('*')
        .eq('publicado', true)
        .order('created_at', { ascending: false });

      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (error) {
        console.warn('Supabase Error:', error);
        return MOCK_BLOG_POSTS;
      }
      return data && data.length > 0 ? data : MOCK_BLOG_POSTS;
    } catch (e) {
      console.warn('Fallback to mocks due to error or timeout:', e);
      return MOCK_BLOG_POSTS;
    }

  },

  savePost: async (post: BlogPost): Promise<void> => {
    if (!isSupabaseConfigured) throw new Error("Supabase não configurado.");
    const { error } = await supabase
      .from('posts')
      .upsert({
        id: post.id,
        titulo: post.titulo,
        slug: post.slug,
        resumo: post.resumo,
        conteudo: post.conteudo,
        autor: post.autor,
        publicado: post.publicado,
        image: post.image,
        created_at: post.created_at
      });

    if (error) throw error;
  },

  deletePost: async (id: string): Promise<void> => {
    if (!isSupabaseConfigured) throw new Error("Supabase não configurado.");
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
