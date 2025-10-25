# 🧪 Guia Completo de Testes - Troca Certa

## Índice
1. [Testes Pré-Deploy](#testes-pré-deploy)
2. [Testes Pós-Deploy](#testes-pós-deploy)
3. [Testes de Integração](#testes-de-integração)
4. [Testes de Performance](#testes-de-performance)
5. [Testes de Segurança](#testes-de-segurança)

---

## Testes Pré-Deploy

### 1. Verificar Build Local

```bash
# Instalar dependências
pnpm install

# Fazer build
pnpm build

# Esperado:
# ✅ Build completa sem erros
# ✅ Pasta dist/ criada
# ✅ Arquivo .env.production preenchido
```

### 2. Testar Localmente

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Abrir no navegador
http://localhost:3000

# Verificar:
□ Página inicial carrega
□ Sem erros no console
□ Imagens aparecem
□ Botões funcionam
□ Responsivo em mobile (F12)
```

### 3. Verificar Variáveis de Ambiente

```bash
# Verificar se todas as variáveis estão preenchidas
cat .env.production

# Esperado:
VITE_APP_ID=✅ preenchido
OAUTH_SERVER_URL=✅ preenchido
DATABASE_URL=✅ preenchido
STRIPE_SECRET_KEY=✅ preenchido
SENDGRID_API_KEY=✅ preenchido
... (todas preenchidas)
```

### 4. Verificar Banco de Dados

```bash
# Testar conexão com Supabase
psql $DATABASE_URL -c "SELECT 1"

# Esperado:
# (1 row)

# Verificar tabelas
psql $DATABASE_URL -c "\dt"

# Esperado:
# users
# vehicles
# maintenanceHistory
# maintenanceReminders
# notificationsLog
# subscriptions
```

---

## Testes Pós-Deploy

### ✅ Teste 1: Frontend Acessível

**URL:** `https://troca-certa.vercel.app`

```
Checklist:
□ Página carrega em < 3 segundos
□ Sem erros no console (F12 → Console)
□ Logo aparece
□ Menu de navegação funciona
□ Botões são clicáveis
□ Responsive em mobile (F12 → Toggle device)
□ Footer aparece
□ Links funcionam
□ Pricing page carrega
□ Sem imagens quebradas
```

**Teste de Performance:**
```bash
# Abrir DevTools (F12)
# Ir para aba "Lighthouse"
# Clicar "Analyze page load"

# Esperado:
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 100
```

### ✅ Teste 2: Autenticação

```
Checklist:
□ Clicar "Login"
□ Redireciona para OAuth
□ Consegue fazer login
□ Redireciona para /dashboard
□ Nome do usuário aparece
□ Foto de perfil aparece (se disponível)
□ Botão "Logout" funciona
□ Após logout, redireciona para home
□ Consegue fazer login novamente
```

### ✅ Teste 3: Dashboard de Usuário

**URL:** `https://troca-certa.vercel.app/dashboard`

```
Checklist:
□ Dashboard carrega
□ Mensagem de boas-vindas aparece
□ Botão "Adicionar Veículo" funciona
□ Clicar em veículo abre detalhes
□ Histórico de manutenção aparece
□ Próximas manutenções aparecem
□ Botão "Editar" funciona
□ Botão "Deletar" funciona
□ Plano atual aparece
□ Botão "Upgrade" funciona
```

### ✅ Teste 4: Adicionar Veículo

```
Passos:
1. Ir para /dashboard
2. Clicar "Adicionar Veículo"
3. Preencher:
   - Marca: Toyota
   - Modelo: Corolla
   - Ano: 2020
   - Placa: ABC-1234
   - Combustível: Gasolina
   - Quilometragem: 50000
4. Clicar "Salvar"

Esperado:
□ Veículo aparece na lista
□ Dados são salvos no banco
□ Pode editar veículo
□ Pode deletar veículo
□ Próximas manutenções aparecem
```

### ✅ Teste 5: Backend API

```bash
# Testar health check
curl https://troca-certa-api.onrender.com/health

# Esperado:
{"status":"ok"}

# Testar tRPC
curl https://troca-certa-api.onrender.com/api/trpc/auth.me

# Esperado:
{"result":{"data":null}}

# Testar com autenticação
curl -H "Cookie: session=seu_token" \
  https://troca-certa-api.onrender.com/api/trpc/auth.me

# Esperado:
{"result":{"data":{"id":"...","email":"...","name":"..."}}}
```

### ✅ Teste 6: Banco de Dados

```bash
# Conectar ao Supabase
psql postgresql://postgres:password@host:5432/postgres

# Verificar usuários
SELECT id, email, role, plan FROM users LIMIT 5;

# Esperado:
# Seus usuários de teste aparecem

# Verificar veículos
SELECT id, brand, model, year FROM vehicles LIMIT 5;

# Esperado:
# Veículos que você criou aparecem

# Verificar manutenções
SELECT * FROM maintenanceHistory LIMIT 5;

# Esperado:
# Histórico de manutenções aparece
```

---

## Testes de Integração

### ✅ Teste 1: Stripe (Pagamentos)

**Pré-requisito:** Estar logado

```
Passos:
1. Ir para /pricing
2. Clicar "Assinar Agora" no plano Premium
3. Preencher formulário de pagamento:
   - Cartão: 4242 4242 4242 4242
   - Validade: 12/25
   - CVC: 123
   - Nome: Test User
4. Clicar "Pagar"

Esperado:
□ Pagamento é processado
□ Recebe confirmação na tela
□ Recebe e-mail de confirmação
□ Plano é atualizado no dashboard
□ Acesso a recursos Premium é liberado
□ Stripe Dashboard mostra a transação
```

**Testar Falha de Pagamento:**
```
Cartão: 4000 0000 0000 0002
Esperado:
□ Pagamento é rejeitado
□ Mensagem de erro aparece
□ Plano não é alterado
```

### ✅ Teste 2: SendGrid (E-mails)

```
Checklist:
□ Ao fazer cadastro, recebe e-mail de boas-vindas
□ E-mail tem logo da empresa
□ E-mail tem links funcionais
□ Ao clicar "Esqueci a senha", recebe e-mail
□ Link de reset funciona
□ Ao fazer upgrade, recebe confirmação
□ E-mails chegam em < 1 minuto
□ E-mails não vão para spam
```

**Verificar em SendGrid:**
1. Ir para: https://sendgrid.com
2. Clicar **Activity** → **Email Activity**
3. Ver lista de e-mails enviados
4. Clicar em e-mail para ver detalhes

### ✅ Teste 3: Twilio (SMS/WhatsApp)

**Pré-requisito:** Configurar número de telefone

```
Checklist:
□ Ao adicionar número, recebe SMS de confirmação
□ Ao configurar lembrete, recebe SMS
□ Ao configurar WhatsApp, recebe mensagem
□ Mensagens chegam em tempo real
□ Mensagens têm conteúdo correto
□ Mensagens têm link para dashboard
```

**Verificar em Twilio:**
1. Ir para: https://twilio.com/console
2. Clicar **Message Logs**
3. Ver SMS/WhatsApp enviados

### ✅ Teste 4: Google Analytics

```
Checklist:
□ Ir para Google Analytics
□ Verificar se eventos estão sendo rastreados:
  - page_view
  - sign_up
  - vehicle_created
  - subscription_upgrade
□ Usuários aparecem em tempo real
□ Sessões são contadas
□ Conversões são rastreadas
```

**Verificar:**
1. Ir para: https://analytics.google.com
2. Selecionar propriedade
3. Ir para **Real-time** → **Overview**
4. Fazer ações no site e ver eventos aparecerem

### ✅ Teste 5: Meta Pixel

```
Checklist:
□ Pixel está instalado (F12 → Network → buscar "facebook")
□ Eventos são enviados:
  - Lead (novo cadastro)
  - Purchase (assinatura)
  - ViewContent (visualização de página)
□ Conversões aparecem no Facebook Ads
```

**Verificar:**
1. Ir para: https://business.facebook.com
2. Selecionar Pixel
3. Ir para **Events Manager**
4. Ver eventos em tempo real

---

## Testes de Performance

### ✅ Teste 1: Tempo de Resposta API

```bash
# Medir tempo de resposta
time curl https://troca-certa-api.onrender.com/health

# Esperado:
# real    0m0.5s (< 1 segundo)

# Testar com carga
for i in {1..10}; do
  curl https://troca-certa-api.onrender.com/health &
done
wait

# Esperado:
# Todas as requisições respondem
# Tempo < 2 segundos cada
```

### ✅ Teste 2: Tempo de Carregamento

```bash
# Usar WebPageTest
https://www.webpagetest.org/

# Inserir URL: https://troca-certa.vercel.app
# Esperado:
# First Contentful Paint: < 1.5s
# Largest Contentful Paint: < 2.5s
# Cumulative Layout Shift: < 0.1
```

### ✅ Teste 3: Tamanho de Transferência

```bash
# F12 → Network → Reload
# Verificar:
□ Total size < 500KB
□ JS size < 300KB
□ CSS size < 50KB
□ Imagens otimizadas
□ Cache headers configurados
```

### ✅ Teste 4: Uptime

```bash
# Usar serviço de monitoramento
https://uptimerobot.com/

# Adicionar URLs:
- https://troca-certa.vercel.app
- https://troca-certa-api.onrender.com

# Esperado:
# Uptime > 99%
# Tempo de resposta < 1s
```

---

## Testes de Segurança

### ✅ Teste 1: HTTPS

```bash
# Verificar certificado SSL
curl -I https://troca-certa.vercel.app

# Esperado:
# HTTP/2 200
# Sem avisos de certificado

# Verificar se HTTP redireciona para HTTPS
curl -I http://troca-certa.vercel.app

# Esperado:
# HTTP/1.1 301 Moved Permanently
# Location: https://troca-certa.vercel.app
```

### ✅ Teste 2: Headers de Segurança

```bash
# Verificar headers
curl -I https://troca-certa.vercel.app | grep -i "security\|content\|x-"

# Esperado:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Strict-Transport-Security: max-age=...
# Content-Security-Policy: ...
```

### ✅ Teste 3: Autenticação

```
Checklist:
□ Sem autenticação, não consegue acessar /dashboard
□ Sem autenticação, não consegue acessar /admin
□ Sem autenticação, não consegue fazer requisições à API
□ Tokens expiram após 24 horas
□ Logout limpa cookies
□ CSRF protection está ativo
```

### ✅ Teste 4: Validação de Entrada

```
Passos:
1. Tentar adicionar veículo com dados inválidos:
   - Marca vazia
   - Ano futuro
   - Quilometragem negativa
2. Tentar fazer pagamento com dados inválidos:
   - Cartão inválido
   - Validade expirada
   - CVC inválido

Esperado:
□ Validação no frontend rejeita
□ Validação no backend rejeita
□ Mensagens de erro aparecem
□ Dados não são salvos
```

### ✅ Teste 5: SQL Injection

```
Passos:
1. Tentar adicionar veículo com marca: "'; DROP TABLE vehicles; --"
2. Tentar fazer login com e-mail: "' OR '1'='1"

Esperado:
□ Dados são escapados
□ Comando SQL não é executado
□ Dados não são alterados
□ Erro é registrado em logs
```

---

## Checklist Final de Testes

### Frontend
- [ ] Página carrega em < 3s
- [ ] Lighthouse score > 90
- [ ] Responsivo em mobile
- [ ] Sem erros no console
- [ ] Sem imagens quebradas
- [ ] Todos os links funcionam
- [ ] Formulários validam
- [ ] Mensagens de erro aparecem

### Backend
- [ ] Health check responde
- [ ] tRPC funciona
- [ ] Autenticação funciona
- [ ] Banco de dados conecta
- [ ] Migrações rodaram
- [ ] Logs aparecem
- [ ] Erros são tratados
- [ ] Performance > 100 req/s

### Banco de Dados
- [ ] Conecta via Supabase
- [ ] Todas as tabelas existem
- [ ] Índices estão criados
- [ ] Backups automáticos ativados
- [ ] Replicação configurada
- [ ] Logs de query disponíveis

### Integrações
- [ ] Stripe funciona
- [ ] SendGrid funciona
- [ ] Twilio funciona
- [ ] Google Analytics funciona
- [ ] Meta Pixel funciona
- [ ] Webhooks funcionam
- [ ] Erros são tratados

### Segurança
- [ ] HTTPS ativo
- [ ] Headers de segurança
- [ ] Autenticação funciona
- [ ] Validação de entrada
- [ ] SQL injection prevenido
- [ ] XSS prevenido
- [ ] CSRF prevenido

### Admin
- [ ] Painel admin acessível
- [ ] Métricas aparecem
- [ ] Usuários podem ser editados
- [ ] Assinaturas podem ser canceladas
- [ ] Relatórios podem ser gerados
- [ ] Configurações podem ser alteradas

---

## Próximos Passos Após Testes

1. ✅ Todos os testes passaram?
2. ✅ Documentação está atualizada?
3. ✅ Logs estão sendo monitorados?
4. ✅ Backups estão configurados?
5. ✅ Alertas estão ativados?
6. ✅ Domínio customizado configurado?
7. ✅ SSL/HTTPS ativo?
8. ✅ Pronto para produção!

---

**Última atualização:** Novembro de 2025
**Versão:** 1.0.0

