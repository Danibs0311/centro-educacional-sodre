import React from 'react';
import { CONTENT } from '../constants';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

interface EducationPageProps {
  type: 'infantil' | 'fund1' | 'fund2' | 'medio';
  imageHash: number;
}

const Education: React.FC<EducationPageProps> = ({ type, imageHash }) => {
  const content = CONTENT[type];

  // Map type to a badge color/label
  const badgeInfo = {
    infantil: { text: 'Educação Infantil', color: 'bg-pink-100 text-pink-700' },
    fund1: { text: 'Fundamental I', color: 'bg-blue-100 text-blue-700' },
    fund2: { text: 'Fundamental II', color: 'bg-indigo-100 text-indigo-700' },
    medio: { text: 'Ensino Médio', color: 'bg-purple-100 text-purple-700' },
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <SEO
        title={badgeInfo[type].text}
        description={content.text.slice(0, 160) + "..."}
      />
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={
            type === 'infantil' ? "/images/educacaoinfantil.jpg" :
              type === 'fund1' ? "/images/ensinofundamental1.avif" :
                type === 'fund2' ? "/images/fundamental2.avif" :
                  type === 'medio' ? "/images/medio.webp" :
                    `https://picsum.photos/1200/600?random=${imageHash}`
          }
          alt={badgeInfo[type].text}
          className={`w-full h-full object-cover brightness-50 ${type === 'medio' ? 'blur-md' : ''}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold shadow-sm">{badgeInfo[type].text}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${badgeInfo[type].color}`}>
              {badgeInfo[type].text}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line mb-8">
              {content.text}
            </p>

            <div className="bg-gray-50 border-l-4 border-secondary-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-gray-900 mb-2">Diferenciais do Ciclo:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <ArrowRight size={18} className="mt-1 text-secondary-500" />
                  Material didático atualizado
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ArrowRight size={18} className="mt-1 text-secondary-500" />
                  Projetos interdisciplinares
                </li>
                {type !== 'medio' && (
                  <li className="flex items-start gap-2 text-gray-700">
                    <ArrowRight size={18} className="mt-1 text-secondary-500" />
                    Acompanhamento do NAE
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;