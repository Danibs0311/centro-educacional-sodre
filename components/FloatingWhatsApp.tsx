import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
    >
      <MessageCircle size={32} />
    </button>
  );
};

export default FloatingWhatsApp;