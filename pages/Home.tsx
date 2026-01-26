
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Trophy, Layout, Baby, Brain, Utensils, Star, ExternalLink, GraduationCap, Sun, ArrowRight, Calendar, Clock, HandHeart, Sparkles, Phone, Mail, CheckCircle2, Users2 } from 'lucide-react';
import { CONTENT, COMPANY_INFO, MOCK_BLOG_POSTS } from '../constants';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS.slice(0, 4));

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching posts...");
      const posts = await blogService.getPublishedPosts();
      console.log("Posts fetched:", posts);
      setLatestPosts(posts.slice(0, 4));
    };
    fetchPosts();
  }, []);

  const segments = [
    { title: "Ensino Infantil", path: "/educacao-infantil", image: "/images/educacaoinfantil.jpg" },
    { title: "Ensino Fundamental 1", path: "/ensino-fundamental-1", image: "/images/ensinofundamental1.avif" },
    { title: "Ensino Fundamental 2", path: "/ensino-fundamental-2", image: "/images/fundamental2.avif" },
    { title: "Ensino Médio", path: "/ensino-medio", image: "/images/medio.webp" },
  ];

  return (
    <>
      <SEO
        title="Início"
        description="O Educandário Sodré oferece Educação Infantil, Fundamental e Médio em Águas Claras. Formação integral, valores éticos e estrutura completa."
      />
      {/* Hero Section */}
      <section className="relative bg-brand-dark text-white py-24 lg:py-48 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050853023-83683f0443d3?auto=format&fit=crop&q=80&w=1920')" }}
        ></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 py-1.5 px-6 rounded-full bg-white/10 border border-white/20 text-brand-yellow text-sm font-bold tracking-wider mb-8 uppercase backdrop-blur-sm shadow-xl">
            <MapPin size={16} /> Águas Claras - Salvador
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none drop-shadow-2xl">
            Educandário Sodré
          </h1>
          <p className="text-xl md:text-3xl font-light text-brand-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Qualidade de ensino e <span className="text-brand-yellow font-bold">formação do caráter</span> para um futuro brilhante.
          </p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block p-6 bg-brand-light/20 rounded-full mb-8 text-brand-dark shadow-lg">
            <Heart size={48} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">{CONTENT.home.title}</h2>
          <p className="text-xl text-gray-600 leading-relaxed whitespace-pre-line max-w-3xl mx-auto font-medium">
            {CONTENT.home.text}
          </p>
        </div>
      </section>

      {/* Segmentos */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Nossos Segmentos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {segments.map((seg, idx) => (
              <Link key={idx} to={seg.path} className="group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="aspect-[4/5] relative">
                  <img
                    src={seg.image}
                    alt={seg.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${seg.title === "Ensino Médio" ? "blur-[2px]" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-black text-white mb-2">{seg.title}</h3>
                    <div className="flex items-center gap-2 text-brand-yellow font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver detalhes <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bolsas Section */}
      <section className="py-24 bg-gradient-to-b from-brand-dark to-[#2a3d60] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/20 text-brand-yellow font-bold text-sm uppercase tracking-wider mb-6 border border-brand-yellow/20">
                <GraduationCap size={16} /> Acessibilidade
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Educação de Qualidade ao Seu Alcance</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                Acreditamos que todo aluno merece uma oportunidade. Por isso, somos parceiros dos maiores programas de bolsas do país, facilitando o acesso ao nosso ensino de excelência.
              </p>

              <div className="flex gap-6 mb-10">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                  <div className="text-2xl font-black text-brand-yellow mb-1">50%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Desconto Máximo</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                  <div className="text-2xl font-black text-white mb-1">2026</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Matrículas Abertas</div>
                </div>
              </div>

              <Link to="/bolsas" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-brand-dark font-black rounded-xl hover:bg-yellow-400 transition transform hover:-translate-y-1 shadow-lg shadow-yellow-500/20">
                Ver Opções de Bolsas <ArrowRight size={20} />
              </Link>
            </div>

            <div className="flex-1 w-full max-w-lg relative">
              <div className="absolute inset-0 bg-brand-yellow/20 blur-[100px] rounded-full"></div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 relative z-10 transition duration-500 shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">Parceiros Oficiais</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm group hover:scale-[1.02] transition">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-brand-dark font-bold text-xs shrink-0">EMB</div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition">Educa Mais Brasil</h4>
                      <p className="text-xs text-gray-500">Bolsas parciais para todas as séries</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-gray-300" />
                  </div>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm group hover:scale-[1.02] transition">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">QB</div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition">Quero Bolsa</h4>
                      <p className="text-xs text-gray-500">Descontos garantidos até o fim do curso</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAE Section */}
      <section className="py-24 bg-brand-light/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
            <div className="flex-1 w-full relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition duration-500">
                    <Brain className="text-brand-light w-10 h-10 mb-4" />
                    <h3 className="font-bold text-gray-900">Neurodiversidade</h3>
                    <p className="text-sm text-gray-500 mt-2">Acolhimento especializado para TEA, TDAH e outros.</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition duration-500">
                    <HandHeart className="text-pink-400 w-10 h-10 mb-4" />
                    <h3 className="font-bold text-gray-900">Afetividade</h3>
                    <p className="text-sm text-gray-500 mt-2">Vínculos que fortalecem o aprendizado.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-brand-dark text-white p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition duration-500">
                    <Sparkles className="text-brand-yellow w-10 h-10 mb-4" />
                    <h3 className="font-bold text-white">Potencial Único</h3>
                    <p className="text-sm text-gray-300 mt-2">Desenvolvemos as habilidades de cada aluno.</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition duration-500">
                    <Users2 className="text-green-500 w-10 h-10 mb-4" />
                    <h3 className="font-bold text-gray-900">Parceria Família</h3>
                    <p className="text-sm text-gray-500 mt-2">Diálogo aberto e constante com os pais.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-sm uppercase tracking-wider mb-6">
                <Heart size={16} /> Inclusão de Verdade
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Um Olhar Especial para o <span className="text-brand-light">Seu Filho</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nosso Núcleo de Atendimento Especializado (NAE) não é apenas um departamento – é a garantia de que seu filho será visto, compreendido e estimulado em sua integralidade. Contamos com psicopedagogos e especialistas dedicados.
              </p>

              <Link to="/nucleo-atendimento-especializado" className="group inline-flex items-center gap-2 text-brand-dark font-black text-lg hover:text-brand-light transition">
                Conheça nossa equipe <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section (Supabase Integration) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Acontece no Sodré</h2>
              <p className="text-lg text-gray-600 font-medium">Fique por dentro das últimas novidades e eventos.</p>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-brand-dark font-black hover:underline group">
              Ver todos os artigos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestPosts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <img src={post.image} alt={post.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-brand-dark transition-colors">{post.titulo}</h3>
                  <div className="mt-auto flex flex-col gap-2 border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <Calendar size={14} className="text-brand-yellow" />
                      {new Date(post.created_at).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <Clock size={14} className="text-brand-yellow" />
                      {new Date(post.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
            {latestPosts.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-400 font-medium">Carregando novidades...</div>
            )}
          </div>
        </div>
      </section>

      {/* Contato CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Pronto para fazer parte da família Sodré?</h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Agende uma visita e venha conhecer de perto nossa estrutura, nossos professores e a energia que faz do Educandário Sodré um lugar único.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contato" className="w-full sm:w-auto px-10 py-5 bg-brand-yellow text-brand-dark font-black text-lg rounded-2xl hover:bg-yellow-400 hover:scale-105 transition transform shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2">
                  <Calendar size={20} /> Agendar Visita
                </Link>
                <a href={`https://wa.me/${COMPANY_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white font-bold text-lg rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition transform backdrop-blur-sm flex items-center justify-center gap-2">
                  <Phone size={20} /> Falar no WhatsApp
                </a>
              </div>

              <p className="mt-8 text-sm text-gray-400 font-medium">
                Estamos na {COMPANY_INFO.address}. Venha tomar um café conosco!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restante das seções (Scholarship, Map, etc) */}
    </>
  );
};

export default Home;
