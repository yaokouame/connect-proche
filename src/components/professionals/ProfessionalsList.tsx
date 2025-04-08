
import React from "react";
import { Professional } from "@/types/user";
import ProfessionalCard from "./ProfessionalCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfessionalsListProps {
  professionals: Professional[];
}

const ProfessionalsList: React.FC<ProfessionalsListProps> = ({ professionals }) => {
  const { t } = useLanguage();
  
  if (professionals.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{t('professionals.noResults')}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {professionals.map((professional) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </div>
  );
};

export default ProfessionalsList;
