
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { Prescription } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import MedicationForm, { MedicationFormValues } from "./MedicationForm";
import MedicationTable from "./MedicationTable";
import { Medication } from "./types";

const MedicationList = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data - would be fetched from API in a real application
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

  const handleMedicationAdd = (data: MedicationFormValues) => {
    // Create a new medication
    const newMedication: Medication = {
      id: `med-manual-${Date.now()}`,
      prescriptionId: "manual-entry",
      name: data.name,
      dosage: data.dosage || "",
      frequency: data.frequency || "",
      duration: data.duration || "",
      instructions: data.instructions || "",
      isActive: true
    };

    // Add to the medications list
    setMedications([...medications, newMedication]);
    
    // Show success message
    toast({
      title: "Médicament ajouté",
      description: `${data.name} a été ajouté à votre liste de médicaments.`,
    });

    // Close dialog
    setIsAddDialogOpen(false);
  };

  const handleMedicationSelect = (medication: Medication) => {
    setSelectedMedication(medication);
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
                onClick={() => setIsAddDialogOpen(true)}
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
            <MedicationTable 
              medications={sortedMedications}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
              onSelectMedication={handleMedicationSelect}
            />
          ) : (
            <div className="text-center py-10 border rounded-md">
              <Pill className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Aucun médicament trouvé</p>
              <p className="text-sm text-gray-400">Ajoutez des médicaments ou scannez une ordonnance</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add Medication Dialog */}
      <MedicationForm 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleMedicationAdd}
      />
    </div>
  );
};

export default MedicationList;
