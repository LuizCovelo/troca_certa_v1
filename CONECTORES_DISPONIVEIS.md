# 🔌 Conectores Disponíveis - Troca Certa

## Resumo Executivo

Este documento lista todos os conectores (integrações) que estão **disponíveis nativamente** no ambiente Manus e que serão implementados no projeto **Troca Certa**. Cada conector inclui sua finalidade, status de implementação e instruções de uso.

---

## 📊 Matriz de Conectores

| # | Conector | Categoria | Status | Prioridade | Descrição |
|---|----------|-----------|--------|-----------|-----------|
| 1 | **Manus Auth (OAuth)** | Autenticação | ✅ Integrado | ALTA | Autenticação nativa via Manus OAuth |
| 2 | **Supabase (PostgreSQL)** | Banco de Dados | ✅ Disponível | ALTA | Banco de dados relacional com autenticação integrada |
| 3 | **Stripe** | Pagamentos | ✅ Disponível | ALTA | Processamento de pagamentos e assinaturas recorrentes |
| 4 | **GitHub** | Controle de Versão | ✅ Disponível | MÉDIA | Repositório de código e CI/CD |
| 5 | **Vercel** | Deploy/Hospedagem | ✅ Disponível | ALTA | Hospedagem de frontend com CI/CD automático |
| 6 | **SendGrid** | E-mail | ✅ Disponível | ALTA | Envio de e-mails transacionais e marketing |
| 7 | **Twilio** | SMS/WhatsApp | ✅ Disponível | ALTA | Envio de mensagens SMS e WhatsApp |
| 8 | **Google Analytics** | Analytics | ✅ Disponível | MÉDIA | Rastreamento de tráfego e comportamento do usuário |
| 9 | **Meta Pixel** | Analytics | ✅ Disponível | MÉDIA | Rastreamento de conversões do Facebook/Instagram |
| 10 | **LLM (Claude/GPT)** | IA/ML | ✅ Disponível | MÉDIA | Processamento de linguagem natural para análise de manutenção |
| 11 | **Image Generation** | IA/Imagens | ✅ Disponível | BAIXA | Geração de imagens para relatórios |
| 12 | **Voice Transcription** | IA/Áudio | ✅ Disponível | BAIXA | Transcrição de áudio para notas de manutenção |
| 13 | **S3 Storage** | Armazenamento | ✅ Integrado | ALTA | Armazenamento de arquivos, relatórios PDF e documentos |
| 14 | **Data API** | Dados Externos | ✅ Disponível | BAIXA | Acesso a dados públicos e APIs externas |

---

## 🔐 Conectores Implementados (Já Integrados)

### 1. **Manus Auth (OAuth)**
- **Status:** ✅ Integrado nativamente
- **Finalidade:** Autenticação de usuários via Manus OAuth
- **Variáveis de Ambiente:**
  - `VITE_APP_ID` - ID da aplicação
  - `OAUTH_SERVER_URL` - URL do servidor OAuth
  - `VITE_OAUTH_PORTAL_URL` - URL do portal de login
  - `JWT_SECRET` - Chave para assinatura de sessões
- **Implementação:** Já configurado em `server/_core/context.ts`
- **Uso:** Autenticação de usuários com login automático

### 2. **S3 Storage**
- **Status:** ✅ Integrado nativamente
- **Finalidade:** Armazenamento de arquivos, relatórios e documentos
- **Variáveis de Ambiente:**
  - `BUILT_IN_FORGE_API_KEY` - Chave de API
  - `BUILT_IN_FORGE_API_URL` - URL da API
- **Implementação:** Disponível em `server/storage.ts`
- **Uso:** Upload de relatórios PDF, imagens de veículos, documentos
- **Exemplo:**
  ```ts
  import { storagePut, storageGet } from "./server/storage";
  
  const { key, url } = await storagePut(
    `relatorios/${Date.now()}-relatorio.pdf`,
    pdfBuffer,
    "application/pdf"
  );
  ```

---

## 🔌 Conectores a Implementar (Recomendados)

### 1. **Supabase (Banco de Dados)**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Banco de dados relacional PostgreSQL com autenticação integrada
- **Por que usar:** Alternativa ao MongoDB com melhor integração com o ecossistema Manus
- **Variáveis de Ambiente Necessárias:**
  - `SUPABASE_URL` - URL da instância Supabase
  - `SUPABASE_ANON_KEY` - Chave pública
  - `SUPABASE_SERVICE_ROLE_KEY` - Chave de serviço (backend)
