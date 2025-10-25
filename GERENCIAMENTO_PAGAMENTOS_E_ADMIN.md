# 💳 Guia Completo: Pagamentos, Painel Admin e Gerenciamento

## Índice
1. [Acessar o Painel Administrativo](#acessar-o-painel-administrativo)
2. [Gerenciar Pagamentos com Stripe](#gerenciar-pagamentos-com-stripe)
3. [Funcionalidades do Painel Admin](#funcionalidades-do-painel-admin)
4. [Verificar se Tudo Está Funcionando](#verificar-se-tudo-está-funcionando)
5. [Troubleshooting](#troubleshooting)

---

## Acessar o Painel Administrativo

### 1️⃣ Fazer Login

**URL:** `https://troca-certa.vercel.app` (ou seu domínio customizado)

1. Clicar em "Meu Painel" ou "Login"
2. Usar autenticação OAuth (Google, Manus, etc.)
3. Após login, você será redirecionado para o dashboard

### 2️⃣ Acessar Painel Admin

**Pré-requisito:** Sua conta deve ter role `admin`

**Como virar admin:**

#### Opção A: Via Banco de Dados (Recomendado)
```bash
# Conectar ao Supabase
psql postgresql://postgres:password@host:5432/postgres

# Atualizar role do usuário
UPDATE users SET role = 'admin' WHERE email = 'seu_email@example.com';

# Verificar
SELECT id, email, role FROM users WHERE email = 'seu_email@example.com';
```

#### Opção B: Via Supabase Dashboard
1. Ir para: https://supabase.com
2. Acessar seu projeto
3. Ir para **SQL Editor**
4. Executar:
```sql
UPDATE users SET role = 'admin' WHERE email = 'seu_email@example.com';
```

### 3️⃣ Acessar Painel Admin

Após ser admin, acesse:
```
https://troca-certa.vercel.app/admin
```

---

## Gerenciar Pagamentos com Stripe

### 1️⃣ Configurar Stripe em Produção

#### Passo 1: Criar Conta Stripe
1. Ir para: https://stripe.com
2. Clicar "Sign Up"
3. Preencher informações da empresa
4. Verificar e-mail

#### Passo 2: Obter Chaves de Produção
1. No dashboard Stripe, ir para **Settings** → **API Keys**
2. Copiar:
   - **Secret Key** (começa com `sk_live_`)
   - **Publishable Key** (começa com `pk_live_`)

#### Passo 3: Criar Produtos e Preços

**Para cada plano, criar um produto:**

```
Plano: Básico
Preço: R$ 9,90/mês
ID do Preço: price_1234567890
```

**Instruções:**
1. Em Stripe Dashboard, ir para **Products**
2. Clicar "Add Product"
3. Preencher:
   - **Name**: "Troca Certa - Plano Básico"
   - **Price**: 9.90 BRL
   - **Billing Period**: Monthly
4. Copiar o **Price ID**
5. Adicionar em Render como variável: `STRIPE_PRICE_BASIC=price_...`

**Repetir para:**
- Plano Premium (R$ 29,90)
- Plano Empresas (R$ 99,90)
- Plano Mecânicas Básico (R$ 199,90)
- Plano Mecânicas Pro (R$ 299,90)

#### Passo 4: Configurar Webhook

1. Em Stripe Dashboard, ir para **Developers** → **Webhooks**
2. Clicar "Add Endpoint"
3. URL: `https://troca-certa-api.onrender.com/api/webhooks/stripe`
4. Selecionar eventos:
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copiar **Signing Secret** (começa com `whsec_`)
6. Adicionar em Render: `STRIPE_WEBHOOK_SECRET=whsec_...`

#### Passo 5: Adicionar Chaves em Render

1. Ir para Render Dashboard
2. Selecionar serviço `troca-certa-api`
3. Ir para **Environment**
4. Adicionar:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_PRICE_BASIC=price_...
   STRIPE_PRICE_PREMIUM=price_...
   STRIPE_PRICE_COMPANY=price_...
   STRIPE_PRICE_MECHANIC_BASIC=price_...
   STRIPE_PRICE_MECHANIC_PRO=price_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
5. Clicar "Save"

### 2️⃣ Gerenciar Assinaturas no Painel Admin

**Acessar:** `https://troca-certa.vercel.app/admin`

**Aba: Assinaturas**

Você pode:
- ✅ Ver todas as assinaturas ativas
- ✅ Ver receita por plano
- ✅ Ver status de cada assinatura
- ✅ Cancelar assinatura (se necessário)
- ✅ Atualizar plano do usuário

### 3️⃣ Monitorar Pagamentos

**No Stripe Dashboard:**

1. Ir para **Payments**
2. Ver todas as transações
3. Filtrar por:
   - Status (succeeded, failed, pending)
   - Data
   - Valor

**Relatórios:**
1. Ir para **Reports** → **Billing**
2. Ver:
   - Receita total
   - Churn rate
   - MRR (Monthly Recurring Revenue)
   - Lifetime value

### 4️⃣ Testar Pagamentos (Modo Teste)

**Cartões de Teste Stripe:**

| Situação | Número | Validade | CVC |
|----------|--------|----------|-----|
| Sucesso | 4242 4242 4242 4242 | 12/25 | 123 |
| Falha | 4000 0000 0000 0002 | 12/25 | 123 |
| Requer Autenticação | 4000 0025 0000 3155 | 12/25 | 123 |

**Como Testar:**
1. Ir para `https://troca-certa.vercel.app`
2. Clicar em "Assinar" em um plano
3. Usar cartão de teste
4. Verificar se pagamento foi processado

---

## Funcionalidades do Painel Admin

### 📊 Dashboard

**Métricas Principais:**
- Total de Usuários
- Receita Mensal
- Veículos Cadastrados
- Taxa de Atividade

**Gráficos:**
- Crescimento de usuários
- Receita ao longo do tempo
- Distribuição de planos

### 👥 Gerenciar Usuários

**Acessar:** `/admin` → Aba "Usuários"

**Funcionalidades:**
- Ver lista de todos os usuários
- Filtrar por:
  - Plano (Grátis, Básico, Premium, etc.)
  - Status (Ativo, Inativo)
  - Data de cadastro
- Editar usuário:
  - Alterar plano
  - Alterar role (user, admin, mechanic, company)
  - Desativar conta
- Enviar mensagem ao usuário
- Ver histórico de atividades

**Exemplo: Promover Usuário a Admin**
1. Clicar em usuário
2. Clicar "Editar"
3. Mudar "Role" para "admin"
4. Clicar "Salvar"

### 💳 Gerenciar Assinaturas

**Acessar:** `/admin` → Aba "Assinaturas"

**Funcionalidades:**
- Ver todas as assinaturas
- Filtrar por:
  - Plano
  - Status (Ativa, Cancelada, Vencida)
- Cancelar assinatura
- Estender período de teste
- Aplicar cupom de desconto
- Ver histórico de pagamentos

**Exemplo: Cancelar Assinatura**
1. Clicar em assinatura
2. Clicar "Cancelar"
3. Confirmar cancelamento
4. Usuário receberá e-mail de confirmação

### 📄 Gerar Relatórios

**Acessar:** `/admin` → Aba "Relatórios"

**Tipos de Relatórios:**
- Relatório Mensal de Usuários
- Relatório de Receita
- Análise de Retenção
- Relatório de Bugs

**Como Gerar:**
1. Selecionar tipo de relatório
2. Selecionar período
3. Clicar "Gerar"
4. Baixar em PDF

### ⚙️ Configurações do Sistema

**Acessar:** `/admin` → Aba "Configurações"

**Opções:**
- Nome da aplicação
- E-mail de suporte
- Telefone de suporte
- Status das integrações
- Limites de uso

---

## Verificar se Tudo Está Funcionando

### ✅ Checklist de Funcionamento

#### 1. Frontend
```bash
# Abrir no navegador
https://troca-certa.vercel.app

# Verificar:
□ Página carrega sem erros
□ Imagens aparecem corretamente
□ Botões são clicáveis
□ Responsivo em mobile
□ Pricing page carrega
□ Footer aparece
```

#### 2. Autenticação
```bash
# Testar login
□ Clicar "Login"
□ Redireciona para OAuth
□ Consegue fazer login
□ Redireciona para dashboard
□ Dados do usuário aparecem
□ Logout funciona
```

#### 3. Backend
```bash
# Testar health check
curl https://troca-certa-api.onrender.com/health

# Resposta esperada:
{"status": "ok"}

# Testar tRPC
curl https://troca-certa-api.onrender.com/api/trpc/auth.me

# Resposta esperada:
{"result":{"data":null}} (se não autenticado)
```

#### 4. Banco de Dados
```bash
# Conectar ao Supabase
psql postgresql://postgres:password@host:5432/postgres

# Verificar tabelas
\dt

# Esperado:
users
vehicles
maintenanceHistory
maintenanceReminders
notificationsLog
subscriptions
...
```

#### 5. Pagamentos (Stripe)
```bash
□ Ir para /pricing
□ Clicar "Assinar" em um plano
□ Formulário de pagamento aparece
□ Usar cartão de teste: 4242 4242 4242 4242
□ Pagamento é processado
□ Recebe e-mail de confirmação
□ Plano é atualizado no dashboard
```

#### 6. E-mails (SendGrid)
```bash
□ Fazer cadastro novo
□ Receber e-mail de boas-vindas
□ Clicar em "Esqueci a senha"
□ Receber e-mail de reset
□ Reset link funciona
```

#### 7. Painel Admin
```bash
□ Ser promovido a admin
□ Acessar /admin
□ Ver dashboard com métricas
□ Ver lista de usuários
□ Ver assinaturas
□ Gerar relatórios
□ Editar configurações
```

#### 8. SMS/WhatsApp (Twilio)
```bash
□ Configurar número de telefone
□ Receber SMS de confirmação
□ Receber WhatsApp de lembrete
□ Mensagens chegam em tempo real
```

### 🔍 Monitoramento Contínuo

#### Logs do Vercel (Frontend)
1. Ir para: https://vercel.com
2. Selecionar projeto `troca-certa`
3. Clicar em **Deployments**
4. Clicar em deployment mais recente
5. Ver **Logs** para erros

#### Logs do Render (Backend)
1. Ir para: https://render.com
2. Selecionar serviço `troca-certa-api`
3. Clicar em **Logs**
4. Ver logs em tempo real

#### Logs do Supabase (Banco de Dados)
1. Ir para: https://supabase.com
2. Selecionar projeto
3. Clicar em **Logs**
4. Ver queries e erros

#### Monitoramento de Performance
```bash
# Lighthouse Score (Frontend)
https://pagespeed.web.dev/

# Inserir URL: https://troca-certa.vercel.app
# Scores esperados:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 95+
# - SEO: 100
```

### 📊 Métricas Importantes

**Verificar regularmente:**

1. **Uptime**
   - Frontend: Vercel Dashboard
   - Backend: Render Dashboard
   - Banco: Supabase Dashboard

2. **Performance**
   - Tempo de resposta API
   - Tempo de carregamento do site
   - Taxa de erro

3. **Usuários**
   - Total de cadastros
   - Usuários ativos
   - Taxa de retenção

4. **Pagamentos**
   - Receita total
   - Número de assinaturas
   - Taxa de churn
   - MRR (Monthly Recurring Revenue)

5. **Erros**
   - Erros de API
   - Erros de banco de dados
   - Erros de integração

---

## Troubleshooting

### ❌ Problema: Painel Admin não aparece

**Solução:**
1. Verificar se você é admin:
```sql
SELECT role FROM users WHERE email = 'seu_email@example.com';
```
2. Se não for admin, executar:
```sql
UPDATE users SET role = 'admin' WHERE email = 'seu_email@example.com';
```
3. Fazer logout e login novamente

### ❌ Problema: Pagamentos não funcionam

**Solução:**
1. Verificar se chaves Stripe estão corretas em Render
2. Verificar se webhook está configurado
3. Testar com cartão de teste: `4242 4242 4242 4242`
4. Ver logs em Stripe Dashboard → **Developers** → **Events**

### ❌ Problema: E-mails não chegam

**Solução:**
1. Verificar se `SENDGRID_API_KEY` está correto
2. Verificar se e-mail está verificado em SendGrid
3. Ver logs em SendGrid Dashboard → **Activity**
4. Verificar pasta de spam

### ❌ Problema: SMS/WhatsApp não funciona

**Solução:**
1. Verificar se `TWILIO_ACCOUNT_SID` e `TWILIO_AUTH_TOKEN` estão corretos
2. Verificar se números de telefone estão no formato correto: `+55XXXXXXXXXX`
3. Verificar se número está verificado em Twilio
4. Ver logs em Twilio Console → **Message Logs**

### ❌ Problema: Banco de dados não conecta

**Solução:**
1. Verificar `DATABASE_URL` em Render
2. Testar conexão:
```bash
psql postgresql://postgres:password@host:5432/postgres -c "SELECT 1"
```
3. Verificar se Supabase está ativo
4. Verificar firewall/IP whitelist

---

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **SendGrid Docs**: https://sendgrid.com/docs
- **Twilio Docs**: https://www.twilio.com/docs

---

**Última atualização:** Novembro de 2025
**Versão:** 1.0.0

