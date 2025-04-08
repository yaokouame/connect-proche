
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchProfessionals, 
  fetchPharmacies, 
  fetchPatients, 
  fetchPrescriptions
} from "@/services/databaseService";

const DatabaseRecords = () => {
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
    professionals: false,
    pharmacies: false,
    patients: false,
    prescriptions: false
  });
  const { toast } = useToast();

  const loadData = async (dataType: string) => {
    setLoading(prev => ({ ...prev, [dataType]: true }));
    try {
      let data;
      switch (dataType) {
        case 'professionals':
          data = await fetchProfessionals();
          setProfessionals(data);
          break;
        case 'pharmacies':
          data = await fetchPharmacies();
          setPharmacies(data);
          break;
        case 'patients':
          data = await fetchPatients();
          setPatients(data);
          break;
        case 'prescriptions':
          data = await fetchPrescriptions();
          setPrescriptions(data);
          break;
      }
      
      toast({
        title: "Données chargées",
        description: `Les données ${dataType} ont été chargées avec succès.`
      });
    } catch (error) {
      console.error(`Error loading ${dataType}:`, error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Erreur lors du chargement des données ${dataType}.`
      });
    } finally {
      setLoading(prev => ({ ...prev, [dataType]: false }));
    }
  };

  // Display professionals
  const renderProfessionals = () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Spécialité</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Évaluation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {professionals.length > 0 ? (
            professionals.map((pro) => (
              <TableRow key={pro.id}>
                <TableCell className="font-medium">{pro.id}</TableCell>
                <TableCell>{pro.name}</TableCell>
                <TableCell>{pro.specialty}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-white ${pro.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {pro.isOnline ? 'En ligne' : 'Hors ligne'}
                  </span>
                </TableCell>
                <TableCell>{pro.rating} ({pro.reviewCount})</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  // Display pharmacies
  const renderPharmacies = () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Téléphone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pharmacies.length > 0 ? (
            pharmacies.map((pharmacy) => (
              <TableRow key={pharmacy.id}>
                <TableCell className="font-medium">{pharmacy.id}</TableCell>
                <TableCell>{pharmacy.name}</TableCell>
                <TableCell>{pharmacy.address}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-white ${pharmacy.onDuty ? 'bg-green-500' : 'bg-red-500'}`}>
                    {pharmacy.onDuty ? 'De garde' : 'Pas de garde'}
                  </span>
                </TableCell>
                <TableCell>{pharmacy.phone}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  // Display patients
  const renderPatients = () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Groupe sanguin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.bloodType || 'Non spécifié'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  // Display prescriptions
  const renderPrescriptions = () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Médecin</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell className="font-medium">{prescription.id}</TableCell>
                <TableCell>{prescription.patientId}</TableCell>
                <TableCell>{prescription.professionalName}</TableCell>
                <TableCell>{prescription.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-white ${prescription.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`}>
                    {prescription.status === 'active' ? 'Active' : 'Expirée'}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Database className="h-6 w-6" />
          Base de données
        </h2>
      </div>

      <Tabs defaultValue="professionals">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="professionals">Professionnels</TabsTrigger>
          <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="prescriptions">Ordonnances</TabsTrigger>
        </TabsList>

        <div className="mb-4">
          <Button 
            onClick={() => loadData(document.querySelector('[role="tablist"] [data-state="active"]')?.getAttribute('value') || 'professionals')}
            disabled={Object.values(loading).some(v => v)}
          >
            {Object.values(loading).some(v => v) ? 'Chargement...' : 'Actualiser les données'}
          </Button>
        </div>

        <TabsContent value="professionals">
          {renderProfessionals()}
        </TabsContent>

        <TabsContent value="pharmacies">
          {renderPharmacies()}
        </TabsContent>

        <TabsContent value="patients">
          {renderPatients()}
        </TabsContent>

        <TabsContent value="prescriptions">
          {renderPrescriptions()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseRecords;