- **Implementação Recomendada:**
  - Migrar do MySQL atual para PostgreSQL via Supabase
  - Usar Drizzle ORM (já configurado) com driver PostgreSQL
  - Implementar Row Level Security (RLS) para segurança
- **Prioridade:** ALTA - Essencial para o projeto

### 2. **Stripe (Pagamentos)**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Processamento de pagamentos e assinaturas recorrentes
- **Por que usar:** Melhor que Mercado Pago para SaaS internacional, com webhooks robustos
- **Variáveis de Ambiente Necessárias:**
  - `STRIPE_SECRET_KEY` - Chave secreta
  - `STRIPE_PUBLISHABLE_KEY` - Chave pública
  - `STRIPE_WEBHOOK_SECRET` - Chave para validar webhooks
- **Planos a Implementar:**
  - Grátis: 1 veículo, apenas óleo
  - Básico: R$9,90/mês - 3 veículos
  - Premium: R$29,90/mês - 10 veículos
  - Empresas: R$99,90/mês - 100 veículos
  - Mecânicas: R$199,90 ou R$299,90/mês
- **Implementação:**
  - Criar produtos e preços no Stripe Dashboard
  - Implementar checkout via Stripe Elements
  - Configurar webhooks para atualizar status de assinatura
  - Armazenar `stripeCustomerId` e `stripeSubscriptionId` no banco
- **Prioridade:** ALTA - Essencial para monetização

### 3. **SendGrid (E-mail)**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Envio de e-mails transacionais e marketing
- **Por que usar:** Melhor entrega, templates avançados, análise de engajamento
- **Variáveis de Ambiente Necessárias:**
  - `SENDGRID_API_KEY` - Chave de API
  - `SENDGRID_FROM_EMAIL` - E-mail de origem
- **Templates a Criar:**
  - Confirmação de cadastro
  - Lembrete de manutenção
  - Relatório mensal
  - Recuperação de senha
  - Notificação de pagamento
- **Implementação:**
  - Criar templates dinâmicos no SendGrid
  - Implementar fila de e-mails para envio assíncrono
  - Rastrear bounces e unsubscribes
- **Prioridade:** ALTA - Essencial para lembretes

### 4. **Twilio (SMS/WhatsApp)**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Envio de mensagens SMS e WhatsApp
- **Por que usar:** Integração unificada para SMS e WhatsApp, webhooks para respostas
- **Variáveis de Ambiente Necessárias:**
  - `TWILIO_ACCOUNT_SID` - ID da conta
  - `TWILIO_AUTH_TOKEN` - Token de autenticação
  - `TWILIO_PHONE_NUMBER` - Número de telefone (SMS)
  - `TWILIO_WHATSAPP_NUMBER` - Número WhatsApp Business
- **Implementação:**
  - Validar números de telefone antes de enviar
  - Implementar fila de mensagens
  - Rastrear status de entrega
  - Suportar opt-in/opt-out
- **Prioridade:** ALTA - Essencial para lembretes

### 5. **GitHub**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Controle de versão e CI/CD
- **Por que usar:** Integração com Vercel, Actions para testes e deploy automático
- **Implementação:**
  - Repositório privado para código
  - GitHub Actions para testes automatizados
  - Integração com Vercel para deploy automático
  - Branch protection rules
- **Prioridade:** ALTA - Essencial para desenvolvimento

### 6. **Vercel (Deploy)**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Hospedagem de frontend com CI/CD automático
- **Por que usar:** Integração perfeita com Next.js, deploy automático via Git
- **Implementação:**
  - Conectar repositório GitHub
  - Configurar variáveis de ambiente
  - Configurar domínio customizado
  - Habilitar Analytics
- **Prioridade:** ALTA - Essencial para produção

### 7. **Google Analytics**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Rastreamento de tráfego e comportamento do usuário
- **Variáveis de Ambiente Necessárias:**
  - `VITE_ANALYTICS_ENDPOINT` - Endpoint do Google Analytics
  - `VITE_ANALYTICS_WEBSITE_ID` - ID do website
- **Implementação:**
  - Rastrear eventos de cadastro
  - Rastrear eventos de login
  - Rastrear eventos de assinatura
  - Rastrear páginas visitadas
