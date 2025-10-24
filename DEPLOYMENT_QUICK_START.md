# 🚀 Deployment Rápido - Troca Certa

## ⚡ Começar em 5 Minutos

### Opção 1: Deploy Automático (Recomendado)

#### 1. Vercel (Frontend)
```bash
# 1. Ir para https://vercel.com
# 2. Clicar "New Project"
# 3. Importar: https://github.com/LuizCovelo/troca_certa_v1
# 4. Adicionar variáveis de ambiente:
VITE_APP_ID=seu_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_API_URL=https://troca-certa-api.onrender.com
# 5. Clicar "Deploy"
# ✅ Seu site estará em: https://troca-certa.vercel.app
```

#### 2. Render (Backend)
```bash
# 1. Ir para https://render.com
# 2. Clicar "New Web Service"
# 3. Conectar GitHub: troca_certa_v1
# 4. Configurar:
#    - Build: pnpm install && pnpm db:push && pnpm build
#    - Start: pnpm start
# 5. Adicionar variáveis de ambiente (ver .env.production)
# 6. Clicar "Create"
# ✅ Seu API estará em: https://troca-certa-api.onrender.com
```

#### 3. Supabase (Banco de Dados)
```bash
# 1. Ir para https://supabase.com
# 2. Clicar "New Project"
# 3. Copiar DATABASE_URL
# 4. Adicionar em Render como variável de ambiente
# ✅ Banco de dados pronto!
```

---

## 📋 Checklist de Deployment

### Pré-Deploy
- [ ] Repositório GitHub criado: ✅ https://github.com/LuizCovelo/troca_certa_v1
- [ ] Código commitado e pushed
- [ ] Arquivo `.env.production` preenchido

### Deploy Frontend (Vercel)
- [ ] Conta Vercel criada
- [ ] Repositório conectado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy iniciado
- [ ] URL do site anotada

### Deploy Backend (Render)
- [ ] Conta Render criada
- [ ] Repositório conectado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy iniciado
- [ ] URL da API anotada

### Banco de Dados (Supabase)
- [ ] Conta Supabase criada
- [ ] Projeto criado
- [ ] CONNECTION STRING copiada
- [ ] Adicionada em Render
- [ ] Migrações executadas

### Integrações
- [ ] Stripe configurado
- [ ] SendGrid configurado
- [ ] Twilio configurado
- [ ] Google Analytics configurado
- [ ] Meta Pixel configurado

### Pós-Deploy
- [ ] Frontend acessível
- [ ] Backend respondendo
- [ ] Banco de dados conectado
- [ ] OAuth funcionando
- [ ] Pagamentos testados
- [ ] E-mails enviando
- [ ] SMS/WhatsApp funcionando

---

## 🔐 Variáveis de Ambiente Necessárias

### Frontend (Vercel)
```env
VITE_APP_ID=seu_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_ANALYTICS_ENDPOINT=https://www.google-analytics.com/mp/collect
VITE_ANALYTICS_WEBSITE_ID=G-seu_id
VITE_APP_TITLE=Troca Certa
VITE_APP_LOGO=https://seu-logo.png
VITE_API_URL=https://troca-certa-api.onrender.com
```

### Backend (Render)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=seu_secret_aleatorio
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG....
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+55...
TWILIO_WHATSAPP_NUMBER=+55...
BUILT_IN_FORGE_API_KEY=...
BUILT_IN_FORGE_API_URL=https://api.manus.im
VITE_APP_ID=seu_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_APP_TITLE=Troca Certa
VITE_APP_LOGO=https://seu-logo.png
OWNER_NAME=Seu Nome
OWNER_OPEN_ID=seu_id
VITE_API_URL=https://troca-certa-api.onrender.com
VITE_APP_URL=https://troca-certa.vercel.app
```

---

## 🧪 Testar o Deploy

### Frontend
```bash
# Abrir no navegador
https://troca-certa.vercel.app

# Verificar:
# ✅ Página carrega
# ✅ Botões funcionam
# ✅ Login OAuth funciona
```

### Backend
```bash
# Testar health check
curl https://troca-certa-api.onrender.com/health

# Testar tRPC
curl https://troca-certa-api.onrender.com/api/trpc/auth.me
```

### Banco de Dados
```bash
# Conectar ao Supabase
psql postgresql://postgres:password@host:5432/postgres

# Verificar tabelas
\dt
```

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Cannot find module" | Rodar `pnpm install` em Render |
| "Database connection failed" | Verificar `DATABASE_URL` |
| "OAuth not working" | Verificar `VITE_APP_ID` e redirect URI |
| "Stripe webhook failed" | Verificar `STRIPE_WEBHOOK_SECRET` |
| "Site lento" | Atualizar plano Render para Starter |

---

## 📚 Documentação Completa

Para mais detalhes, ver:
- `GUIA_DEPLOY.md` - Guia completo passo a passo
- `MANUAL_TECNICO.md` - Documentação técnica
- `.env.production` - Template de variáveis

---

## ✅ Próximos Passos

1. Configurar domínio customizado
2. Ativar SSL/HTTPS (automático)
3. Configurar backups automáticos
4. Monitorar performance
5. Configurar alertas

---

**Tempo estimado de deploy:** 15-30 minutos
**Custo:** Gratuito (planos free)
**Suporte:** Ver documentação ou criar issue no GitHub

