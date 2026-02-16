# Centro Educacional Sodré

Este projeto é o site institucional e portal do aluno do Educandário Sodré.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- Conta no Supabase (para banco de dados)

### Instalação
1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz do projeto com suas credenciais do Supabase:
    ```env
    VITE_SUPABASE_URL=sua_url_do_projeto
    VITE_SUPABASE_ANON_KEY=sua_chave_anonima
    ```
4.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    O site estará disponível em `http://localhost:5173`.

## 🗄️ Banco de Dados (Supabase)

O projeto utiliza o **Supabase** como backend. O esquema completo do banco está no arquivo `complete_database.sql`.

Para configurar:
1.  Crie um projeto no [Supabase](https://supabase.com).
2.  Vá em **SQL Editor**.
3.  Copie o conteúdo de `complete_database.sql` e execute.

### Funcionalidades do Banco
- **Perfis**: Diferenciação automática entre Admin, Blog Admin, Pais e Alunos.
- **Mensagens**: Comunicação entre Escola e Responsáveis.
- **NAE**: Sistema de orientações pedagógicas.
- **Blog**: Sistema de notícias.

## 📦 Deploy

Este projeto pode ser hospedado facilmente na **Vercel** ou **Netlify**.
Basta conectar seu repositório do GitHub e configurar as variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) no painel de deploy.

## ✨ Tecnologias

- React + TypeScript + Vite
- Tailwind CSS
- Lucide React (Ícones)
- Supabase (Auth + Database + Storage)
