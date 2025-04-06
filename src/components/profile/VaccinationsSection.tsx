
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Vaccination } from "@/types/user";
import { Calendar, Syringe, Plus, Trash, Edit, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";

interface VaccinationsSectionProps {
  vaccinations: Vaccination[];
  setVaccinations: React.Dispatch<React.SetStateAction<Vaccination[]>>;
}

const VaccinationsSection = ({ vaccinations, setVaccinations }: VaccinationsSectionProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVaccination, setNewVaccination] = useState<Omit<Vaccination, "id">>({
    name: "",
    date: format(new Date(), "yyyy-MM-dd"),
    expiryDate: "",
    batchNumber: "",
    provider: "",
    notes: ""
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedVaccination, setEditedVaccination] = useState<Vaccination | null>(null);

  const handleAddVaccination = () => {
    if (newVaccination.name && newVaccination.date) {
      const newId = `vacc-${Date.now()}`;
      setVaccinations([...vaccinations, { ...newVaccination, id: newId }]);
      setNewVaccination({
        name: "",
        date: format(new Date(), "yyyy-MM-dd"),
        expiryDate: "",
        batchNumber: "",
        provider: "",
        notes: ""
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleStartEditing = (vaccination: Vaccination) => {
    setEditingId(vaccination.id);
    setEditedVaccination({ ...vaccination });
  };

  const handleCancelEditing = () => {
    setEditingId(null);
    setEditedVaccination(null);
  };

  const handleSaveEditing = () => {
    if (editedVaccination && editingId) {
      setVaccinations(
        vaccinations.map((vaccination) =>
          vaccination.id === editingId ? editedVaccination : vaccination
        )
      );
      setEditingId(null);
      setEditedVaccination(null);
    }
  };

  const handleDeleteVaccination = (id: string) => {
    setVaccinations(vaccinations.filter((vaccination) => vaccination.id !== id));
  };

  return (
    <div className="space-y-4 border-b pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Syringe className="h-5 w-5 text-health-blue" />
          <h3 className="text-lg font-medium">Vaccinations</h3>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une vaccination</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom du vaccin *
                </label>
                <Input
                  id="name"
                  value={newVaccination.name}
                  onChange={(e) => setNewVaccination({ ...newVaccination, name: e.target.value })}
                  placeholder="Ex: COVID-19, Grippe, Tétanos..."
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date de vaccination *
                </label>
                <Input
                  id="date"
                  type="date"
                  value={newVaccination.date}
                  onChange={(e) => setNewVaccination({ ...newVaccination, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="expiryDate" className="text-sm font-medium">
                  Date d'expiration
                </label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newVaccination.expiryDate || ""}
                  onChange={(e) => setNewVaccination({ ...newVaccination, expiryDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="provider" className="text-sm font-medium">
                  Prestataire
                </label>
                <Input
                  id="provider"
                  value={newVaccination.provider || ""}
                  onChange={(e) => setNewVaccination({ ...newVaccination, provider: e.target.value })}
                  placeholder="Ex: Dr. Dupont, Centre de vaccination..."
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="batchNumber" className="text-sm font-medium">
                  Numéro de lot
                </label>
                <Input
                  id="batchNumber"
                  value={newVaccination.batchNumber || ""}
                  onChange={(e) => setNewVaccination({ ...newVaccination, batchNumber: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes
                </label>
                <Input
                  id="notes"
                  value={newVaccination.notes || ""}
                  onChange={(e) => setNewVaccination({ ...newVaccination, notes: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddVaccination}>Ajouter</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {vaccinations.length > 0 ? (
        <div className="space-y-2">
          {vaccinations.map((vaccination) => (
            <Collapsible key={vaccination.id} className="border rounded-lg">
              <div className="p-3 flex items-center justify-between">
                {editingId === vaccination.id ? (
                  <div className="flex-1 mr-2">
                    <Input
                      value={editedVaccination?.name || ""}
                      onChange={(e) =>
                        setEditedVaccination({ ...(editedVaccination as Vaccination), name: e.target.value })
                      }
                    />
                  </div>
                ) : (
                  <div className="font-medium">{vaccination.name}</div>
                )}
                <div className="flex items-center gap-2">
                  {editingId === vaccination.id ? (
                    <>
                      <Button variant="ghost" size="icon" onClick={handleSaveEditing}>
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleCancelEditing}>
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="icon" onClick={() => handleStartEditing(vaccination)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteVaccination(vaccination.id)}
                      >
                        <Trash className="h-4 w-4 text-red-600" />
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                      </CollapsibleTrigger>
                    </>
                  )}
                </div>
              </div>
              <CollapsibleContent>
                <div className="p-3 pt-0 border-t">
                  <div className="grid gap-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">Date: </span>
                      <span className="ml-2">
                        {editingId === vaccination.id ? (
                          <Input
                            type="date"
                            value={editedVaccination?.date || ""}
                            onChange={(e) =>
                              setEditedVaccination({
                                ...(editedVaccination as Vaccination),
                                date: e.target.value,
                              })
                            }
                            className="h-7 w-32 inline-block"
                          />
                        ) : (
                          vaccination.date
                        )}
                      </span>
                    </div>
                    {vaccination.expiryDate && (
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-700">Expiration: </span>
                        <span className="ml-2">
                          {editingId === vaccination.id ? (
                            <Input
                              type="date"
                              value={editedVaccination?.expiryDate || ""}
                              onChange={(e) =>
                                setEditedVaccination({
                                  ...(editedVaccination as Vaccination),
                                  expiryDate: e.target.value,
                                })
                              }
                              className="h-7 w-32 inline-block"
                            />
                          ) : (
                            vaccination.expiryDate
                          )}
                        </span>
                      </div>
                    )}
                    {vaccination.provider && (
                      <div className="flex items-start text-sm">
                        <span className="text-gray-700 min-w-[80px]">Prestataire: </span>
                        <span className="ml-2">
                          {editingId === vaccination.id ? (
                            <Input
                              value={editedVaccination?.provider || ""}
                              onChange={(e) =>
                                setEditedVaccination({
                                  ...(editedVaccination as Vaccination),
                                  provider: e.target.value,
                                })
                              }
                            />
                          ) : (
                            vaccination.provider
                          )}
                        </span>
                      </div>
                    )}
                    {vaccination.batchNumber && (
                      <div className="flex items-start text-sm">
                        <span className="text-gray-700 min-w-[80px]">Lot: </span>
                        <span className="ml-2">
                          {editingId === vaccination.id ? (
                            <Input
                              value={editedVaccination?.batchNumber || ""}
                              onChange={(e) =>
                                setEditedVaccination({
                                  ...(editedVaccination as Vaccination),
                                  batchNumber: e.target.value,
                                })
                              }
                            />
                          ) : (
                            vaccination.batchNumber
                          )}
                        </span>
                      </div>
                    )}
                    {vaccination.notes && (
                      <div className="flex items-start text-sm">
                        <span className="text-gray-700 min-w-[80px]">Notes: </span>
                        <span className="ml-2">
                          {editingId === vaccination.id ? (
                            <Input
                              value={editedVaccination?.notes || ""}
                              onChange={(e) =>
                                setEditedVaccination({
                                  ...(editedVaccination as Vaccination),
                                  notes: e.target.value,
                                })
                              }
                            />
                          ) : (
                            vaccination.notes
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Aucune vaccination enregistrée</p>
      )}
    </div>
  );
};

export default VaccinationsSection;
