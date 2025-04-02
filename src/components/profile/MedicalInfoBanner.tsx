
import React from "react";
import { Info } from "lucide-react";

const MedicalInfoBanner = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-md flex items-start">
      <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
      <p className="text-sm text-blue-700">
        Les informations de votre dossier médical sont privées et sécurisées. Elles ne seront partagées qu'avec les professionnels de santé que vous aurez autorisés.
      </p>
    </div>
  );
};

export default MedicalInfoBanner;
