# Configuração do Supabase

## Estrutura do Projeto

### Clientes Supabase

- **`lib/supabase-client.ts`** - Client-side (anon key)
  - Usado no frontend e componentes React
  - Sincronização em tempo real com RLS
  - Puxar dados na aplicação

- **`lib/supabase-admin.ts`** - Server-side (service_role key)
  - Usado APENAS em API routes e server actions
  - Bypass de RLS policies
  - Webhook processing

### Endpoint do Webhook

- **`app/api/cakto-webhook/route.ts`**
  - Recebe eventos da Cacto
  - Atualiza tabela `contratos` automaticamente
  - Suporta create e update

## Tabela `contratos`

Campos:
- `id` (uuid) - Primary key
- `created_at` (timestamp)
- `plano_id` (text)
- `plano_nome` (text)
- `plano_preco` (numeric)
- `titular_nome` (text)
- `titular_data_n` (date)
- `titular_cpf` (text)
- `titular_cep` (text)
- `titular_numero` (text)
- `dependentes` (jsonb) - Array de dependentes
- `assinatura_data` (timestamp)
- `assinatura_id` (text)
- `status` (text) - 'pendente' | 'ativo' | 'cancelado'

## Eventos do Webhook

A aplicação processa os seguintes eventos:

1. **purchase.completed** - Define status como 'ativo'
2. **purchase.failed** - Define status como 'cancelado'
3. **subscription.cancelled** - Define status como 'cancelado'
4. Outros eventos - Define status como 'pendente'

## Como Funciona

1. Cacto envia evento para: `https://seu-app.vercel.app/api/cakto-webhook`
2. Endpoint recebe payload JSON
3. Mapeia dados para tabela `contratos`
4. Se ID existe → UPDATE
5. Se ID não existe → INSERT
6. Frontend sincroniza em tempo real via `useClients` hook

## Testando o Webhook

\`\`\`bash
# GET - Health check
curl https://seu-app.vercel.app/api/cakto-webhook

# POST - Teste
curl -X POST https://seu-app.vercel.app/api/cakto-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "purchase.completed",
    "data": {
      "plano_nome": "Premium",
      "plano_preco": 79.90,
      "titular_nome": "João Silva",
      "titular_cpf": "123.456.789-00",
      "status": "ativo"
    }
  }'
\`\`\`

## Variables de Ambiente

### No Vercel

1. Vá para: Settings → Environment Variables
2. Adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Secret)

### Localmente

Crie `.env.local` com as mesmas variáveis do `.env.example`
