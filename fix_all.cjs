const fs = require('fs');
let code = fs.readFileSync('pages/BlogAdmin.tsx', 'utf8');

const target1 = `<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Artigos Publicados</p>
                <p className="text-3xl font-black text-brand-dark">{posts.length}</p>
              </div>
              <div className="w-12 h-12 bg-brand-light/20 rounded-xl flex items-center justify-center text-brand-dark">
                <Newspaper size={24} />
              </div>
            </div>`;

const replacement1 = `<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Artigos Publicados</p>
                <p className="text-3xl font-black text-brand-dark">{posts.length}</p>
              </div>
              <div className="w-12 h-12 bg-brand-light/20 rounded-xl flex items-center justify-center text-brand-dark">
                <Newspaper size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Mensagens</p>
                <p className="text-3xl font-black text-brand-dark">{contactMessages.length}</p>
              </div>
              <div className="w-12 h-12 bg-brand-light/20 rounded-xl flex items-center justify-center text-brand-dark">
                <MessageSquare size={24} />
              </div>
            </div>`;

code = code.replace(target1, replacement1);

const target2 = `<div className="md:w-3/4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">{msg.message}</p>
                         </div>`;

const replacement2 = `<div className="md:w-3/4 bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
                            <p className="text-gray-700 text-sm font-medium leading-relaxed mb-4">{msg.message}</p>
                            {msg.phone && (
                              <div className="flex justify-end mt-2">
                                <a href={\`https://wa.me/55\${msg.phone.replace(/\\D/g, '')}?text=Olá \${msg.name.split(' ')[0]}, vi sua mensagem no site do Centro Educacional Sodré...\`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm">
                                  <MessageCircle size={16} /> Responder via WhatsApp
                                </a>
                              </div>
                            )}
                         </div>`;

code = code.replace(target2, replacement2);

fs.writeFileSync('pages/BlogAdmin.tsx', code, 'utf8');
console.log('Fixed BlogAdmin.tsx with node script cleanly');
