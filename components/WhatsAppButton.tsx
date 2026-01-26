import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const WhatsAppButton: React.FC = () => {
    return (
        <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-slow"
            aria-label="Falar no WhatsApp"
        >
            <MessageCircle size={32} fill="white" />
        </a>
    );
};

export default WhatsAppButton;
