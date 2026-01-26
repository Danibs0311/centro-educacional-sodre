import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants';
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Award, BookOpen, HeartPulse } from 'lucide-react';
import SEO from '../components/SEO';

const ProfessionalDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const professional = TEAM_MEMBERS.find(m => m.slug === slug);

  if (!professional) {
    return <Navigate to="/nucleo-atendimento-especializado" replace />;
  }

  const isLeia = professional.nome === "Léia Neves Gomes";

  return (
    <div className="animate-in fade-in duration-500 bg-gray-50 pb-20">
      <SEO
        title={`${professional.nome} | NAE`}
        description={professional.bio}
        image={professional.image}
      />
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/nucleo-atendimento-especializado"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark font-bold mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
        >
          <ArrowLeft size={18} /> Voltar ao NAE
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Visual Column */}
            <div className="md:w-5/12 relative min-h-[400px]">
              <img
                src={professional.image}
                alt={professional.nome}
                className={`w-full h-full object-cover ${isLeia ? 'object-top' : 'object-center'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent md:hidden"></div>
              <div className="absolute bottom-6 left-6 text-white md:hidden">
                <h1 className="text-3xl font-black tracking-tight">{professional.nome}</h1>
                <p className="text-brand-yellow font-bold uppercase tracking-widest text-xs">{professional.cargo}</p>
              </div>

              {/* Badge for desktop */}
              <div className="hidden md:flex absolute top-6 left-6 gap-2">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-lg border border-white flex items-center gap-2 text-brand-dark font-black text-xs uppercase">
                  <Award size={16} /> Especialista
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:w-7/12 p-8 lg:p-16 flex flex-col">
              <div className="hidden md:block mb-8">
                <span className="text-brand-light font-black uppercase tracking-[0.2em] text-xs">
                  Equipe NAE Sodré
                </span>
                <h1 className="text-4xl lg:text-5xl font-black text-brand-dark mt-2 tracking-tighter">
                  {professional.nome}
                </h1>
                <p className="text-gray-400 font-bold text-lg mt-1">{professional.cargo}</p>
              </div>

              <div className="relative mb-10">
                <Quote className="absolute -top-6 -left-6 text-brand-yellow/10" size={64} />
                <p className="text-gray-700 leading-relaxed text-lg italic relative z-10 pl-4 border-l-4 border-brand-yellow/40">
                  {professional.bio}
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black text-brand-dark mb-6 flex items-center gap-3">
                    <HeartPulse className="text-brand-yellow" size={24} />
                    Abordagens da Área
                  </h3>
                  <div className="grid gap-3">
                    {professional.abordagens.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-light/30 transition-colors group">
                        <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={20} />
                        <span className="text-gray-700 font-medium leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-brand-dark">
                      <BookOpen size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Apoio Pedagógico</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                      <HeartPulse size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Acolhimento NAE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action - Enhanced prominence */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="bg-gradient-to-br from-brand-dark to-[#4a69a2] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            {/* Decorative background elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl group-hover:bg-brand-yellow/20 transition-colors duration-500"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-4 bg-brand-yellow/20 rounded-2xl mb-6 backdrop-blur-sm border border-brand-yellow/30">
                <HeartPulse className="text-brand-yellow" size={40} />
              </div>
              <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Agende uma conversa com nossa equipe</h3>
              <p className="text-brand-light text-lg md:text-xl mb-10 max-w-xl mx-auto font-medium leading-relaxed opacity-90">
                Deseja entender como o NAE pode apoiar o desenvolvimento do seu filho? Nossa equipe de especialistas está pronta para acolher sua família e traçar o melhor caminho pedagógico.
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-4 px-12 py-6 bg-brand-yellow text-brand-dark font-black text-xl md:text-2xl rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/40 transform active:scale-95"
              >
                Solicitar Atendimento Agora <ArrowRight size={28} />
              </Link>
              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="h-1 w-20 bg-brand-yellow/50 rounded-full"></div>
                <p className="text-xs text-brand-light/70 font-bold uppercase tracking-[0.2em]">
                  Compromisso com a Inclusão e o Acolhimento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetail;