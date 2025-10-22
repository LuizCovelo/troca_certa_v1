# 📘 Manual Técnico - Troca Certa

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Instalação e Setup](#instalação-e-setup)
4. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
5. [Conectores e Integrações](#conectores-e-integrações)
6. [Guia de Deployment](#guia-de-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Visão Geral

O **Troca Certa** é um Micro SaaS completo desenvolvido com tecnologias modernas para gerenciar manutenção automotiva com lembretes inteligentes. O sistema oferece suporte para usuários individuais, mecânicos e empresas.

### Stack Tecnológico

| Componente | Tecnologia |
|-----------|-----------|
| Frontend | React 19 + TypeScript + Tailwind CSS 4 |
| Backend | Node.js + Express + tRPC |
| Banco de Dados | MySQL/TiDB |
| Autenticação | Manus OAuth + JWT |
| Armazenamento | S3 (Manus Built-in) |
| Pagamentos | Stripe |
| E-mails | SendGrid |
| SMS/WhatsApp | Twilio |
| Analytics | Google Analytics + Meta Pixel |
| IA | Claude/GPT (Manus LLM) |
| Deploy | Vercel (Frontend) + Render/AWS (Backend) |

---

## Arquitetura do Sistema

### Estrutura de Pastas

```
troca_certa/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── lib/              # Utilitários e configurações
│   │   ├── contexts/         # Contextos React
│   │   ├── hooks/            # Custom hooks
│   │   └── App.tsx           # Componente raiz
│   └── public/               # Arquivos estáticos
├── server/                    # Backend Node.js
│   ├── integrations/         # Integrações com APIs externas
│   │   ├── stripe.ts         # Pagamentos
│   │   ├── sendgrid.ts       # E-mails
│   │   ├── twilio.ts         # SMS/WhatsApp
│   │   ├── llm.ts            # IA
│   │   ├── analytics.ts      # Google Analytics + Meta Pixel
│   │   └── reports.ts        # Geração de PDFs
│   ├── routers.ts            # Rotas tRPC
│   ├── db.ts                 # Helpers de banco de dados
│   └── storage.ts            # Integração com S3
├── drizzle/                   # Migrações e schema
│   ├── schema.ts             # Definição das tabelas
│   └── migrations/           # Histórico de migrações
├── shared/                    # Código compartilhado
└── package.json              # Dependências do projeto
```

### Fluxo de Dados

```
Cliente (React)
    ↓
tRPC Client
    ↓
tRPC Router (Backend)
    ↓
Database Helpers
    ↓
MySQL Database
    ↓
Integrações (Stripe, SendGrid, Twilio, etc)
```

---

## Instalação e Setup

### Pré-requisitos

- Node.js 18+
- pnpm 10+
- Git
- Conta Manus (para OAuth e APIs)

### Passos de Instalação

#### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/troca_certa.git
cd troca_certa
```

#### 2. Instalar Dependências

```bash
pnpm install
```

#### 3. Configurar Variáveis de Ambiente

Criar arquivo `.env.local` na raiz do projeto:

```env
# Manus OAuth
VITE_APP_ID=seu_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
JWT_SECRET=seu_jwt_secret_aleatorio

# Database
DATABASE_URL=mysql://usuario:senha@localhost:3306/troca_certa

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...
STRIPE_PRICE_COMPANY=price_...
STRIPE_PRICE_MECHANIC_BASIC=price_...
STRIPE_PRICE_MECHANIC_PRO=price_...

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@trocacerta.com

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+55...
TWILIO_WHATSAPP_NUMBER=+55...

# Google Analytics
VITE_ANALYTICS_ENDPOINT=https://www.google-analytics.com/mp/collect
VITE_ANALYTICS_WEBSITE_ID=G-...

# Meta Pixel
META_PIXEL_ID=xxx

# S3 (Manus Built-in)
BUILT_IN_FORGE_API_KEY=xxx
BUILT_IN_FORGE_API_URL=https://api.manus.im

# App Config
VITE_APP_TITLE=Troca Certa
VITE_APP_LOGO=https://...
OWNER_NAME=Seu Nome
OWNER_OPEN_ID=seu_open_id
```

#### 4. Executar Migrações do Banco de Dados

```bash
pnpm db:push
```

#### 5. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

---

## Estrutura do Banco de Dados

### Tabelas Principais

#### users
Armazena informações de usuários do sistema.

```sql
CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  name TEXT,
  email VARCHAR(320) UNIQUE,
  phone VARCHAR(20),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin', 'mechanic', 'company'),
  plan ENUM('free', 'basic', 'premium', 'company', 'mechanic_basic', 'mechanic_pro'),
  stripeCustomerId VARCHAR(255),
  stripeSubscriptionId VARCHAR(255),
  subscriptionStatus ENUM('active', 'canceled', 'past_due', 'unpaid', 'none'),
  notificationPreference ENUM('email', 'whatsapp', 'both'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### vehicles
Armazena informações dos veículos cadastrados.

```sql
CREATE TABLE vehicles (
  id VARCHAR(64) PRIMARY KEY,
  userId VARCHAR(64) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  licensePlate VARCHAR(20) UNIQUE,
  currentKm INT NOT NULL,
  color VARCHAR(50),
  fuelType ENUM('gasoline', 'diesel', 'ethanol', 'hybrid', 'electric'),
  imageUrl TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

#### maintenanceHistory
Armazena histórico de manutenções realizadas.

```sql
CREATE TABLE maintenanceHistory (
  id VARCHAR(64) PRIMARY KEY,
  vehicleId VARCHAR(64) NOT NULL,
  maintenanceTypeId VARCHAR(64) NOT NULL,
  kmAtMaintenance INT NOT NULL,
  datePerformed TIMESTAMP NOT NULL,
  cost DECIMAL(10, 2),
  notes TEXT,
  mechanic VARCHAR(100),
  reminderSent BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
);
```

#### maintenanceReminders
Armazena lembretes de próximas manutenções.

```sql
CREATE TABLE maintenanceReminders (
  id VARCHAR(64) PRIMARY KEY,
  vehicleId VARCHAR(64) NOT NULL,
  maintenanceTypeId VARCHAR(64) NOT NULL,
  nextDueKm INT,
  nextDueDate TIMESTAMP,
  status ENUM('pending', 'sent', 'completed', 'snoozed'),
  reminderSentAt TIMESTAMP,
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
);
```

#### notificationsLog
Armazena log de todas as notificações enviadas.

```sql
CREATE TABLE notificationsLog (
  id VARCHAR(64) PRIMARY KEY,
  userId VARCHAR(64) NOT NULL,
  vehicleId VARCHAR(64),
  maintenanceTypeId VARCHAR(64),
  type ENUM('email', 'whatsapp', 'sms'),
  status ENUM('sent', 'failed', 'pending'),
  message TEXT,
  sentAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

---

## Conectores e Integrações

### 1. Stripe (Pagamentos)

#### Setup

1. Criar conta em [stripe.com](https://stripe.com)
2. Obter chaves de API (Secret e Publishable)
3. Criar produtos e preços para cada plano
4. Configurar webhooks

#### Configuração de Webhooks

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Escutar eventos
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

#### Eventos Tratados

- `customer.subscription.updated` - Atualização de assinatura
- `customer.subscription.deleted` - Cancelamento de assinatura
- `invoice.payment_succeeded` - Pagamento bem-sucedido
- `invoice.payment_failed` - Pagamento falhado

#### Uso no Código

```typescript
import { createSubscription, cancelSubscription } from "./integrations/stripe";

// Criar assinatura
const { subscriptionId } = await createSubscription(customerId, stripePriceId);

// Cancelar assinatura
await cancelSubscription(subscriptionId);
```

### 2. SendGrid (E-mails)

#### Setup

1. Criar conta em [sendgrid.com](https://sendgrid.com)
2. Gerar API Key
3. Verificar domínio de envio
4. Criar templates de e-mail

#### Templates Necessários

- Confirmação de cadastro
- Lembrete de manutenção
- Relatório mensal
- Recuperação de senha
- Confirmação de pagamento

#### Uso no Código

```typescript
import { sendMaintenanceReminder, sendWelcomeEmail } from "./integrations/sendgrid";

// Enviar lembrete
await sendMaintenanceReminder(email, vehicleInfo, maintenanceType, nextDueKm);

// Enviar boas-vindas
await sendWelcomeEmail(email, userName);
```

### 3. Twilio (SMS/WhatsApp)

#### Setup

1. Criar conta em [twilio.com](https://twilio.com)
2. Obter Account SID e Auth Token
3. Configurar número de telefone para SMS
4. Configurar número WhatsApp Business
5. Validar números de teste

#### Uso no Código

```typescript
import { 
  sendMaintenanceReminderSMS,
  sendMaintenanceReminderWhatsApp 
} from "./integrations/twilio";

// Enviar SMS
await sendMaintenanceReminderSMS(phoneNumber, vehicleInfo, maintenanceType);

// Enviar WhatsApp
await sendMaintenanceReminderWhatsApp(phoneNumber, vehicleInfo, maintenanceType);
```

### 4. Google Analytics

#### Setup

1. Criar propriedade em [analytics.google.com](https://analytics.google.com)
2. Obter Measurement ID (G-...)
3. Configurar Data Stream
4. Gerar API Secret para server-side tracking

#### Eventos Rastreados

- `sign_up` - Novo usuário
- `vehicle_created` - Veículo cadastrado
- `subscription_upgrade` - Upgrade de plano
- `maintenance_reminder_sent` - Lembrete enviado
- `page_view` - Visualização de página

#### Uso no Código

```typescript
import { trackSignup, trackVehicleCreated } from "./integrations/analytics";

await trackSignup(userId, plan, email);
await trackVehicleCreated(userId, brand, model);
```

### 5. Meta Pixel

#### Setup

1. Criar Pixel em [facebook.com/business](https://facebook.com/business)
2. Obter ID do Pixel
3. Gerar token de acesso

#### Eventos Rastreados

- `Lead` - Novo lead
- `Purchase` - Compra/assinatura
- `ViewContent` - Visualização de conteúdo

#### Uso no Código

```typescript
import { trackMetaPixelEvent } from "./integrations/analytics";

await trackMetaPixelEvent("Purchase", {
  content_name: "Upgrade to Premium",
  value: 29.90,
  currency: "BRL"
});
```

### 6. LLM (Claude/GPT)

#### Setup

Já integrado via Manus Built-in API. Sem configuração adicional necessária.

#### Casos de Uso

- Análise de histórico de manutenção
- Geração de relatórios em linguagem natural
- Responder perguntas sobre manutenção
- Prever próximas manutenções

#### Uso no Código

```typescript
import { analyzeMaintenance, predictMaintenanceNeeds } from "./integrations/llm";

const analysis = await analyzeMaintenance(vehicleInfo, history, currentKm);
const predictions = await predictMaintenanceNeeds(vehicleInfo, currentKm, yearsOwned);
```

### 7. S3 Storage (Manus Built-in)

#### Setup

Já integrado via Manus Built-in API. Sem configuração adicional necessária.

#### Casos de Uso

- Armazenar relatórios PDF
- Armazenar imagens de veículos
- Armazenar documentos

#### Uso no Código

```typescript
import { storagePut, storageGet } from "./server/storage";

// Upload
const { key, url } = await storagePut(
  `relatorios/relatorio_${Date.now()}.pdf`,
  pdfBuffer,
  "application/pdf"
);

// Download
const { url: downloadUrl } = await storageGet(key, 300); // 5 minutos
```

---

## Guia de Deployment

### Deploy do Frontend (Vercel)

#### 1. Conectar Repositório

```bash
# Fazer push para GitHub
git push origin main

# Conectar no Vercel
vercel link
```

#### 2. Configurar Variáveis de Ambiente

No dashboard do Vercel:
- `VITE_APP_ID`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`
- `VITE_APP_TITLE`
- `VITE_APP_LOGO`

#### 3. Deploy

```bash
vercel --prod
```

### Deploy do Backend (Render)

#### 1. Criar Serviço

- Ir para [render.com](https://render.com)
- Conectar repositório GitHub
- Selecionar branch `main`
- Configurar como Node.js

#### 2. Configurar Variáveis de Ambiente

- `DATABASE_URL`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SENDGRID_API_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `BUILT_IN_FORGE_API_KEY`
- `BUILT_IN_FORGE_API_URL`

#### 3. Build Command

```bash
pnpm install && pnpm db:push && pnpm build
```

#### 4. Start Command

```bash
pnpm start
```

---

## Troubleshooting

### Erro: "Cannot find module 'uuid'"

**Solução:**
```bash
pnpm add uuid
pnpm add -D @types/uuid
```

### Erro: "Database connection failed"

**Solução:**
1. Verificar `DATABASE_URL`
2. Verificar credenciais do banco
3. Verificar se o banco está rodando
4. Testar conexão: `mysql -u usuario -p -h host banco`

### Erro: "Stripe webhook not working"

**Solução:**
1. Verificar Webhook Secret
2. Verificar URL do webhook
3. Testar com Stripe CLI: `stripe trigger payment_intent.succeeded`

### Erro: "SendGrid API key invalid"

**Solução:**
1. Regenerar API Key em SendGrid dashboard
2. Verificar se a chave está correta em `.env.local`
3. Testar com curl:
```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header "Authorization: Bearer $SENDGRID_API_KEY" \
  --header 'Content-Type: application/json'
```

### Erro: "OAuth callback not working"

**Solução:**
1. Verificar `VITE_APP_ID`
2. Verificar `OAUTH_SERVER_URL`
3. Verificar redirect URI configurada no Manus
4. Limpar cookies e tentar novamente

---

## Suporte e Recursos

- **Documentação Manus:** https://docs.manus.im
- **Documentação Stripe:** https://stripe.com/docs
- **Documentação SendGrid:** https://sendgrid.com/docs
- **Documentação Twilio:** https://www.twilio.com/docs
- **Documentação tRPC:** https://trpc.io/docs
- **Documentação Drizzle ORM:** https://orm.drizzle.team

---

**Última atualização:** Novembro de 2025
**Versão:** 1.0.0

