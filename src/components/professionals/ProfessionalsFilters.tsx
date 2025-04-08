
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfessionalsFiltersProps {
  specialties: string[];
  locations: string[];
  selectedSpecialties: string[];
  selectedLocations: string[];
  onSpecialtyChange: (specialty: string) => void;
  onLocationChange: (location: string) => void;
}

const ProfessionalsFilters: React.FC<ProfessionalsFiltersProps> = ({
  specialties,
  locations,
  selectedSpecialties,
  selectedLocations,
  onSpecialtyChange,
  onLocationChange,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4" />
        <h2 className="font-semibold">{t('common.filter')}</h2>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">{t('professionals.specialty')}</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <Checkbox
                id={`specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => onSpecialtyChange(specialty)}
              />
              <label
                htmlFor={`specialty-${specialty}`}
                className="ml-2 text-sm"
              >
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">{t('professionals.location')}</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => onLocationChange(location)}
              />
              <label
                htmlFor={`location-${location}`}
                className="ml-2 text-sm"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsFilters;
