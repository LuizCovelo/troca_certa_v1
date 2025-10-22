import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BarChart3, Settings, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminPanel() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-12 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
          <p className="text-gray-600 mb-6">Você não tem permissão para acessar este painel.</p>
          <Button onClick={() => setLocation("/dashboard")}>Voltar ao Painel</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gerenciar usuários, planos e relatórios</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-gray-600 text-sm">Total de Usuários</p>
            <p className="text-3xl font-bold text-gray-900">1,234</p>
            <p className="text-xs text-green-600 mt-2">+12% este mês</p>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Receita Mensal</p>
            <p className="text-3xl font-bold text-gray-900">R$ 45.2K</p>
            <p className="text-xs text-green-600 mt-2">+8% este mês</p>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Veículos Cadastrados</p>
            <p className="text-3xl font-bold text-gray-900">3,456</p>
            <p className="text-xs text-green-600 mt-2">+15% este mês</p>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Taxa de Atividade</p>
            <p className="text-3xl font-bold text-gray-900">78%</p>
            <p className="text-xs text-green-600 mt-2">+3% este mês</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="bg-white rounded-lg border border-gray-200">
          <TabsList className="border-b border-gray-200 p-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Assinaturas
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Gerenciar Usuários</h3>
                <Button>Adicionar Usuário</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Nome</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">E-mail</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Plano</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "João Silva", email: "joao@example.com", plan: "Premium", status: "Ativo" },
                      { id: 2, name: "Maria Santos", email: "maria@example.com", plan: "Básico", status: "Ativo" },
                      { id: 3, name: "Pedro Oliveira", email: "pedro@example.com", plan: "Grátis", status: "Inativo" },
                    ].map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {user.plan}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              user.status === "Ativo"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Assinaturas Ativas</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { plan: "Grátis", count: 450, revenue: "R$ 0" },
                  { plan: "Básico", count: 320, revenue: "R$ 3.2K" },
                  { plan: "Premium", count: 280, revenue: "R$ 8.4K" },
                  { plan: "Empresas", count: 45, revenue: "R$ 4.5K" },
                  { plan: "Mecânicas Básico", count: 89, revenue: "R$ 17.8K" },
                  { plan: "Mecânicas Pro", count: 34, revenue: "R$ 10.2K" },
                ].map((item) => (
                  <Card key={item.plan} className="p-6">
                    <h4 className="font-bold text-gray-900 mb-2">{item.plan}</h4>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{item.count}</p>
                    <p className="text-sm text-gray-600">Receita: {item.revenue}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Relatórios do Sistema</h3>

              <div className="space-y-3">
                {[
                  { name: "Relatório Mensal de Usuários", date: "01/11/2025", size: "2.4 MB" },
                  { name: "Relatório de Receita", date: "31/10/2025", size: "1.8 MB" },
                  { name: "Análise de Retenção", date: "31/10/2025", size: "3.2 MB" },
                  { name: "Relatório de Bugs", date: "30/10/2025", size: "0.9 MB" },
                ].map((report, idx) => (
                  <Card key={idx} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-600">
                        {report.date} • {report.size}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Baixar
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Configurações do Sistema</h3>

              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Configurações Gerais</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Nome da Aplicação
                    </label>
                    <input
                      type="text"
                      defaultValue="Troca Certa"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      E-mail de Suporte
                    </label>
                    <input
                      type="email"
                      defaultValue="suporte@trocacerta.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Telefone de Suporte
                    </label>
                    <input
                      type="tel"
                      defaultValue="+55 (11) 99999-9999"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <Button>Salvar Configurações</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Integrações</h4>
                <div className="space-y-3">
                  {[
                    { name: "Stripe", status: "Conectado" },
                    { name: "SendGrid", status: "Conectado" },
                    { name: "Twilio", status: "Desconectado" },
                    { name: "Google Analytics", status: "Conectado" },
                  ].map((integration) => (
                    <div key={integration.name} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                      <span className="font-medium text-gray-900">{integration.name}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          integration.status === "Conectado"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {integration.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

