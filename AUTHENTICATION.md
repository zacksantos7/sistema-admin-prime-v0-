# Autenticação - Prime Life Admin

## Segurança Atual

A aplicação usa **sessionStorage** do navegador para armazenar a sessão de autenticação. Isso significa:

- ✅ Token válido apenas durante a sessão do navegador
- ✅ Logout automático ao fechar o navegador
- ✅ Não persiste em refresh (segurança adicional)

## Credenciais Padrão

**Usuário**: `admin`
**Senha**: `aminprime7`

## Como Alterar a Senha

### Passo 1: Localizar o código de autenticação

Arquivo: `app/login/page.tsx`

\`\`\`tsx
// Encontre esta linha:
if (username === "admin" && password === "aminprime7") {
  // Autenticação bem-sucedida
}
\`\`\`

### Passo 2: Substituir a senha

\`\`\`tsx
// Mude para:
if (username === "admin" && password === "NOVA_SENHA_SUPER_SEGURA") {
  // Autenticação bem-sucedida
}
\`\`\`

### Passo 3: Fazer deploy

\`\`\`bash
git add app/login/page.tsx
git commit -m "Change admin password"
git push origin main
\`\`\`

## Próximas Melhorias Recomendadas

Para maior segurança em produção, considere implementar:

1. **Autenticação com Supabase Auth**
   - Suporte a Google/GitHub
   - Recuperação de senha
   - 2FA (autenticação de dois fatores)

2. **Gestão de Usuários**
   - Múltiplos usuários
   - Diferentes níveis de permissão
   - Auditoria de acesso

3. **Sessions Seguras**
   - HTTP-only cookies
   - CSRF protection
   - Token rotation

## Middleware de Autenticação

O arquivo `middleware.ts` protege as rotas:

\`\`\`ts
// Verifica autenticação em todas as páginas
// Redireciona para /login se não autenticado
\`\`\`

Para adicionar novas rotas protegidas, basta criá-las dentro de `/app`.

## Variáveis de Sessão

Armazenadas em `sessionStorage`:

\`\`\`
auth_token: "prime-life-admin-{timestamp}"
auth_user: "admin"
\`\`\`

Remova estas variáveis no logout:

\`\`\`ts
logout() // Função em lib/auth.ts
\`\`\`

---

**Versão**: 1.0.0
