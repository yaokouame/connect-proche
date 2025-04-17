
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import { Prescription, PrescribedMedication } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Medication extends PrescribedMedication {
  id: string;
  prescriptionId: string;
  isActive: boolean;
}

// Create schema for medication form validation
const medicationFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom du médicament est requis" }),
  dosage: z.string().optional(),
  frequency: z.string().optional(),
  duration: z.string().optional(),
  instructions: z.string().optional(),
});

type MedicationFormValues = z.infer<typeof medicationFormSchema>;

const MedicationList = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  // Setup form with validation
  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  });

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

  const onSubmit = (data: MedicationFormValues) => {
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

    // Reset form and close dialog
    form.reset();
    setIsAddDialogOpen(false);
  };

  const addCustomMedication = () => {
    setIsAddDialogOpen(true);
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
                                
                                {selectedMedication.instructions && (
                                  <div>
                                    <p className="text-sm text-gray-500">Instructions</p>
                                    <p>{selectedMedication.instructions}</p>
                                  </div>
                                )}
                                
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
      
      {/* Add Medication Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un médicament</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du médicament</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Doliprane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1000mg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fréquence</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 3 fois par jour" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 7 jours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Prendre avec de la nourriture" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    form.reset();
                    setIsAddDialogOpen(false);
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit">Ajouter</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicationList;
