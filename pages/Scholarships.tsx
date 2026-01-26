import React from 'react';
import { CONTENT } from '../constants';
import { GraduationCap, CheckCircle2, Info, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Scholarships: React.FC = () => {
   const EDUCA_MAIS_URL = "https://www.educamaisbrasil.com.br/escolas/educandario-sodre-ssa/series";
   const QUERO_BOLSA_URL = "https://querobolsa.com.br/escolas/educandario-sodre?grade=fundamentalI_2&id=1207579&shift=Manh%C3%A3&year=2026";

   return (
      <div className="animate-in fade-in duration-500 pb-20">
         <SEO
            title="Bolsas e Parcerias"
            description={CONTENT.scholarships.text}
         />
         {/* Header */}
         <div className="bg-brand-dark text-white py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
               <div className="inline-flex items-center justify-center p-4 bg-brand-yellow/20 rounded-full mb-6">
                  <GraduationCap size={48} className="text-brand-yellow" />
               </div>
               <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                  {CONTENT.scholarships.title}
               </h1>
               <p className="text-lg md:text-xl text-brand-light max-w-2xl mx-auto leading-relaxed">
                  {CONTENT.scholarships.text}
               </p>
            </div>
         </div>

         <div className="container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12">
               {/* Educa Mais Brasil Section */}
               <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="bg-yellow-400 p-8 flex items-center justify-center">
                     <img
                        src="https://upload.wikimedia.org/wikipedia/pt/4/46/Educa_Mais_Brasil_Logo.png"
                        alt="Educa Mais Brasil"
                        className="h-20 object-contain brightness-0"
                        onError={(e) => {
                           (e.target as HTMLImageElement).style.display = 'none';
                        }}
                     />
                     <h2 className="text-3xl font-black text-brand-dark">Educa Mais Brasil</h2>
                  </div>
                  <div className="p-8 md:p-12 flex-grow">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" />
                        Parceria Estelar
                     </h3>
                     <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {CONTENT.scholarships.educaMais.description}
                     </p>

                     <div className="bg-brand-light/10 p-6 rounded-2xl border-l-4 border-brand-dark mb-8">
                        <h4 className="font-bold text-brand-dark mb-2 flex items-center gap-2">
                           <Info size={18} /> Como funciona?
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                           {CONTENT.scholarships.educaMais.howTo}
                        </p>
                     </div>

                     <ul className="space-y-3 mb-10">
                        {['Bolsas de até 50%', 'Válido para todo o ciclo', 'Renovação facilitada', 'Inscrição gratuita no programa'].map((benefit, i) => (
                           <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                              <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></div>
                              {benefit}
                           </li>
                        ))}
                     </ul>

                     <a
                        href={EDUCA_MAIS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition shadow-lg"
                     >
                        Consultar Bolsas no Educa Mais Brasil <ExternalLink size={18} />
                     </a>
                  </div>
               </div>

               {/* Quero Bolsa Section */}
               <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="bg-blue-600 p-8 flex items-center justify-center">
                     <h2 className="text-3xl font-black text-white">Quero Bolsa</h2>
                  </div>
                  <div className="p-8 md:p-12 flex-grow">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" />
                        Facilidade & Economia
                     </h3>
                     <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {CONTENT.scholarships.queroBolsa.description}
                     </p>

                     <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="p-4 bg-gray-50 rounded-2xl text-center">
                           <p className="text-2xl font-black text-brand-dark">50%</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Desconto Máximo</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl text-center">
                           <p className="text-2xl font-black text-brand-dark">Online</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contratação</p>
                        </div>
                     </div>

                     <a
                        href={QUERO_BOLSA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg"
                     >
                        Consultar no Quero Bolsa <ExternalLink size={18} />
                     </a>
                  </div>
               </div>
            </div>

            {/* CTA Bottom */}
            <div className="mt-20 max-w-4xl mx-auto bg-brand-light/20 p-8 md:p-12 rounded-[2.5rem] border border-brand-light/30 text-center">
               <h3 className="text-2xl font-bold text-brand-dark mb-4">Ainda tem dúvidas sobre as bolsas?</h3>
               <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Nossa secretaria está à disposição para explicar o processo de validação das bolsas e agendar sua visita.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contato" className="px-8 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition shadow-md">
                     Falar com a Secretaria
                  </Link>
                  <Link to="/" className="px-8 py-4 bg-white text-brand-dark font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                     Voltar para Home
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Scholarships;