
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ProfessionalProfile } from "@/types/user";
import { useLanguage } from "@/contexts/LanguageContext";

interface OnlineProfessionalsProps {
  professionals: ProfessionalProfile[];
  onSelectProfessional: (professional: ProfessionalProfile) => void;
}

const OnlineProfessionals = ({ professionals, onSelectProfessional }: OnlineProfessionalsProps) => {
  const { t } = useLanguage();
  const onlineProfessionals = professionals.filter(pro => pro.isOnline);

  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-3 text-health-dark">
        {t("chat.onlineProfessionals") || "Professionnels en ligne"}
      </h2>
      
      {onlineProfessionals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {onlineProfessionals.map(professional => (
            <div 
              key={professional.id}
              onClick={() => onSelectProfessional(professional)}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue font-semibold">
                  {professional.name.charAt(0)}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="ml-3 flex-1">
                <div className="font-medium">{professional.name}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  {professional.specialty}
                  {professional.verified && (
                    <Badge variant="success" className="ml-2">
                      Vérifié
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-3">
          {t("chat.noOnlineProfessionals") || "Aucun professionnel en ligne pour le moment"}
        </p>
      )}
    </div>
  );
};

export default OnlineProfessionals;
