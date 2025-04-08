
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Circle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Pharmacy } from "@/types/user";
import { getPharmacies } from "@/services/pharmacyService";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const AdminPharmacies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        const data = await getPharmacies();
        setPharmacies(data);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les pharmacies.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [toast]);

  // Filtrer les pharmacies en fonction du terme de recherche
  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleDutyStatus = (id: string) => {
    setPharmacies(
      pharmacies.map((pharmacy) =>
        pharmacy.id === id ? { ...pharmacy, onDuty: !pharmacy.onDuty } : pharmacy
      )
    );
    
    const targetPharmacy = pharmacies.find(pharmacy => pharmacy.id === id);
    const newStatus = !targetPharmacy?.onDuty;
    
    toast({
      title: `Statut de garde mis à jour`,
      description: `La pharmacie ${targetPharmacy?.name} est maintenant ${
        newStatus ? "de garde" : "hors garde"
      }.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Gestion des Pharmacies de Garde</h3>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une pharmacie..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Horaires</TableHead>
              <TableHead>Assurances</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Chargement des pharmacies...
                </TableCell>
              </TableRow>
            ) : filteredPharmacies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Aucune pharmacie trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredPharmacies.map((pharmacy) => (
                <TableRow key={pharmacy.id}>
                  <TableCell className="font-medium">{pharmacy.name}</TableCell>
                  <TableCell>{pharmacy.address}</TableCell>
                  <TableCell>{pharmacy.phone}</TableCell>
                  <TableCell>{pharmacy.hours}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {pharmacy.acceptedInsuranceProviders?.map((provider, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {provider}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge 
                        variant={pharmacy.onDuty ? "success" : "destructive"}
                        className="mr-2"
                      >
                        {pharmacy.onDuty ? "De garde" : "Hors garde"}
                      </Badge>
                      {pharmacy.onDuty ? (
                        <Circle className="h-4 w-4 text-green-500 fill-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-red-500 fill-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Switch
                        checked={pharmacy.onDuty}
                        onCheckedChange={() => handleToggleDutyStatus(pharmacy.id)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {pharmacy.onDuty ? "De garde" : "Hors garde"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPharmacies;
