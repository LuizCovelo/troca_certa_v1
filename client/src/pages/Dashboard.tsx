import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Plus, Car, AlertCircle, Settings } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    licensePlate: "",
    currentKm: 0,
    color: "",
    fuelType: "gasoline" as const,
  });

  const { data: vehicles, isLoading } = trpc.vehicles.list.useQuery();
  const createVehicle = trpc.vehicles.create.useMutation();
  const utils = trpc.useUtils();

  const handleCreateVehicle = async () => {
    try {
      await createVehicle.mutateAsync(formData);
      await utils.vehicles.list.invalidate();
      setIsOpen(false);
      setFormData({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        licensePlate: "",
        currentKm: 0,
        color: "",
        fuelType: "gasoline",
      });
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meu Painel</h1>
            <p className="text-gray-600">Bem-vindo, {user.name}!</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setLocation("/settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Subscription Info */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Plano: {user.plan?.toUpperCase() || "GRÁTIS"}</h2>
              <p className="text-gray-600">
                {user.plan === "free"
                  ? "Você está usando o plano gratuito com 1 veículo."
                  : "Obrigado por ser um cliente premium!"}
              </p>
            </div>
            <Button variant="default">Atualizar Plano</Button>
          </div>
        </div>

        {/* Vehicles Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Meus Veículos</h2>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Veículo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Marca (ex: Toyota)"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                  <Input
                    placeholder="Modelo (ex: Corolla)"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Ano"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  />
                  <Input
                    placeholder="Placa (opcional)"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Quilometragem atual"
                    value={formData.currentKm}
                    onChange={(e) => setFormData({ ...formData, currentKm: parseInt(e.target.value) })}
                  />
                  <Input
                    placeholder="Cor (opcional)"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as any })}
                  >
                    <option value="gasoline">Gasolina</option>
                    <option value="diesel">Diesel</option>
                    <option value="ethanol">Etanol</option>
                    <option value="hybrid">Híbrido</option>
                    <option value="electric">Elétrico</option>
                  </select>
                  <Button onClick={handleCreateVehicle} className="w-full">
                    Criar Veículo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Carregando veículos...</p>
            </div>
          ) : vehicles && vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Car className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600">{vehicle.year}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {vehicle.licensePlate && (
                      <p className="text-sm text-gray-600">
                        <strong>Placa:</strong> {vehicle.licensePlate}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      <strong>Km:</strong> {vehicle.currentKm.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Combustível:</strong> {vehicle.fuelType}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/vehicle/${vehicle.id}`)}
                      className="flex-1"
                    >
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum veículo cadastrado</h3>
              <p className="text-gray-600 mb-6">Cadastre seu primeiro veículo para começar a receber lembretes.</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Veículo
                  </Button>
                </DialogTrigger>
              </Dialog>
            </Card>
          )}
        </div>

        {/* Recent Reminders */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximas Manutenções</h2>
          <Card className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma manutenção pendente no momento.</p>
          </Card>
        </div>
      </main>
    </div>
  );
}

