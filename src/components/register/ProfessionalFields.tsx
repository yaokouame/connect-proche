
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfessionalFieldsProps {
  formData: {
    specialty: string;
    license: string;
    [key: string]: any;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  translations: {
    specialty: string;
    specialtyPlaceholder: string;
    license: string;
    licensePlaceholder: string;
  };
}

const ProfessionalFields: React.FC<ProfessionalFieldsProps> = ({
  formData,
  handleChange,
  translations
}) => {
  // Mock data for specialties
  const specialties = [
    "Médecine générale",
    "Cardiologie",
    "Pédiatrie",
    "Gynécologie",
    "Dermatologie",
    "Ophtalmologie",
    "Psychiatrie",
    "Neurologie",
    "Orthopédie",
    "Dentiste",
    "Pharmacien",
    "Infirmier",
    "Sage-femme"
  ];

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-md font-medium">Informations professionnelles</h3>
      
      <div className="space-y-2">
        <Label htmlFor="specialty">{translations.specialty}</Label>
        <Select 
          value={formData.specialty} 
          onValueChange={(value) => {
            // We'll need to simulate an event for handleChange to work with this
            const mockEvent = { 
              target: { 
                name: "specialty", 
                value 
              } 
            } as React.ChangeEvent<HTMLInputElement>;
            
            handleChange(mockEvent);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={translations.specialtyPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="license">{translations.license}</Label>
        <Input
          id="license"
          name="license"
          placeholder={translations.licensePlaceholder}
          value={formData.license}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ProfessionalFields;
