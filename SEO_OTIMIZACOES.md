# 🔍 Guia de SEO e Otimizações - Troca Certa

## Palavras-chave Principais

### Tier 1 (Alta Prioridade)
- revisão automotiva
- troca de óleo
- lembrete de manutenção
- controle de veículos
- app de manutenção

### Tier 2 (Média Prioridade)
- carro usado
- manutenção preventiva
- aplicativo automotivo
- gestão de frota
- fidelização de clientes mecânica

### Tier 3 (Baixa Prioridade)
- revisão de moto
- alerta de troca
- manutenção de carro
- sistema de lembretes
- histórico de manutenção

---

## Otimizações On-Page

### Home Page

#### Meta Tags
```html
<meta name="description" content="Troca Certa - Seu carro sempre em dia, sem surpresas! Lembretes inteligentes de manutenção por e-mail e WhatsApp. Cadastre grátis e controle tudo.">
<meta name="keywords" content="revisão automotiva, troca de óleo, lembrete de manutenção, controle de veículos, app de manutenção">
<meta name="og:title" content="Troca Certa - Manutenção Automotiva Inteligente">
<meta name="og:description" content="Lembretes automáticos de manutenção para seu carro ou moto. Evite esquecimentos e mantenha seu veículo sempre em dia.">
<meta name="og:image" content="https://trocacerta.com/og-image.png">
```

#### Heading Structure
```
H1: Seu carro sempre em dia, sem surpresas!
H2: Por que escolher Troca Certa?
H2: Planos que cabem no seu bolso
H2: Pronto para começar?
H3: Lembretes Inteligentes
H3: Histórico Completo
H3: Segurança Garantida
```

#### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Troca Certa",
  "description": "Sistema inteligente de manutenção automotiva",
  "url": "https://trocacerta.com",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250"
  }
}
```

### Páginas de Pricing

#### Meta Tags
```html
<meta name="description" content="Planos de assinatura do Troca Certa. Grátis, Básico, Premium, Empresas e Mecânicas. Escolha o plano ideal para você.">
```

#### Conteúdo
- Comparação clara de planos
- Destaque do plano Premium (mais popular)
- CTA forte para cada plano
- FAQ sobre planos

### Blog/Recursos

#### Tópicos Recomendados
1. "Guia Completo de Manutenção Preventiva"
2. "Como Aumentar a Vida Útil do Seu Carro"
3. "Manutenção de Carros Usados: O Que Você Precisa Saber"
4. "Dicas para Economizar em Manutenção Automotiva"
5. "Sistema de Lembretes de Manutenção: Por Que É Importante"

---

## Otimizações Técnicas

### Performance

#### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

#### Otimizações
```typescript
// 1. Code Splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// 2. Image Optimization
<img 
  src="hero.webp" 
  alt="Seu carro sempre em dia"
  loading="lazy"
  width="800"
  height="600"
/>

// 3. CSS Minification
// Tailwind CSS já minifica automaticamente

// 4. JavaScript Minification
// Vite minifica automaticamente em produção
```

### Core Web Vitals

#### LCP (Largest Contentful Paint)
- Target: < 2.5s
- Otimizações:
  - Preload fontes críticas
  - Lazy load imagens
  - Minify CSS/JS

#### FID (First Input Delay)
- Target: < 100ms
- Otimizações:
  - Reduzir JavaScript
  - Usar Web Workers
  - Debounce event handlers

#### CLS (Cumulative Layout Shift)
- Target: < 0.1
- Otimizações:
  - Reservar espaço para imagens
  - Evitar inserções dinâmicas acima do fold
  - Usar font-display: swap

### Robots.txt

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /admin/

Sitemap: https://trocacerta.com/sitemap.xml
```

### Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://trocacerta.com/</loc>
    <lastmod>2025-11-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://trocacerta.com/pricing</loc>
    <lastmod>2025-11-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://trocacerta.com/blog</loc>
    <lastmod>2025-11-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## Estratégia de Link Building

### Links Internos

#### Home
- → Pricing
- → Blog
- → Dashboard (autenticado)

#### Pricing
- → Home
- → Blog (artigos relacionados)
- → Testimonials

#### Blog
- → Home
- → Pricing
- → Outros artigos (relacionados)

### Links Externos (Outreach)

#### Parceiros Potenciais
1. Blogs automotivos
2. Portais de carros usados
3. Fóruns de proprietários de veículos
4. Canais de YouTube automotivos
5. Influenciadores automotivos

#### Estratégia de Guest Posting
- "5 Formas de Manter Seu Carro Usado em Perfeito Estado"
- "Como Implementar Manutenção Preventiva Eficaz"
- "Tecnologia para Proprietários de Veículos"

---

## Estratégia de Conteúdo

