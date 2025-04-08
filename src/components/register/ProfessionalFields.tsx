
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { medicalSpecialties } from "@/data/medicalData";

interface ProfessionalFieldsProps {
  specialty: string;
  setSpecialty: (specialty: string) => void;
  license: string;
  setLicense: (license: string) => void;
  translations: {
    specialty: string;
    specialtyPlaceholder: string;
    license: string;
    licensePlaceholder: string;
  };
}

const ProfessionalFields: React.FC<ProfessionalFieldsProps> = ({
  specialty,
  setSpecialty,
  license,
  setLicense,
  translations
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="specialty">{translations.specialty}</Label>
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger>
            <SelectValue placeholder={translations.specialtyPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {medicalSpecialties.map((specialtyName) => (
              <SelectItem key={specialtyName} value={specialtyName}>
                {specialtyName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="license">{translations.license}</Label>
        <Input
          id="license"
          placeholder={translations.licensePlaceholder}
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default ProfessionalFields;
