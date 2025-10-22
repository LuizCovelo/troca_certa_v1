import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { ArrowLeft, Plus, AlertCircle, Gauge } from "lucide-react";

export default function VehicleDetail() {
  const { id } = useParams() as { id: string };
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    maintenanceTypeId: "",
    kmAtMaintenance: 0,
    datePerformed: new Date().toISOString().split("T")[0],
    cost: "",
    notes: "",
    mechanic: "",
  });

  const { data: vehicle, isLoading } = trpc.vehicles.get.useQuery({ id });
  const { data: history } = trpc.maintenance.history.useQuery({ vehicleId: id });
  const { data: reminders } = trpc.maintenance.reminders.useQuery({ vehicleId: id });
  const addRecord = trpc.maintenance.addRecord.useMutation();
  const utils = trpc.useUtils();

  const handleAddRecord = async () => {
    try {
      await addRecord.mutateAsync({
        vehicleId: id,
        maintenanceTypeId: formData.maintenanceTypeId,
        kmAtMaintenance: formData.kmAtMaintenance,
        datePerformed: new Date(formData.datePerformed),
        cost: formData.cost,
        notes: formData.notes,
        mechanic: formData.mechanic,
      });
      await utils.maintenance.history.invalidate();
      setIsOpen(false);
      setFormData({
        maintenanceTypeId: "",
        kmAtMaintenance: 0,
        datePerformed: new Date().toISOString().split("T")[0],
        cost: "",
        notes: "",
        mechanic: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar registro:", error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Button variant="outline" onClick={() => setLocation("/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Veículo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Button variant="outline" onClick={() => setLocation("/dashboard")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {vehicle.brand} {vehicle.model} ({vehicle.year})
          </h1>
          {vehicle.licensePlate && <p className="text-gray-600">Placa: {vehicle.licensePlate}</p>}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Vehicle Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Quilometragem Atual</p>
                <p className="text-3xl font-bold text-gray-900">{vehicle.currentKm.toLocaleString("pt-BR")} km</p>
              </div>
              <Gauge className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Combustível</p>
            <p className="text-2xl font-bold text-gray-900 capitalize">{vehicle.fuelType}</p>
          </Card>

          <Card className="p-6">
            <p className="text-gray-600 text-sm">Cor</p>
            <p className="text-2xl font-bold text-gray-900">{vehicle.color || "Não informada"}</p>
          </Card>
        </div>

        {/* Próximas Manutenções */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximas Manutenções</h2>
          {reminders && reminders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reminders.map((reminder) => (
                <Card key={reminder.id} className="p-6 border-l-4 border-l-orange-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">Manutenção Pendente</h3>
                      <p className="text-sm text-gray-600">ID: {reminder.maintenanceTypeId}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {reminder.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {reminder.nextDueKm && (
                      <p className="text-sm text-gray-600">
                        <strong>Próximo em:</strong> {reminder.nextDueKm.toLocaleString("pt-BR")} km
                      </p>
                    )}
                    {reminder.nextDueDate && (
                      <p className="text-sm text-gray-600">
                        <strong>Data:</strong> {new Date(reminder.nextDueDate).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Agendar Manutenção
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma manutenção pendente</p>
            </Card>
          )}
        </div>

        {/* Histórico de Manutenção */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Histórico de Manutenção</h2>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Manutenção
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Manutenção</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Tipo de Manutenção"
                    value={formData.maintenanceTypeId}
                    onChange={(e) => setFormData({ ...formData, maintenanceTypeId: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Quilometragem"
                    value={formData.kmAtMaintenance}
                    onChange={(e) => setFormData({ ...formData, kmAtMaintenance: parseInt(e.target.value) })}
                  />
                  <Input
                    type="date"
                    value={formData.datePerformed}
                    onChange={(e) => setFormData({ ...formData, datePerformed: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Custo (R$)"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                  <Input
                    placeholder="Mecânico (opcional)"
                    value={formData.mechanic}
                    onChange={(e) => setFormData({ ...formData, mechanic: e.target.value })}
                  />
                  <textarea
                    placeholder="Notas (opcional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                  <Button onClick={handleAddRecord} className="w-full">
                    Registrar Manutenção
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {history && history.length > 0 ? (
            <div className="space-y-4">
              {history.map((record) => (
                <Card key={record.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{record.maintenanceTypeId}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(record.datePerformed).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {record.cost ? `R$ ${parseFloat(record.cost).toFixed(2)}` : "-"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Quilometragem:</strong> {record.kmAtMaintenance.toLocaleString("pt-BR")} km
                    </p>
                    {record.mechanic && (
                      <p className="text-sm text-gray-600">
                        <strong>Mecânico:</strong> {record.mechanic}
                      </p>
                    )}
                    {record.notes && (
                      <p className="text-sm text-gray-600">
                        <strong>Notas:</strong> {record.notes}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma manutenção registrada</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-6">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeira Manutenção
                  </Button>
                </DialogTrigger>
              </Dialog>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