- **Prioridade:** MÉDIA - Importante para métricas

### 8. **Meta Pixel**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Rastreamento de conversões do Facebook/Instagram
- **Implementação:**
  - Instalar pixel no frontend
  - Rastrear eventos de conversão
  - Criar públicos customizados para remarketing
- **Prioridade:** MÉDIA - Importante para marketing

### 9. **LLM (Claude/GPT)**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Processamento de linguagem natural para análise de manutenção
- **Variáveis de Ambiente:**
  - `BUILT_IN_FORGE_API_KEY` - Chave de API (já configurada)
- **Casos de Uso:**
  - Analisar histórico de manutenção e sugerir próximas ações
  - Gerar relatórios em linguagem natural
  - Responder perguntas sobre manutenção via chatbot
  - Análise de padrões de manutenção
- **Implementação:**
  ```ts
  import { invokeLLM } from "./server/_core/llm";
  
  const analysis = await invokeLLM({
    messages: [
      { role: "system", content: "Você é um especialista em manutenção automotiva." },
      { role: "user", content: `Analise este histórico: ${maintenanceHistory}` }
    ]
  });
  ```
- **Prioridade:** MÉDIA - Adiciona valor ao produto

### 10. **Image Generation**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Geração de imagens para relatórios e documentos
- **Casos de Uso:**
  - Gerar gráficos de manutenção
  - Criar capas de relatórios
  - Gerar imagens para marketing
- **Implementação:**
  ```ts
  import { generateImage } from "./server/_core/imageGeneration";
  
  const { url } = await generateImage({
    prompt: "Gráfico de manutenção de carro com cores profissionais"
  });
  ```
- **Prioridade:** BAIXA - Complementar

### 11. **Voice Transcription**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Transcrição de áudio para notas de manutenção
- **Casos de Uso:**
  - Usuário grava nota de voz sobre manutenção realizada
  - Sistema transcreve e salva no histórico
- **Implementação:**
  ```ts
  import { transcribeAudio } from "./server/_core/voiceTranscription";
  
  const { text } = await transcribeAudio({
    audioUrl: "https://storage.example.com/audio.mp3",
    language: "pt"
  });
  ```
- **Prioridade:** BAIXA - Complementar

### 12. **Data API**
- **Status:** ✅ Disponível para integração
- **Finalidade:** Acesso a dados públicos e APIs externas
- **Casos de Uso:**
  - Buscar dados de modelos de carros
  - Integrar com APIs de tabela FIPE (preço de carros)
  - Buscar dados de concessionárias
- **Prioridade:** BAIXA - Complementar

---

## 📋 Plano de Implementação Faseado

### **Fase 1: Infraestrutura Base (Semana 1-2)**
- ✅ Inicializar projeto com Manus Auth
- ✅ Configurar S3 Storage
- 🔲 Migrar banco de dados para Supabase (PostgreSQL)
- 🔲 Configurar GitHub e Vercel

### **Fase 2: Monetização (Semana 2-3)**
- 🔲 Integrar Stripe para pagamentos
- 🔲 Implementar sistema de planos
- 🔲 Criar painel de gerenciamento de assinaturas

### **Fase 3: Comunicação (Semana 3-4)**
- 🔲 Integrar SendGrid para e-mails
- 🔲 Integrar Twilio para SMS/WhatsApp
- 🔲 Implementar sistema de lembretes automáticos

### **Fase 4: Analytics e Marketing (Semana 4-5)**
- 🔲 Integrar Google Analytics
- 🔲 Integrar Meta Pixel
- 🔲 Configurar eventos de rastreamento

### **Fase 5: IA e Enhancements (Semana 5-6)**
- 🔲 Integrar LLM para análise de manutenção
- 🔲 Integrar Image Generation para relatórios
- 🔲 Integrar Voice Transcription para notas

---

## 🚀 Próximos Passos

1. **Confirmar Conectores:** Você quer que eu implemente todos estes conectores ou deseja priorizar alguns?
2. **Credenciais:** Você possui contas em Supabase, Stripe, SendGrid e Twilio?
3. **Começar Implementação:** Devo começar pela Fase 1 (Infraestrutura) ou prefere outra ordem?

---

## 📞 Suporte

Para dúvidas sobre qualquer conector, consulte a documentação específica ou solicite ajuda durante a implementação.

