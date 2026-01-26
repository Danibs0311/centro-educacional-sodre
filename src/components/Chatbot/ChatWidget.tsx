import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useChatBot } from '../../hooks/useChatBot';

const ChatWidget: React.FC = () => {
    const { isOpen, toggleChat, messages, isTyping, processMessage, messagesEndRef } = useChatBot();
    const [inputText, setInputText] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        processMessage(inputText);
        setInputText('');
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none">
            {/* Botão Flutuante (sempre visível) */}
            <button
                onClick={toggleChat}
                className={`pointer-events-auto bg-brand-dark text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border-2 border-brand-yellow ${isOpen ? 'opacity-0 scale-0 hidden' : 'opacity-100 scale-100 animate-bounce-slow'}`}
                aria-label="Abrir Chat Inteligente"
            >
                <Bot size={24} />
            </button>

            {/* Janela do Chat (aparece quando isOpen) */}
            <div
                className={`pointer-events-auto w-[80vw] md:w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100 translate-y-0 translate-x-0' : 'scale-0 opacity-0 translate-y-10 translate-x-10 h-0 w-0'}`}
            >
                {/* Header */}
                <div className="bg-brand-dark p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center text-brand-dark">
                            <Bot size={18} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm leading-none">Sodré IA</h3>
                            <span className="text-brand-light text-[10px] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    {/* Botão de Fechar */}
                    <button
                        onClick={toggleChat}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                        aria-label="Minimizar chat"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="h-64 overflow-y-auto p-3 bg-gray-50 space-y-3 scrollbar-thin">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-sm ${msg.sender === 'user'
                                    ? 'bg-brand-dark text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}
                            >
                                {msg.text}
                                <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-100 p-2.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center h-8">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-gray-100 flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Digite sua dúvida..."
                        className="flex-1 bg-gray-100 text-gray-800 px-3 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-light text-xs"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="w-8 h-8 bg-brand-yellow text-brand-dark rounded-full flex items-center justify-center hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWidget;
