# 🚀 Guia Completo de Deploy - Troca Certa

## Visão Geral do Deploy

Este guia fornece instruções passo a passo para fazer o deploy completo do Troca Certa em produção com:
- **Frontend**: Vercel
- **Backend**: Render
- **Banco de Dados**: Supabase (PostgreSQL)
- **Integrações**: Stripe, SendGrid, Twilio, etc.

---

## Pré-requisitos

- Conta GitHub (já criada)
- Conta Vercel (gratuita)
- Conta Render (gratuita)
- Conta Supabase (gratuita)
- Contas nas APIs (Stripe, SendGrid, Twilio, etc.)

---

## Passo 1: Configurar Supabase (Banco de Dados)

### 1.1 Criar Projeto Supabase

1. Ir para [supabase.com](https://supabase.com)
2. Clicar em "New Project"
3. Preencher:
   - **Name**: `troca-certa`
   - **Database Password**: Gerar senha forte
   - **Region**: Escolher região mais próxima (ex: São Paulo)
4. Clicar "Create new project"
5. Aguardar ~2 minutos para o projeto ser criado

### 1.2 Obter Connection String

1. No dashboard do Supabase, ir para **Settings** → **Database**
2. Copiar a "Connection string" (URI)
3. Substituir `[YOUR-PASSWORD]` pela senha do banco
4. Formato: `postgresql://postgres:password@host:5432/postgres`

### 1.3 Executar Migrações

```bash
# No seu computador local
export DATABASE_URL="postgresql://postgres:password@host:5432/postgres"
pnpm db:push
```

---

## Passo 2: Deploy do Frontend (Vercel)

### 2.1 Conectar Repositório

1. Ir para [vercel.com](https://vercel.com)
2. Clicar "New Project"
3. Selecionar "Import Git Repository"
4. Conectar GitHub e selecionar `troca_certa_v1`
5. Clicar "Import"

### 2.2 Configurar Variáveis de Ambiente

No dashboard do Vercel, ir para **Settings** → **Environment Variables** e adicionar:

```
VITE_APP_ID=seu_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_ANALYTICS_ENDPOINT=https://www.google-analytics.com/mp/collect
VITE_ANALYTICS_WEBSITE_ID=G-seu_measurement_id
VITE_APP_TITLE=Troca Certa
VITE_APP_LOGO=https://trocacerta.com/logo.svg
VITE_API_URL=https://troca-certa-api.onrender.com
```

### 2.3 Deploy

1. Clicar "Deploy"
2. Aguardar ~3-5 minutos
3. Seu site estará disponível em: `https://troca-certa.vercel.app`

### 2.4 Configurar Domínio Customizado (Opcional)

1. Em **Settings** → **Domains**
2. Clicar "Add Domain"
3. Inserir seu domínio (ex: `trocacerta.com`)
4. Seguir instruções para configurar DNS

---

## Passo 3: Deploy do Backend (Render)

### 3.1 Criar Serviço Web

1. Ir para [render.com](https://render.com)
2. Clicar "New +" → "Web Service"
3. Conectar GitHub e selecionar `troca_certa_v1`
4. Preencher:
   - **Name**: `troca-certa-api`
   - **Environment**: Node
   - **Build Command**: `pnpm install && pnpm db:push && pnpm build`
   - **Start Command**: `pnpm start`
   - **Plan**: Free (ou Starter se quiser melhor performance)

### 3.2 Configurar Variáveis de Ambiente

Em **Environment**, adicionar:

```
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
JWT_SECRET=seu_jwt_secret_aleatorio_muito_seguro
STRIPE_SECRET_KEY=sk_live_sua_chave_stripe
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret
SENDGRID_API_KEY=SG.sua_chave_sendgrid
TWILIO_ACCOUNT_SID=ACseu_account_sid
TWILIO_AUTH_TOKEN=seu_auth_token
TWILIO_PHONE_NUMBER=+55seu_numero
TWILIO_WHATSAPP_NUMBER=+55seu_numero
BUILT_IN_FORGE_API_KEY=sua_chave_manus
BUILT_IN_FORGE_API_URL=https://api.manus.im
VITE_APP_ID=seu_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_APP_TITLE=Troca Certa
VITE_APP_LOGO=https://trocacerta.com/logo.svg
OWNER_NAME=Troca Certa
OWNER_OPEN_ID=seu_owner_open_id
VITE_API_URL=https://troca-certa-api.onrender.com
VITE_APP_URL=https://troca-certa.vercel.app
```

### 3.3 Deploy

1. Clicar "Create Web Service"
2. Aguardar ~5-10 minutos para o build completar
3. Seu API estará disponível em: `https://troca-certa-api.onrender.com`

---

## Passo 4: Configurar Webhooks

### 4.1 Stripe Webhook

1. Ir para [stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Clicar "Add endpoint"
3. URL: `https://troca-certa-api.onrender.com/api/webhooks/stripe`
4. Eventos: Selecionar:
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copiar "Signing Secret" e adicionar em Render como `STRIPE_WEBHOOK_SECRET`

### 4.2 Twilio Webhook (Opcional)

1. Ir para [twilio.com/console](https://www.twilio.com/console)
2. Configurar webhook para: `https://troca-certa-api.onrender.com/api/webhooks/twilio`

---

## Passo 5: Testar o Deploy

### 5.1 Verificar Frontend

```bash
# Abrir no navegador
https://troca-certa.vercel.app
```

Verificar:
- [ ] Página inicial carrega
- [ ] Botão "Cadastrar" funciona
- [ ] OAuth login funciona
- [ ] Pricing page carrega

### 5.2 Verificar Backend

```bash
# Testar health check
curl https://troca-certa-api.onrender.com/health

# Testar tRPC
curl https://troca-certa-api.onrender.com/api/trpc/auth.me
```

### 5.3 Testar Banco de Dados

```bash
# Conectar ao Supabase
psql postgresql://postgres:password@host:5432/postgres

# Verificar tabelas
\dt
```

---

## Passo 6: Configurar Domínio Customizado

### 6.1 Vercel (Frontend)

1. Em Vercel → **Settings** → **Domains**
2. Adicionar domínio (ex: `trocacerta.com`)
3. Configurar DNS records conforme instruções

### 6.2 Render (Backend)

1. Em Render → **Settings** → **Custom Domain**
2. Adicionar domínio (ex: `api.trocacerta.com`)
3. Configurar DNS records

### 6.3 Atualizar Variáveis de Ambiente

Após configurar domínios, atualizar:

**Vercel:**
```
VITE_API_URL=https://api.trocacerta.com
```

**Render:**
```
VITE_APP_URL=https://trocacerta.com
```

---

## Passo 7: Monitoramento e Manutenção

### 7.1 Logs

**Vercel:**
- Dashboard → **Deployments** → Clicar em deploy → **Logs**

**Render:**
- Dashboard → **troca-certa-api** → **Logs**

### 7.2 Alertas

**Render:**
- **Settings** → **Notifications**
- Ativar alertas para falhas de deploy

### 7.3 Backups

**Supabase:**
- **Settings** → **Backups**
- Ativar backups automáticos

---

## Troubleshooting

### Erro: "Cannot find module"

**Solução:**
```bash
# No Render, adicionar build command:
pnpm install --frozen-lockfile && pnpm db:push && pnpm build
```

### Erro: "Database connection refused"

**Solução:**
1. Verificar `DATABASE_URL` em Render
2. Verificar se Supabase está rodando
3. Verificar firewall/IP whitelist

### Erro: "OAuth callback failed"

**Solução:**
1. Verificar `VITE_APP_ID` em Vercel
2. Verificar redirect URI em Manus OAuth
3. Verificar CORS em Render

### Site lento

**Solução:**
1. Atualizar plano Render de Free para Starter
2. Ativar caching em Vercel
3. Otimizar imagens

---

## Próximos Passos

1. ✅ Configurar domínio customizado
2. ✅ Ativar SSL/HTTPS (automático em Vercel e Render)
3. ✅ Configurar email de suporte
4. ✅ Ativar analytics
5. ✅ Configurar backups automáticos
6. ✅ Monitorar performance
7. ✅ Planejar scaling

---

## Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs

---

**Última atualização:** Novembro de 2025
**Versão:** 1.0.0

