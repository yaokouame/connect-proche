
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Plus, Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import { Prescription, PrescribedMedication } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

interface Medication extends PrescribedMedication {
  id: string;
  prescriptionId: string;
  isActive: boolean;
}

const MedicationList = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const mockPrescriptions: Prescription[] = [
    {
      id: "presc-1",
      patientId: "patient-456",
      professionalId: "pro-123",
      professionalName: "Jean Michel",
      date: "15/09/2023",
      expiryDate: "15/12/2023",
      status: "active",
      medications: [
        {
          name: "Amoxicilline",
          dosage: "500mg",
          frequency: "3 fois par jour",
          duration: "7 jours"
        },
        {
          name: "Doliprane",
          dosage: "1000mg",
          frequency: "Si douleur",
          duration: "Au besoin"
        }
      ],
      instructions: "Prendre avec de la nourriture. Terminer le traitement complet même si les symptômes s'améliorent."
    },
    {
      id: "presc-2",
      patientId: "patient-456",
      professionalId: "pro-124",
      professionalName: "Sophie Martin",
      date: "25/07/2023",
      expiryDate: "25/10/2023",
      status: "expired",
      medications: [
        {
          name: "Ventoline",
          dosage: "100µg",
          frequency: "2 inhalations",
          duration: "En cas de crise"
        }
      ],
      instructions: "Utiliser en cas de difficulté respiratoire."
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const allMedications: Medication[] = [];
    
    mockPrescriptions.forEach((prescription) => {
      prescription.medications.forEach((med, index) => {
        allMedications.push({
          ...med,
          id: `med-${prescription.id}-${index}`,
          prescriptionId: prescription.id,
          isActive: prescription.status === "active"
        });
      });
    });
    
    setMedications(allMedications);
  }, []);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMedications = [...filteredMedications].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const addCustomMedication = () => {
    toast({
      title: "Fonctionnalité en développement",
      description: "L'ajout manuel de médicaments sera bientôt disponible.",
    });
  };

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center">Connectez-vous pour voir vos médicaments.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center">
              <Pill className="mr-2 h-5 w-5 text-health-blue" />
              Mes Médicaments
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={addCustomMedication}
                variant="outline" 
                size="sm" 
                className="h-9"
              >
                <Plus className="h-4 w-4 mr-1" /> Ajouter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Rechercher un médicament..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {sortedMedications.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Nom
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Fréquence</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMedications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell className="font-medium">{medication.name}</TableCell>
                      <TableCell>{medication.dosage}</TableCell>
                      <TableCell>{medication.frequency}</TableCell>
                      <TableCell>{medication.duration}</TableCell>
                      <TableCell>
                        <Badge variant={medication.isActive ? "default" : "outline"}>
                          {medication.isActive ? "Actif" : "Expiré"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedMedication(medication)}
                            >
                              Détails
                            </Button>
                          </DialogTrigger>
                          
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Détails du médicament</DialogTitle>
                            </DialogHeader>
                            
                            {selectedMedication && (
                              <div className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Nom</p>
                                    <p className="font-medium">{selectedMedication.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Dosage</p>
                                    <p>{selectedMedication.dosage}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Fréquence</p>
                                    <p>{selectedMedication.frequency}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Durée</p>
                                    <p>{selectedMedication.duration}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm text-gray-500">Statut</p>
                                  <Badge variant={selectedMedication.isActive ? "default" : "outline"} className="mt-1">
                                    {selectedMedication.isActive ? "Actif" : "Expiré"}
                                  </Badge>
                                </div>
                                
                                <div className="pt-2">
                                  <p className="text-sm text-gray-500">Actions</p>
                                  <div className="flex gap-2 mt-2">
                                    <Button size="sm" variant="outline" disabled={!selectedMedication.isActive}>
                                      Définir un rappel
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Plus d'infos
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10 border rounded-md">
              <Pill className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Aucun médicament trouvé</p>
              <p className="text-sm text-gray-400">Ajoutez des médicaments ou scannez une ordonnance</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationList;
