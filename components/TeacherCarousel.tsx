import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

const TEACHERS_FUND1 = [
  {
    id: 1,
    name: 'Prof. João Silva',
    subject: 'Matemática',
    education: 'Licenciatura em Matemática (UFBA)',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Profa. Maria Oliveira',
    subject: 'Língua Portuguesa',
    education: 'Letras Vernáculas (UNEB)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Prof. Carlos Santos',
    subject: 'Ciências',
    education: 'Ciências Biológicas (UFBA)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Profa. Ana Costa',
    subject: 'História e Geografia',
    education: 'Pedagogia (UCSAL)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Prof. Pedro Almeida',
    subject: 'Educação Física',
    education: 'Educação Física (UFBA)',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Profa. Luiza Souza',
    subject: 'Artes',
    education: 'Artes Visuais (EBA-UFBA)',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
];

const TEACHERS_INFANTIL = [
  {
    id: 1,
    name: 'Profa. Juliana Mendes',
    subject: 'Desenvolvimento Infantil',
    education: 'Pedagogia (UFBA)',
    image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Profa. Fernanda Lima',
    subject: 'Recreação e Artes',
    education: 'Pedagogia com foco em Artes',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Prof. Marcos Rocha',
    subject: 'Musicalização Infantil',
    education: 'Licenciatura em Música (UFBA)',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  }
];

interface TeacherCarouselProps {
  segment: 'infantil' | 'fund1';
}

const TeacherCarousel: React.FC<TeacherCarouselProps> = ({ segment }) => {
  const teachers = segment === 'infantil' ? TEACHERS_INFANTIL : TEACHERS_FUND1;
  
  // Duplicating the array to create a seamless infinite loop effect.
  // For infantil (3 cards), we repeat it 4 times so the screen is always full
  // For fund1 (6 cards), repeating it 2 times is enough.
  const repeatedTeachers = segment === 'infantil' 
    ? [...teachers, ...teachers, ...teachers, ...teachers]
    : [...teachers, ...teachers];

  return (
    <div className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Conheça Nossos Professores</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Uma equipe de excelência, apaixonada por ensinar e dedicada a construir a melhor base para o futuro do seu filho.
        </p>
      </div>

      {/* The Carousel Wrapper */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Gradients to fade edges for a polished look */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Moving track */}
        <div className="flex animate-marquee group-hover:pause gap-6 px-4">
          {repeatedTeachers.map((teacher, index) => (
            <div 
              key={`${teacher.id}-${index}`} 
              className="flex-none w-72 md:w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">{teacher.name}</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-primary-600">
                    <BookOpen size={18} className="mt-1 flex-shrink-0" />
                    <span className="text-sm font-medium">{teacher.subject}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <GraduationCap size={18} className="mt-1 flex-shrink-0" />
                    <span className="text-sm">{teacher.education}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCarousel;
