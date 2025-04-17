
import { useState, useEffect } from "react";
import { Medication } from "./types";
import { Prescription } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

// Mock data for prescriptions
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

export const useMedicationList = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const handleMarkTaken = (medication: Medication) => {
    const now = new Date().toISOString();
    const updatedMedications = medications.map(med => {
      if (med.id === medication.id) {
        return {
          ...med,
          lastTaken: now,
          status: 'taken' as const
        };
      }
      return med;
    });
    setMedications(updatedMedications);
    
    // In a real application, this would call an API to update the database
    console.log(`Medication ${medication.name} marked as taken at ${now}`);
  };

  const handleMarkSkipped = (medication: Medication) => {
    const now = new Date().toISOString();
    const updatedMedications = medications.map(med => {
      if (med.id === medication.id) {
        return {
          ...med,
          lastSkipped: now,
          status: 'skipped' as const
        };
      }
      return med;
    });
    setMedications(updatedMedications);
    
    // In a real application, this would call an API to update the database
    console.log(`Medication ${medication.name} marked as skipped at ${now}`);
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

  const addMedication = (data: any) => {
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

  return {
    medications,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    selectedMedication,
    setSelectedMedication,
    isAddDialogOpen,
    setIsAddDialogOpen,
    handleSort,
    handleMarkTaken,
    handleMarkSkipped,
    sortedMedications,
    addMedication
  };
};
