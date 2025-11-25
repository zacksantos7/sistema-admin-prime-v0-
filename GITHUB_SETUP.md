# Como Subir no GitHub e Fazer Deploy

## Opção 1: Se você já tem o repositório criado (RECOMENDADO)

### Passo 1: Configurar Git Localmente

\`\`\`bash
# Abra o terminal na pasta do projeto
cd /caminho/para/prime-life-admin

# Configure suas credenciais git
git config user.email "seu-email@github.com"
git config user.name "Seu Nome"

# Se ainda não tem repositório local
git init
\`\`\`

### Passo 2: Adicionar Remote do GitHub

\`\`\`bash
# Adicione o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/prime-life-admin.git

# Verifique se foi adicionado
git remote -v
\`\`\`

### Passo 3: Fazer Commit e Push

\`\`\`bash
# Adicione todos os arquivos
git add .

# Crie o commit inicial
git commit -m "Initial commit - Prime Life Admin System"

# Faça push para main (GitHub pode pedir credentials)
git branch -M main
git push -u origin main
\`\`\`

## Opção 2: Usando GitHub Desktop (Interface Gráfica)

### Passo 1: Baixar GitHub Desktop

- Acesse: https://desktop.github.com
- Baixe e instale

### Passo 2: Clonar seu Repositório

1. Abra GitHub Desktop
2. Selecione "File" > "Clone Repository"
3. Procure por `prime-life-admin`
4. Escolha o caminho local
5. Clique "Clone"

### Passo 3: Fazer Commit

1. GitHub Desktop mostrará os arquivos modificados
2. Em "Summary", escreva: "Initial commit - Prime Life Admin"
3. Clique "Commit to main"
4. Clique "Push origin"

## Passo 4: Conectar ao Vercel

### Via Vercel Dashboard

1. Acesse https://vercel.com/dashboard
2. Clique "New Project"
3. Selecione o repositório `prime-life-admin`
4. Configure as environment variables (confira DEPLOYMENT.md)
5. Clique "Deploy"

### Pronto! 

Sua aplicação estará em: `https://prime-life-admin.vercel.app` (ou similar)

## Monitoramento

### Ver Logs de Deploy

\`\`\`bash
# No Vercel Dashboard:
# 1. Vá ao seu projeto
# 2. Clique na aba "Deployments"
# 3. Clique no deploy recente para ver logs
\`\`\`

### Atualizar Aplicação

Qualquer push para `main` dispara novo deploy automaticamente:

\`\`\`bash
# Faça suas alterações
git add .
git commit -m "Descrição da mudança"
git push origin main

# Vercel fará deploy automaticamente
\`\`\`

## Troubleshooting

### Erro: "fatal: not a git repository"

\`\`\`bash
# Solução:
git init
git remote add origin https://github.com/SEU_USUARIO/prime-life-admin.git
\`\`\`

### Erro: "Permission denied (publickey)"

\`\`\`bash
# Solução: Configure SSH key
# Ou use HTTPS com GitHub token:
git remote set-url origin https://seu-token@github.com/SEU_USUARIO/prime-life-admin.git
\`\`\`

### Erro: "Push rejected"

\`\`\`bash
# Solução: Pull das mudanças remotas
git pull origin main
git push origin main
\`\`\`

## Recursos Adicionais

- Git Tutorial: https://git-scm.com/doc
- GitHub Help: https://docs.github.com
- Vercel Deploy: https://vercel.com/docs/deployments/overview

---

**Versão**: 1.0.0
