import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Plus, Users, FileText, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function MechanicPanel() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  if (!user || (user.role !== "mechanic" && user.role !== "company")) {
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

  const handleAddClient = () => {
    console.log("Adicionando cliente:", formData);
    setIsOpen(false);
    setFormData({ clientName: "", clientEmail: "", clientPhone: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Painel do Mecânico</h1>
          <p className="text-gray-600">Gerencie seus clientes e fidelização</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-gray-600 text-sm">Total de Clientes</p>
            <p className="text-3xl font-bold text-gray-900">156</p>
            <p className="text-xs text-green-600 mt-2">+12 este mês</p>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Veículos Gerenciados</p>
            <p className="text-3xl font-bold text-gray-900">234</p>
            <p className="text-xs text-green-600 mt-2">+18 este mês</p>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Manutenções Agendadas</p>
            <p className="text-3xl font-bold text-gray-900">45</p>
            <p className="text-xs text-orange-600 mt-2">Esta semana</p>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Taxa de Fidelização</p>
            <p className="text-3xl font-bold text-gray-900">87%</p>
            <p className="text-xs text-green-600 mt-2">+5% este mês</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="clients" className="bg-white rounded-lg border border-gray-200">
          <TabsList className="border-b border-gray-200 p-4">
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Meus Clientes
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Relatórios
            </TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Gerenciar Clientes</h3>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Cliente
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Nome do Cliente"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      />
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      />
                      <Input
                        type="tel"
                        placeholder="Telefone/WhatsApp"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      />
                      <Button onClick={handleAddClient} className="w-full">
                        Adicionar Cliente
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Nome</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">E-mail</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Telefone</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Veículos</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "João Silva", email: "joao@example.com", phone: "(11) 98765-4321", vehicles: 2 },
                      { id: 2, name: "Maria Santos", email: "maria@example.com", phone: "(11) 99876-5432", vehicles: 1 },
                      { id: 3, name: "Pedro Oliveira", email: "pedro@example.com", phone: "(11) 97654-3210", vehicles: 3 },
                    ].map((client) => (
                      <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{client.name}</td>
                        <td className="py-3 px-4 text-gray-600">{client.email}</td>
                        <td className="py-3 px-4 text-gray-600">{client.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{client.vehicles}</td>
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

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Agendamentos de Manutenção</h3>

              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    client: "João Silva",
                    vehicle: "Toyota Corolla",
                    service: "Troca de Óleo",
                    date: "05/11/2025",
                    time: "09:00",
                  },
                  {
                    id: 2,
                    client: "Maria Santos",
                    vehicle: "Honda Civic",
                    service: "Revisão Completa",
                    date: "05/11/2025",
                    time: "14:00",
                  },
                  {
                    id: 3,
                    client: "Pedro Oliveira",
                    vehicle: "Ford Focus",
                    service: "Troca de Pneus",
                    date: "06/11/2025",
                    time: "10:00",
                  },
                ].map((appointment) => (
                  <Card key={appointment.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">{appointment.client}</h4>
                        <p className="text-sm text-gray-600">{appointment.vehicle}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Serviço:</strong> {appointment.service}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Data/Hora:</strong> {appointment.date} às {appointment.time}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Relatórios Automáticos</h3>

              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Relatórios Enviados aos Clientes</h4>
                <div className="space-y-3">
                  {[
                    { client: "João Silva", date: "01/11/2025", status: "Enviado" },
                    { client: "Maria Santos", date: "01/11/2025", status: "Enviado" },
                    { client: "Pedro Oliveira", date: "01/11/2025", status: "Enviado" },
                  ].map((report, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{report.client}</p>
                        <p className="text-sm text-gray-600">{report.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Gerar Novo Relatório</h4>
                <p className="text-gray-600 mb-4">Selecione um cliente para gerar um relatório personalizado</p>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md">
                    <option>Selecione um cliente...</option>
                    <option>João Silva</option>
                    <option>Maria Santos</option>
                    <option>Pedro Oliveira</option>
                  </select>
                  <Button>Gerar Relatório</Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

