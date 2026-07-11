const fs = require('fs');
let code = fs.readFileSync('pages/BlogAdmin.tsx'); // read raw buffer
let codeStr = code.toString('utf8'); // Assuming utf8 decodes most of it, but the bad chars are probably replacement chars

// Let's just find the bad line by index
const lines = codeStr.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('href={https://wa.me/55 + msg.phone.replace(/\\D/g, \'\')')) {
    lines[i] = "                                  <a href={`https://wa.me/55${msg.phone.replace(/\\D/g, '')}?text=Olá ${msg.name.split(' ')[0]}, vi sua mensagem no site do Centro Educacional Sodré...`} target=\"_blank\" rel=\"noreferrer\" className=\"inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm\">";
    // Also remove the next 3 lines since we combined them into one
    lines[i+1] = "";
    lines[i+2] = "";
    lines[i+3] = "";
  }
}
fs.writeFileSync('pages/BlogAdmin.tsx', lines.join('\n'), 'utf8');
