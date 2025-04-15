
import React from "react";
import AppointmentDialog from "./AppointmentDialog";
import ContactSpecialistDialog from "./ContactSpecialistDialog";

const MedicalActionsSection: React.FC = () => {
  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Besoin de plus d'informations?</h2>
      <p className="text-gray-600 mb-6">
        N'hésitez pas à consulter nos ressources complémentaires ou à contacter 
        un professionnel de santé pour obtenir des conseils personnalisés.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <AppointmentDialog />
        <ContactSpecialistDialog />
      </div>
    </div>
  );
};

export default MedicalActionsSection;
