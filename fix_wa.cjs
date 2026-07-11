const fs = require('fs');
let code = fs.readFileSync('pages/BlogAdmin.tsx', 'utf8');

const brokenStr = "href={https://wa.me/55 + msg.phone.replace(/\\D/g, '') + ?text=Olá , vi sua mensagem no site do Centro Educacional Sodré...}";
const fixedStr = "href={`https://wa.me/55${msg.phone.replace(/\\D/g, '')}?text=Olá ${msg.name.split(' ')[0]}, vi sua mensagem no site do Centro Educacional Sodré...`}";

// Because of weird encoding with the 'á' and 'é', we'll just replace the line entirely.
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('wa.me/55')) {
    lines[i] = "                                  <a href={`https://wa.me/55${msg.phone.replace(/\\D/g, '')}?text=Olá ${msg.name.split(' ')[0]}, vi sua mensagem no site do Centro Educacional Sodré...`} target=\"_blank\" rel=\"noreferrer\" className=\"inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm\">";
  }
}
fs.writeFileSync('pages/BlogAdmin.tsx', lines.join('\n'));
console.log('Fixed WhatsApp link');
