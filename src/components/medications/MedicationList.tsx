
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import MedicationForm from "./MedicationForm";
import MedicationTable from "./MedicationTable";
import MedicationListHeader from "./MedicationListHeader";
import MedicationSearch from "./MedicationSearch";
import MedicationEmptyState from "./MedicationEmptyState";
import { useMedicationList } from "./useMedicationList";

const MedicationList = () => {
  const { currentUser } = useUser();
  const {
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
  } = useMedicationList();

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
        <MedicationListHeader onAddClick={() => setIsAddDialogOpen(true)} />
        <CardContent>
          <MedicationSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />

          {sortedMedications.length > 0 ? (
            <MedicationTable 
              medications={sortedMedications}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
              onSelectMedication={setSelectedMedication}
              onMarkTaken={handleMarkTaken}
              onMarkSkipped={handleMarkSkipped}
            />
          ) : (
            <MedicationEmptyState />
          )}
        </CardContent>
      </Card>
      
      {/* Add Medication Dialog */}
      <MedicationForm 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={addMedication}
      />
    </div>
  );
};

export default MedicationList;
