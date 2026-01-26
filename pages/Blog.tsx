
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { CONTENT } from '../constants';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getPublishedPosts();
        setPosts(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <SEO
        title="Blog do Núcleo"
        description={CONTENT.blog.text}
      />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Blog do Núcleo</h1>
          <p className="text-gray-600 whitespace-pre-line text-lg font-medium">{CONTENT.blog.text}</p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark mx-auto"></div>
            <p className="mt-4 text-gray-500 font-medium">Carregando artigos...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-2xl transition duration-500 flex flex-col h-full border border-gray-100 group">
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={post.image || 'https://picsum.photos/800/400?random=' + post.id}
                    alt={post.titulo}
                    className="w-full h-full object-cover transition duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Educação
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-brand-light" /> {new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                    <span className="flex items-center gap-1.5"><User size={14} className="text-brand-light" /> {post.autor}</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-brand-dark transition-colors">{post.titulo}</h2>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed font-medium">{post.resumo}</p>
                  <Link to={`/blog/${post.slug}`} className="flex items-center gap-2 text-brand-dark font-black text-sm hover:underline mt-auto self-start group/btn">
                    Ler artigo completo <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </article>
            ))}
            {posts.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 text-xl font-medium">Nenhum artigo publicado no momento.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
