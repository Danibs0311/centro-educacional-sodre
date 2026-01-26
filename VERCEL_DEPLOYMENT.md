# Guia de Implantação no Vercel

Este guia descreve passo a passo como realizar a implantação (deploy) do projeto **Centro Educacional Sodré** na plataforma Vercel.

## Pré-requisitos

1.  Uma conta no [Vercel](https://vercel.com/signup).
2.  O código do projeto enviado para um repositório Git (GitHub, GitLab ou Bitbucket).

## Passos para Implantação

### 1. Conectar ao Vercel

1.  Acesse o [Dashboard do Vercel](https://vercel.com/dashboard).
2.  Clique em **"Add New..."** e selecione **"Project"**.
3.  Importe o repositório Git onde o código está hospedado.

### 2. Configurar o Projeto

O Vercel deve detectar automaticamente que este é um projeto **Vite**. As configurações padrão geralmente funcionam, mas verifique:

*   **Framework Preset:** Vite
*   **Root Directory:** `./` (ou deixe em branco se for a raiz)
*   **Build Command:** `vite build` (ou `npm run build`)
*   **Output Directory:** `dist`

### 3. Configurar Variáveis de Ambiente (Environment Variables)

**IMPORTANTE:** Para que a integração com o Supabase funcione, você PRECISA adicionar as variáveis de ambiente no Vercel.

Na seção **Environment Variables** (durante a criação ou nas configurações do projeto), adicione:

| Chave (Key) | Valor (Value) | Origem |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | (Copie do seu .env) | `.env` |
| `VITE_SUPABASE_ANON_KEY` | (Copie do seu .env) | `.env` |
| `GEMINI_API_KEY` | (Copie do seu .env se houver) | `.env` (Opcional) |

### 4. Deploy

1.  Clique em **"Deploy"**.
2.  Aguarde o processo de build.

## Configuração Extra (Routing)

Se você encontrar erros 404 ao atualizar páginas (exceto a home), pode ser necessário adicionar um arquivo `vercel.json` na raiz do projeto com o seguinte conteúdo:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Isso garante que o React Router controle as rotas corretamente.
