
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
import { ArrowUpDown } from "lucide-react";
import MedicationDetails from "./MedicationDetails";
import { Medication } from "./types";

interface MedicationTableProps {
  medications: Medication[];
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSelectMedication: (medication: Medication) => void;
}

const MedicationTable = ({ 
  medications, 
  onSort, 
  sortField, 
  sortDirection, 
  onSelectMedication 
}: MedicationTableProps) => {
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
                <Badge variant={medication.isActive ? "default" : "outline"}>
                  {medication.isActive ? "Actif" : "Expiré"}
                </Badge>
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
