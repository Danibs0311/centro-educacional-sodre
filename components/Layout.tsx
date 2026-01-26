
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, MapPin, Phone, Sun, ArrowLeft, GraduationCap, ChevronDown, Lock, ExternalLink } from 'lucide-react';
import { NAV_ITEMS, COMPANY_INFO } from '../constants';
import FloatingWhatsApp from './FloatingWhatsApp';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const location = useLocation();
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Fecha o menu mobile e submenus ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubMenu(null);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenSubMenu(null);
  };

  // Lógica de clique para Mobile
  const handleMobileSubMenuToggle = (label: string) => {
    setOpenSubMenu(current => current === label ? null : label);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center">
               <Sun size={48} className="text-brand-yellow fill-brand-yellow drop-shadow-md" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-brand-dark font-extrabold text-lg md:text-xl tracking-wide">
                EDUCANDÁRIO
              </span>
              <span className="text-brand-light font-black text-2xl md:text-3xl tracking-wider drop-shadow-sm" style={{ WebkitTextStroke: '0.5px #ffe600' }}>
                SODRÉ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.label} 
                className="relative h-24 flex items-center"
                onMouseEnter={() => item.subItems && setOpenSubMenu(item.label)}
                onMouseLeave={() => item.subItems && setOpenSubMenu(null)}
              >
                {item.subItems ? (
                  <>
                    <button 
                      className={`font-bold py-2 flex items-center gap-1 transition-all duration-300 outline-none ${
                        openSubMenu === item.label ? 'text-brand-dark' : 'text-gray-700 hover:text-brand-dark'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform duration-300 ${openSubMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Submenu Desktop (Hover) */}
                    {openSubMenu === item.label && (
                      <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-2xl rounded-b-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 z-[60]">
                        <div className="py-2">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className="block px-6 py-4 hover:bg-brand-light/10 text-gray-700 hover:text-brand-dark text-sm font-bold transition-colors border-b border-gray-50 last:border-0"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-bold py-2 transition-colors ${
                      location.pathname === item.path ? 'text-brand-dark' : 'text-gray-700 hover:text-brand-dark'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="flex items-center gap-3 ml-4">
              <Link to="/contato" className="px-5 py-2.5 bg-brand-yellow text-brand-dark rounded-full hover:bg-yellow-400 transition font-black text-xs uppercase tracking-tighter whitespace-nowrap shadow-md hover:shadow-lg">
                Matrículas Abertas
              </Link>
              <Link to="/login" className="px-5 py-2.5 bg-brand-light text-brand-dark rounded-full hover:bg-blue-300 transition font-black text-xs uppercase tracking-tighter whitespace-nowrap shadow-md hover:shadow-lg flex items-center gap-2">
                <GraduationCap size={16} /> Portal do Aluno
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-brand-dark transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div 
            ref={mobileNavRef}
            className="lg:hidden absolute top-24 left-0 w-full bg-white border-b border-gray-200 shadow-2xl py-6 px-4 flex flex-col gap-2 z-50 overflow-y-auto max-h-[calc(100vh-6rem)] animate-in slide-in-from-top duration-300"
          >
            {/* Mobile Top CTA (Destaque Principal) */}
            <Link 
              to="/contato" 
              className="w-full text-center px-4 py-4 bg-brand-yellow text-brand-dark rounded-xl font-black shadow-md uppercase tracking-tighter text-lg mb-4 flex items-center justify-center gap-2"
            >
              Matrículas Abertas
            </Link>

            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col border-b border-gray-50 last:border-0">
                {item.subItems ? (
                  <>
                    <button 
                      onClick={() => handleMobileSubMenuToggle(item.label)}
                      className={`flex items-center justify-between w-full text-left font-black py-4 text-lg transition-colors ${openSubMenu === item.label ? 'text-brand-dark' : 'text-gray-800'}`}
                    >
                      {item.label}
                      <ChevronDown size={24} className={`transition-transform duration-300 ${openSubMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openSubMenu === item.label && (
                      <div className="pl-6 flex flex-col gap-1 pb-4 animate-in fade-in slide-in-from-top-1 duration-300">
                        {item.subItems.map(sub => (
                          <Link 
                            key={sub.path} 
                            to={sub.path} 
                            className="text-gray-600 hover:text-brand-dark py-3 font-bold text-base border-l-2 border-brand-yellow/30 pl-4 transition-all"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-lg font-black py-4 ${location.pathname === item.path ? 'text-brand-dark' : 'text-gray-800'}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Bottom CTA (Portal embaixo) */}
            <Link 
              to="/login" 
              className="mt-6 w-full text-center px-4 py-4 bg-brand-light text-brand-dark rounded-xl font-black shadow-md uppercase tracking-tighter text-lg flex items-center justify-center gap-2 border-2 border-white"
            >
              <GraduationCap size={22} /> Portal do Aluno
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {location.pathname !== '/' && (
          <div className="container mx-auto px-4 pt-6 pb-2">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-dark font-bold transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
            >
              <ArrowLeft size={18} /> Voltar para Home
            </Link>
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-gray-300 py-12 mt-auto">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
               <Sun size={24} className="text-brand-yellow fill-brand-yellow" />
               Educandário Sodré
            </h3>
            <p className="text-sm leading-relaxed mb-4 text-gray-200">
              "Qualidade de ensino e formação do caráter". <br/>
              Referência em educação em Salvador.
            </p>
            <div className="flex gap-4">
              <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition"><Instagram size={24} /></a>
              <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition"><Facebook size={24} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 border-b border-brand-light/30 inline-block pb-1 uppercase tracking-tighter text-sm">Nossos Segmentos</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/educacao-infantil" className="hover:text-brand-yellow transition">Educação Infantil</Link></li>
              <li><Link to="/ensino-fundamental-1" className="hover:text-brand-yellow transition">Ensino Fundamental I</Link></li>
              <li><Link to="/ensino-fundamental-2" className="hover:text-brand-yellow transition">Ensino Fundamental II</Link></li>
              <li><Link to="/ensino-medio" className="hover:text-brand-yellow transition">Ensino Médio</Link></li>
              <li><Link to="/nucleo-atendimento-especializado" className="hover:text-brand-yellow transition font-bold text-brand-light">Inclusão & NAE</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 border-b border-brand-light/30 inline-block pb-1 uppercase tracking-tighter text-sm">Canais de Acesso</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="text-brand-yellow shrink-0" size={18} />
                <a href={COMPANY_INFO.googleMapsLink} target="_blank" rel="noreferrer" className="hover:text-white transition">
                  {COMPANY_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="text-brand-yellow shrink-0" size={18} />
                <span className="font-bold">{COMPANY_INFO.phone}</span>
              </li>
              <li className="pt-2 flex flex-col gap-3">
                <Link to="/contato" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark px-6 py-3 rounded-xl hover:bg-white transition font-black text-xs uppercase tracking-tight shadow-lg">
                  Agendar Visita <ExternalLink size={14} />
                </Link>
                {/* Portal Destaque Embaixo no Rodapé */}
                <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-brand-light text-brand-dark px-6 py-3 rounded-xl hover:bg-blue-300 transition font-black text-xs uppercase tracking-tight shadow-lg">
                  <GraduationCap size={16} /> Área do Aluno
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar with Admin Link */}
        <div className="border-t border-white/10 mt-12 pt-8 container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Educandário Sodré.</p>
          <div className="flex items-center gap-6">
            <Link to="/blog-login" className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors group">
              <Lock size={12} className="group-hover:scale-110 transition-transform" /> 
              Acesso Administrativo
            </Link>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
