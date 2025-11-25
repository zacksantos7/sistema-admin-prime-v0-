# Guia de Deploy - Prime Life Admin

Este documento descreve passo a passo como fazer deploy da aplicação Prime Life Admin no Vercel.

## Pré-requisitos

- Conta GitHub com repositório criado
- Conta Vercel (gratuita em vercel.com)
- Credenciais do Supabase configuradas

## Passo 1: Preparar o Repositório GitHub

### 1.1 Criar repositório no GitHub

\`\`\`bash
# Acesse github.com e crie um novo repositório
# Nome recomendado: prime-life-admin
# Selecione: Private (para segurança)
\`\`\`

### 1.2 Clonar e fazer push

\`\`\`bash
# Clone o repositório vazio
git clone https://github.com/seu-usuario/prime-life-admin.git
cd prime-life-admin

# Copie todos os arquivos do projeto para esta pasta
# (Delete .git antes se necessário)

# Configure git
git config user.email "seu-email@example.com"
git config user.name "Seu Nome"

# Faça o primeiro commit
git add .
git commit -m "Initial commit - Prime Life Admin"

# Faça push
git branch -M main
git push -u origin main
\`\`\`

## Passo 2: Conectar Vercel ao GitHub

### 2.1 Acesse Vercel

1. Acesse https://vercel.com
2. Clique em "Log in" e selecione "Continue with GitHub"
3. Autentique-se com suas credenciais GitHub

### 2.2 Criar novo projeto

1. Clique em "Add New..." > "Project"
2. Selecione "Import Git Repository"
3. Procure por `prime-life-admin` e clique em "Import"

## Passo 3: Configurar Variáveis de Ambiente

### 3.1 No Vercel Dashboard

1. Você será redirecionado para a página de configuração
2. Vá para a seção "Environment Variables"
3. Adicione as seguintes variáveis:

#### Variáveis Públicas (Frontend):

\`\`\`
NEXT_PUBLIC_SUPABASE_URL = https://inibhvfghvtiqfzrnpds.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaWJodmZnaHZ0aXFmenJucGRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MTg3ODUsImV4cCI6MjA3NjI5NDc4NX0.e-cSfI7wj3BgIunXj9Ie51PcoEzMNqflVcq4xxijJBo
\`\`\`

#### Variáveis Privadas (Backend/API):

\`\`\`
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaWJodmZnaHZ0aXFmenJucGRzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDcxODc4NSwiZXhwIjoyMDc2Mjk0Nzg1fQ.gylzPq7X-KcSoLhmpUDXAtUN95_4IlVVD0RaSO3f768
\`\`\`

## Passo 4: Deploy

### 4.1 Deploy Automático

1. Clique em "Deploy"
2. Aguarde a conclusão (normalmente 2-5 minutos)
3. Você receberá um link da aplicação (ex: `https://prime-life-admin.vercel.app`)

### 4.2 Deploy Manual (futuras atualizações)

Simplesmente faça push para a branch `main`:

\`\`\`bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
\`\`\`

O Vercel detectará as mudanças e iniciará o deploy automaticamente.

## Passo 5: Configurar Webhook Cacto

1. Acesse seu Quiz Cacto
2. Configure o webhook para enviar dados para:

\`\`\`
https://seu-dominio-vercel.vercel.app/api/cakto-webhook
\`\`\`

**Método**: POST
**Headers**: 
\`\`\`json
{
  "Content-Type": "application/json"
}
\`\`\`

## Teste e Validação

### 5.1 Testar Login

1. Acesse sua URL de deploy (ex: https://prime-life-admin.vercel.app)
2. Faça login com:
   - **Usuário**: `admin`
   - **Senha**: `aminprime7`

### 5.2 Testar Funcionalidades

- [ ] Dashboard carrega dados
- [ ] Busca de clientes funciona
- [ ] Filtros funcionam
- [ ] Cadastro de novo cliente funciona
- [ ] Download de carteirinha em PDF funciona
- [ ] Logout funciona

### 5.3 Testar Webhook

1. Envie um teste do Quiz Cacto
2. Verifique se os dados aparecem no dashboard
3. Confira no Supabase se a tabela `contratos` foi atualizada

## Troubleshooting

### Erro: "Missing environment variables"

**Solução**: Verifique se todas as variáveis de ambiente estão configuradas no Vercel Dashboard.

### Erro: "Cannot connect to Supabase"

**Solução**: Verifique se as URLs e chaves do Supabase estão corretas em `.env.example`.

### Erro: "Unauthorized" no webhook

**Solução**: O endpoint `/api/cakto-webhook` não requer autenticação por padrão. Se adicionar autenticação, ajuste o header `Authorization` no Cacto.

### Aplicação lenta ao carregar

**Solução**: Pode ser cold start do Vercel. Recarregue a página após alguns segundos.

## Domínio Personalizado (Opcional)

1. No Vercel Dashboard, vá para "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Siga as instruções de configuração DNS
4. Aguarde propagação (até 48 horas)

## Segurança

⚠️ **IMPORTANTE**: 

- Altere a senha `aminprime7` após o primeiro deploy em produção
- Nunca comitir `.env` ou `SUPABASE_SERVICE_ROLE_KEY` no GitHub
- Use repositório privado no GitHub
- Revise as environment variables do Vercel regularmente

## Suporte

Para dúvidas:
- Documentação Vercel: https://vercel.com/docs
- Documentação Supabase: https://supabase.com/docs
- Abra uma issue no repositório

---

**Versão**: 1.0.0
**Data**: 24/01/2025
