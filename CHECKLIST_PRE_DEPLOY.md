# ✅ Checklist Pré-Deploy

Use este checklist antes de fazer deploy em produção.

## Segurança

- [ ] Verifique se `.env` está em `.gitignore` ✅ (já configurado)
- [ ] Confirme que `SUPABASE_SERVICE_ROLE_KEY` não está no repositório público
- [ ] Mude a senha padrão `aminprime7` para algo seguro
- [ ] Repositório GitHub está como "Private"
- [ ] Variáveis de ambiente configuradas no Vercel Dashboard

## Código

- [ ] Sem erros TypeScript (`npm run build` funciona)
- [ ] Sem console.log de debug
- [ ] Componentes importados corretamente
- [ ] Sem dependências faltando (`npm install` completo)

## Funcionalidades

### Autenticação
- [ ] Login com admin/aminprime7 funciona
- [ ] Logout funciona
- [ ] Proteção de rotas funciona (sem auth vai para /login)
- [ ] Session mantém após refresh

### Dashboard
- [ ] Métricas carregam
- [ ] Gráficos de faturamento aparecem
- [ ] Dados do Supabase sincronizam

### Clientes
- [ ] Tabela de clientes carrega
- [ ] Busca por nome/CPF funciona
- [ ] Filtros por status funcionam
- [ ] Novo cliente pode ser adicionado
- [ ] Dependentes aparecem corretamente
- [ ] Carteirinha em PDF faz download

### Supabase
- [ ] Conexão com Supabase OK
- [ ] Tabela `contratos` contém dados
- [ ] Webhook Cacto configurado
- [ ] Realtime subscriptions funcionam

## Deployment

- [ ] Branch `main` está atualizado
- [ ] Último commit está com mensagem clara
- [ ] GitHub está sincronizado com todas as mudanças
- [ ] Variáveis de ambiente no Vercel estão corretas
- [ ] Preview deployment funcionou

## Pós-Deploy

- [ ] Acessar URL de produção
- [ ] Fazer login e testar todas as funcionalidades
- [ ] Testar webhook Cacto
- [ ] Monitorar logs do Vercel
- [ ] Testar em diferentes navegadores

## Links Importantes

- Dashboard Vercel: https://vercel.com/dashboard
- Supabase Console: https://app.supabase.com
- Repositório GitHub: https://github.com/seu-usuario/prime-life-admin
- URL de Produção: https://prime-life-admin.vercel.app

---

**Versão**: 1.0.0
**Data**: 24/01/2025
