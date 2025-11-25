# Prime Life - Painel Administrativo

Sistema de gerenciamento de clientes e dependentes para a empresa Prime Life.

## Funcionalidades

- ✅ Autenticação segura com credenciais protegidas
- ✅ Dashboard com métricas em tempo real
- ✅ Gerenciamento de clientes e dependentes
- ✅ Download de carteirinhas em PDF
- ✅ Faturamento mensal automatizado
- ✅ Integração com Supabase
- ✅ Webhook para sincronização automática com Quiz Cacto
- ✅ Sincronização em tempo real com Supabase Realtime

## Credenciais de Acesso

**Usuário**: `admin`  
**Senha**: `aminprime7`

⚠️ **IMPORTANTE**: Altere estas credenciais após o primeiro acesso em produção!

## Requisitos

- Node.js 18+
- npm ou yarn
- Conta Supabase configurada

## Instalação Local

\`\`\`bash
# 1. Clone o repositório
git clone <seu-repo>
cd prime-life-admin

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 4. Execute em desenvolvimento
npm run dev

# 5. Acesse em http://localhost:3000
\`\`\`

## Variáveis de Ambiente

Crie um arquivo `.env.local` com:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
\`\`\`

## Deploy no Vercel

### Passo 1: Preparar Repositório

\`\`\`bash
# Faça commit de todas as alterações
git add .
git commit -m "Inicial commit"
git push origin main
\`\`\`

### Passo 2: Conectar ao Vercel

1. Acesse https://vercel.com/new
2. Selecione "Import Git Repository"
3. Conecte sua conta GitHub
4. Selecione este repositório

### Passo 3: Configurar Variáveis de Ambiente

No dashboard do Vercel, vá para "Settings" > "Environment Variables" e adicione:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
\`\`\`

### Passo 4: Deploy

Clique em "Deploy" e aguarde a conclusão.

## Webhook Cacto

Configure o webhook em seu Quiz Cacto para enviar para:

\`\`\`
https://seu-dominio.vercel.app/api/cakto-webhook
\`\`\`

Com os seguintes campos:
- `method`: POST
- `authorization`: Bearer Token (opcional, adicionar segurança)

## Estrutura do Projeto

\`\`\`
prime-life-admin/
├── app/
│   ├── api/
│   │   └── cakto-webhook/   # Endpoint para webhook
│   ├── login/               # Página de login
│   ├── page.tsx             # Dashboard principal
│   ├── layout.tsx           # Layout geral
│   └── globals.css          # Estilos globais
├── components/              # Componentes React
├── hooks/                   # Custom hooks
├── lib/                     # Utilitários
├── public/                  # Arquivos estáticos
├── middleware.ts            # Middleware de autenticação
└── package.json
\`\`\`

## Scripts Disponíveis

\`\`\`bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Faz build para produção
npm start        # Inicia servidor de produção
npm run lint     # Executa linter
\`\`\`

## Suporte

Para problemas ou dúvidas, abra uma issue no repositório ou entre em contato com o suporte Prime Life.

---

**Versão**: 1.0.0  
**Última atualização**: 2025-01-24
\`\`\`

```md file="" isHidden