### Blog Posts (Roadmap)

#### Mês 1
1. "Guia Completo de Manutenção Preventiva" (1500 palavras)
2. "Como Aumentar a Vida Útil do Seu Carro" (1200 palavras)
3. "Manutenção de Carros Usados: O Que Você Precisa Saber" (1400 palavras)

#### Mês 2
4. "Dicas para Economizar em Manutenção Automotiva" (1100 palavras)
5. "Sistema de Lembretes de Manutenção: Por Que É Importante" (1300 palavras)
6. "Manutenção de Motos: Guia Prático" (1200 palavras)

#### Mês 3
7. "Gestão de Frota: Como Otimizar Custos" (1500 palavras)
8. "Fidelização de Clientes em Oficinas Mecânicas" (1400 palavras)

### Estrutura de Blog Post

```markdown
# [Palavra-chave Principal]

## Introdução (150-200 palavras)
- Gancho emocional
- Problema do leitor
- Solução proposta

## [Subtópico 1] (300-400 palavras)
- Explicação detalhada
- Exemplos práticos
- Benefícios

## [Subtópico 2] (300-400 palavras)
- Continuação do tema
- Mais exemplos
- Dicas práticas

## [Subtópico 3] (300-400 palavras)
- Aprofundamento
- Casos de uso
- Estatísticas

## Conclusão (150-200 palavras)
- Resumo dos pontos principais
- CTA (Call to Action)
- Link para próximo passo

## FAQ (200-300 palavras)
- 3-5 perguntas frequentes
- Respostas concisas
```

---

## Estratégia de Social Media

### Plataformas Principais
1. **Instagram** - Dicas visuais, antes/depois, testimonials
2. **Facebook** - Conteúdo mais longo, comunidade
3. **LinkedIn** - B2B, para mecânicos e empresas
4. **TikTok** - Dicas rápidas, humor, trends

### Conteúdo Recomendado

#### Instagram
- Dica de manutenção (carousel)
- Testimonial de usuário (story)
- Comparação de planos (reels)
- Atrás das câmeras (story)

#### Facebook
- Artigos do blog
- Discussões sobre manutenção
- Eventos/webinars
- Ofertas especiais

#### LinkedIn
- Case studies de mecânicos
- Estatísticas de manutenção
- Dicas para gestão de frota
- Notícias da indústria

#### TikTok
- Dicas de 15-60 segundos
- Humor automotivo
- Trends com tema automotivo
- Testimonials curtos

---

## Análise e Monitoramento

### Métricas Principais

#### Google Analytics
- Visitantes únicos
- Taxa de rejeição
- Tempo médio na página
- Conversão (cadastro/assinatura)
- Origem do tráfego

#### Google Search Console
- Palavras-chave de ranking
- Posição média
- CTR
- Impressões
- Erros de rastreamento

#### Ferramentas Recomendadas
- Ahrefs (backlinks, keywords)
- SEMrush (análise competitiva)
- Moz (autoridade de domínio)
- Ubersuggest (ideias de conteúdo)

### Relatórios Mensais

```
SEO Report - Novembro 2025

1. Tráfego Orgânico
   - Visitantes: 5.234 (+12%)
   - Sessões: 6.145 (+15%)
   - Taxa de rejeição: 32% (-2%)

2. Rankings
   - Top 10: 8 palavras-chave
   - Top 3: 2 palavras-chave
   - Palavras-chave novas: 5

3. Backlinks
   - Novos: 12
   - Domínios referentes: 45
   - DA médio: 42

4. Conversões
   - Cadastros: 234 (+18%)
   - Assinaturas: 45 (+22%)
   - Taxa de conversão: 3.2%
```

---

## Checklist de Otimização

### On-Page
- [ ] Meta title (50-60 caracteres)
- [ ] Meta description (150-160 caracteres)
- [ ] H1 único
- [ ] Estrutura de headings correta
- [ ] Alt text em imagens
- [ ] URLs amigáveis
- [ ] Internal links
- [ ] Schema markup

### Técnico
- [ ] Mobile-friendly
- [ ] Core Web Vitals otimizados
- [ ] SSL/HTTPS
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Structured data
- [ ] Canonical tags

### Off-Page
- [ ] Backlinks de qualidade
- [ ] Menções de marca
- [ ] Social signals
- [ ] Local SEO (se aplicável)

### Conteúdo
- [ ] Palavra-chave no título
- [ ] Palavra-chave nos primeiros 100 palavras
- [ ] Densidade de palavra-chave (1-2%)
- [ ] Conteúdo único e original
- [ ] Comprimento mínimo (1000 palavras)
- [ ] Imagens otimizadas

---

**Última atualização:** Novembro de 2025
**Responsável:** Marketing/SEO Team

