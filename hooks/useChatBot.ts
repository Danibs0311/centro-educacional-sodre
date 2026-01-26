import { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO, CONTENT } from '../constants';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
    id: 'init-1',
    text: "Olá! Sou a Sodré IA 🤖\nPosso te ajudar com dúvidas sobre matrículas, horários, localização ou ensino. O que gostaria de saber?",
    sender: 'bot',
    timestamp: new Date()
};

export const useChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const processMessage = async (text: string) => {
        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const responseText = generateResponse(text.toLowerCase());
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (input: string): string => {
        if (input.includes('matrícula') || input.includes('valor') || input.includes('preço') || input.includes('quanto custa')) {
            return "As matrículas para 2026 estão abertas! \n\nTemos condições especiais e parcerias com programas de bolsas (até 50% de desconto). \n\nPara valores exatos da série do seu filho, recomendo falar direto com nossa secretaria pelo WhatsApp ou agendar uma visita.";
        }
        if (input.includes('endereço') || input.includes('onde fica') || input.includes('local')) {
            return `Estamos localizados na ${COMPANY_INFO.address}. \n\nÉ bem fácil de chegar!`;
        }
        if (input.includes('telefone') || input.includes('zap') || input.includes('contato') || input.includes('whatsapp')) {
            return `Nosso contato principal é: ${COMPANY_INFO.whatsapp}. \n\nSe preferir ligar, o número é ${COMPANY_INFO.phone}.`;
        }
        if (input.includes('horário') || input.includes('funcionamento') || input.includes('abre')) {
            return "A secretaria funciona de Segunda a Sexta, das 07h às 17h.";
        }
        if (input.includes('bolsa') || input.includes('bolsas') || input.includes('desconto')) {
            return "Sim! Aceitamos bolsas do Educa Mais Brasil e Quero Bolsa. Você pode garantir até 50% de desconto nas mensalidades.";
        }
        if (input.includes('ensino médio') || input.includes('médio')) {
            return "Nosso Ensino Médio tem foco total no ENEM e Vestibulares, com material atualizado e simulados constantes.";
        }
        if (input.includes('infantil') || input.includes('creche')) {
            return "Na Educação Infantil, focamos no desenvolvimento lúdico, motor e social da criança, com muito acolhimento e segurança.";
        }
        if (input.includes('obrigado') || input.includes('valeu')) {
            return "Por nada! Estou sempre por aqui. 💙";
        }

        return "Desculpe, ainda estou aprendendo e não entendi sua dúvida. 😅\n\nMas você pode tentar perguntar sobre 'matrículas', 'horários' ou 'endereço', ou clicar no botão do WhatsApp para falar com um humano.";
    };

    return {
        isOpen,
        toggleChat,
        messages,
        isTyping,
        processMessage,
        messagesEndRef
    };
};
