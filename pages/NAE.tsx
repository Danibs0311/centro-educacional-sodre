import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, HandHeart, Sparkles, UserCircle, ChevronRight, Users2 } from 'lucide-react';
import { CONTENT, TEAM_MEMBERS } from '../constants';
import SEO from '../components/SEO';

const NAE: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <SEO
        title="Núcleo de Atendimento Especializado"
        description={CONTENT.nae.title}
      />
      {/* Header */}
      <div className="bg-brand-light/10 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-brand-dark font-bold tracking-widest uppercase text-xs px-4 py-1.5 bg-brand-yellow/30 rounded-full mb-6 inline-block">
            Inclusão & Apoio Especializado
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 tracking-tight">
            {CONTENT.nae.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            O NAE é o coração acolhedor do Sodré, unindo ciência e afeto para garantir que cada aluno brilhe em seu próprio tempo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Brain, title: "Neurodiversidade", text: "Acolhemos alunos com TEA, TDAH e Dislexia com protocolos específicos.", color: "bg-blue-50 text-brand-dark" },
            { icon: HandHeart, title: "Afetividade", text: "Entendemos que o aprendizado seguro passa pelo vínculo emocional.", color: "bg-brand-yellow/10 text-brand-dark" },
            { icon: Sparkles, title: "Autonomia", text: "Focamos em habilidades que preparam para a vida dentro e fora da escola.", color: "bg-teal-50 text-teal-700" },
          ].map((pillar, i) => (
            <div key={i} className={`${pillar.color} p-8 rounded-3xl border border-white shadow-sm flex flex-col items-center text-center`}>
              <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
                <pillar.icon size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>

        {/* Reorganized Team Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-brand-light font-bold text-sm uppercase tracking-widest mb-2">
                <Users2 size={20} /> Equipe Multidisciplinar
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-brand-dark">Conheça Nossos Especialistas</h2>
              <p className="text-gray-600 mt-4">
                Clique em cada área para conhecer a profissional responsável e entender as abordagens técnicas utilizadas no acompanhamento do seu filho.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <Link
                key={member.slug}
                to={`/equipe/${member.slug}`}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col transform hover:-translate-y-2"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-black bg-brand-yellow text-brand-dark px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {member.cargo.split(' ')[0]}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-dark transition-colors">{member.cargo}</h3>
                  <p className="text-sm text-brand-light font-medium mb-4">{member.nome}</p>

                  <div className="mt-auto flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-brand-dark">
                    <span>Ver Abordagens</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Informational Banner */}
        <div className="bg-brand-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Inclusão que transforma</h3>
              <p className="text-brand-light/80 leading-relaxed">
                Nossa escola não apenas recebe o aluno, ela se adapta a ele. O NAE trabalha em conjunto com os professores de sala para realizar as adaptações necessárias em tempo real.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-sm">Escuta Sensível</span>
              <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-sm">Mediação Escolar</span>
              <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-sm">PDI (Plano de Desenv. Individual)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NAE;