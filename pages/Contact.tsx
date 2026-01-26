import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { CONTENT, COMPANY_INFO } from '../constants';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Matrícula / Bolsas',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            interest: formData.interest,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', phone: '', interest: 'Matrícula / Bolsas', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-16 bg-white">
      <SEO
        title="Fale Conosco"
        description={CONTENT.contato.text}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{CONTENT.contato.title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{CONTENT.contato.text}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Contact Info */}
          <div className="bg-primary-50 p-8 rounded-2xl h-full">
            <h3 className="text-2xl font-bold text-primary-900 mb-6">Canais de Atendimento</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-primary-600 group-hover:scale-110 transition">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Telefone</h4>
                  <p className="text-gray-600 text-lg">{COMPANY_INFO.phone}</p>
                  <p className="text-xs text-gray-500">Atendimento Secretaria</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-green-600 group-hover:scale-110 transition">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                  <p className="text-gray-600">Clique no botão flutuante</p>
                  <p className="text-xs text-gray-500">Para dúvidas rápidas</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-primary-600 group-hover:scale-110 transition">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Endereço</h4>
                  <p className="text-gray-600">{COMPANY_INFO.address}</p>
                  <p className="text-sm text-gray-500 mt-1">Águas Claras, Salvador - BA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-primary-600 group-hover:scale-110 transition">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Horário de Funcionamento</h4>
                  <p className="text-gray-600">Segunda a Sexta</p>
                  <p className="text-lg font-medium text-primary-800">07:00 às 17:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-white p-3 rounded-full shadow-sm text-primary-600 group-hover:scale-110 transition">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">E-mail</h4>
                  <p className="text-gray-600">contato@educandariosodre.com.br</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5 bg-white p-8 border border-gray-100 rounded-2xl shadow-xl" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Envie uma mensagem</h3>

            {status === 'success' && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2 border border-green-100 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 size={20} />
                <span>Mensagem enviada com sucesso! Entraremos em contato.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                <span>Erro ao enviar. Tente novamente ou nos chame no WhatsApp.</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome do Responsável</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-gray-50"
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Telefone / Zap</label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-gray-50"
                  placeholder="(71) 99999-9999"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Interesse</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-gray-50"
              >
                <option>Matrícula / Bolsas</option>
                <option>Educação Infantil</option>
                <option>Ensino Fundamental</option>
                <option>Ensino Médio</option>
                <option>Secretaria / Documentos</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mensagem</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-gray-50"
                placeholder="Olá, gostaria de saber mais sobre..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary-500 text-white font-bold py-4 rounded-lg hover:bg-secondary-600 transition shadow-md transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Enviando...' : <><Send size={20} /> Enviar Mensagem</>}
            </button>
          </form>
        </div>

        {/* Map Full Width */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.629339371725!2d-38.4552097!3d-12.9315277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716107386000001%3A0x0!2sEstr.%20do%20Matadouro%2C%20Salvador%20-%20BA!5e0!3m2!1spt-BR!2sbr!4v1709228492859!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Educandário Sodré"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;