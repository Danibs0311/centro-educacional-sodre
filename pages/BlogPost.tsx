import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { BlogPost as BlogPostType } from '../types';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import SEO from '../components/SEO'; // Assuming SEO component exists given index.html metas

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const posts = await blogService.getPublishedPosts();
                const foundPost = posts.find(p => p.slug === slug);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen grid place-items-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
                    <p className="text-gray-500 font-medium">Carregando artigo...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <>
            <SEO
                title={`${post.titulo} | Blog Educandário Sodré`}
                description={post.resumo || post.titulo}
            />

            <article className="min-h-screen bg-gray-50 pb-20">
                {/* Hero Section with Image */}
                <div className="h-[50vh] relative w-full overflow-hidden">
                    <img
                        src={post.image || `https://picsum.photos/1200/600?random=${post.id}`}
                        alt={post.titulo}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 container mx-auto">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold mb-6 transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                        >
                            <ArrowLeft size={18} /> Voltar ao Blog
                        </Link>

                        <div className="flex items-center gap-4 text-sm font-bold text-brand-yellow mb-4 uppercase tracking-wider">
                            <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-sm">Artigo</span>
                            <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl drop-shadow-lg">
                            {post.titulo}
                        </h1>

                        <div className="flex items-center gap-3 mt-6 text-white/90 font-medium">
                            <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-dark">
                                <User size={20} />
                            </div>
                            <span>Por {post.autor}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 -mt-10 relative z-10 md:-mt-20">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-14 lg:p-16 border border-gray-100">

                        {post.resumo && (
                            <p className="text-xl md:text-2xl text-gray-500 font-serif leading-relaxed italic mb-10 border-l-4 border-brand-yellow pl-6">
                                "{post.resumo}"
                            </p>
                        )}

                        <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-brand-dark prose-a:text-brand-blue hover:prose-a:text-brand-blue/80 prose-img:rounded-2xl">
                            {post.conteudo.split('\n').map((paragraph, idx) => (
                                paragraph.trim() && <p key={idx} className="mb-6 text-gray-700 leading-8">{paragraph}</p>
                            ))}
                        </div>

                        {/* Share Section */}
                        <div className="mt-16 pt-10 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Share2 size={20} className="text-brand-yellow" /> Compartilhe este artigo
                            </h3>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                                    <Facebook size={20} />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-500/20">
                                    <Twitter size={20} />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-700/20">
                                    <Linkedin size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default BlogPost;
