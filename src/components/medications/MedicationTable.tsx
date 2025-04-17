
import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowUpDown, Check, X } from "lucide-react";
import MedicationDetails from "./MedicationDetails";
import { Medication } from "./types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MedicationTableProps {
  medications: Medication[];
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSelectMedication: (medication: Medication) => void;
  onMarkTaken: (medication: Medication) => void;
  onMarkSkipped: (medication: Medication) => void;
}

const MedicationTable = ({ 
  medications, 
  onSort, 
  sortField, 
  sortDirection, 
  onSelectMedication,
  onMarkTaken,
  onMarkSkipped
}: MedicationTableProps) => {
  const { toast } = useToast();

  const handleMarkTaken = (medication: Medication, e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkTaken(medication);
    toast({
      title: "Médicament pris",
      description: `${medication.name} a été marqué comme pris.`,
    });
  };

  const handleMarkSkipped = (medication: Medication, e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkSkipped(medication);
    toast({
      title: "Dose sautée",
      description: `${medication.name} a été marqué comme sauté.`,
    });
  };

  const getStatusBadge = (medication: Medication) => {
    if (medication.status === 'taken') {
      return (
        <Badge variant="default" className="bg-green-500">
          Pris
        </Badge>
      );
    } else if (medication.status === 'skipped') {
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          Sauté
        </Badge>
      );
    } else if (medication.isActive) {
      return (
        <Badge variant="default">
          Actif
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          Expiré
        </Badge>
      );
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => onSort("name")}
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
            <TableHead className="text-center">Suivi</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications.map((medication) => (
            <TableRow key={medication.id}>
              <TableCell className="font-medium">{medication.name}</TableCell>
              <TableCell>{medication.dosage}</TableCell>
              <TableCell>{medication.frequency}</TableCell>
              <TableCell>{medication.duration}</TableCell>
              <TableCell>
                {getStatusBadge(medication)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 bg-green-50 hover:bg-green-100 border-green-200"
                    onClick={(e) => handleMarkTaken(medication, e)}
                    title="Marquer comme pris"
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 bg-amber-50 hover:bg-amber-100 border-amber-200"
                    onClick={(e) => handleMarkSkipped(medication, e)}
                    title="Marquer comme sauté"
                  >
                    <X className="h-4 w-4 text-amber-600" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <MedicationDetails 
                  medication={medication} 
                  onMedicationSelect={onSelectMedication} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicationTable;
