import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Car, Bell, BarChart3, Shield, Zap, Users } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">{APP_TITLE}</span>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="default">Meu Painel</Button>
              </Link>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="outline">Entrar</Button>
                </a>
                <a href={getLoginUrl()}>
                  <Button variant="default">Cadastrar Grátis</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              🚘 Seu carro sempre em dia, sem surpresas!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tenha o controle total das manutenções do seu veículo com lembretes inteligentes. Evite esquecimentos, mantenha o carro novo por mais tempo e receba alertas personalizados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={getLoginUrl()}>
                <Button size="lg" className="w-full sm:w-auto">
                  🚀 Cadastrar meu veículo grátis
                </Button>
              </a>
              <a href={getLoginUrl()}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  🔧 Sou mecânico, quero fidelizar meus clientes
                </Button>
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl h-96 flex items-center justify-center">
              <Car className="w-48 h-48 text-white opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Por que escolher Troca Certa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bell,
                title: "Lembretes Inteligentes",
                description: "Receba notificações por e-mail ou WhatsApp no momento exato da manutenção preventiva.",
              },
              {
                icon: BarChart3,
                title: "Histórico Completo",
                description: "Acompanhe todas as manutenções realizadas com datas, custos e detalhes técnicos.",
              },
              {
                icon: Shield,
                title: "Segurança Garantida",
                description: "Seus dados estão protegidos com criptografia de ponta a ponta e conformidade LGPD.",
              },
              {
                icon: Zap,
                title: "Análise Inteligente",
                description: "IA analisa km e tempo desde a última troca para sugerir revisões personalizadas.",
              },
              {
                icon: Users,
                title: "Para Mecânicos",
                description: "Fidelização automática de clientes com lembretes e relatórios mensais.",
              },
              {
                icon: Car,
                title: "Multi-Veículos",
                description: "Gerencie quantos veículos precisar no seu plano. Carro, moto, frota inteira.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Planos que cabem no seu bolso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Grátis",
                price: "R$ 0",
                features: ["1 veículo", "Apenas óleo", "Lembretes por e-mail"],
                cta: "Começar Grátis",
              },
              {
                name: "Básico",
                price: "R$ 9,90",
                period: "/mês",
                features: ["Até 3 veículos", "Todas as manutenções", "E-mail + WhatsApp"],
                cta: "Assinar Agora",
                highlighted: false,
              },
              {
                name: "Premium",
                price: "R$ 29,90",
                period: "/mês",
                features: ["Até 10 veículos", "Análise IA", "Relatórios PDF"],
                cta: "Assinar Agora",
                highlighted: true,
              },
              {
                name: "Empresas",
                price: "R$ 99,90",
                period: "/mês",
                features: ["Até 100 veículos", "Relatórios mensais", "Suporte prioritário"],
                cta: "Falar com Vendas",
              },
              {
                name: "Mecânicas",
                price: "R$ 199,90",
                period: "/mês",
                features: ["1000 clientes", "Fidelização", "Relatórios automáticos"],
                cta: "Falar com Vendas",
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 border-2 transition-all ${
                  plan.highlighted
                    ? "border-blue-600 bg-blue-50 shadow-xl scale-105"
                    : "border-gray-200 bg-white hover:border-blue-200"
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-blue-600">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Cadastre seu primeiro veículo grátis e comece a receber lembretes inteligentes hoje mesmo.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" variant="secondary" className="text-blue-600">
              🚀 Cadastrar meu veículo grátis
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Sobre</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Recursos</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:contato@trocacerta.com" className="hover:text-white">contato@trocacerta.com</a></li>
                <li><a href="tel:+5511999999999" className="hover:text-white">+55 (11) 99999-9999</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Troca Certa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

