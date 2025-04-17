
import React from "react";
import { Pill } from "lucide-react";

const MedicationEmptyState = () => {
  return (
    <div className="text-center py-10 border rounded-md">
      <Pill className="mx-auto h-10 w-10 text-gray-400 mb-2" />
      <p className="text-gray-500 mb-2">Aucun médicament trouvé</p>
      <p className="text-sm text-gray-400">Ajoutez des médicaments ou scannez une ordonnance</p>
    </div>
  );
};

export default MedicationEmptyState;
