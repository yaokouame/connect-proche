
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
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
  showVoiceHelp?: boolean;
  onSpeakField?: (fieldName: string) => void;
}

const ProfessionalFields: React.FC<ProfessionalFieldsProps> = ({
  specialty,
  setSpecialty,
  license,
  setLicense,
  translations,
  showVoiceHelp = false,
  onSpeakField
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="specialty">{translations.specialty}</Label>
          {showVoiceHelp && onSpeakField && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onSpeakField("specialty")}
              title="Écouter les instructions pour ce champ"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
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
        <div className="flex items-center justify-between">
          <Label htmlFor="license">{translations.license}</Label>
          {showVoiceHelp && onSpeakField && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onSpeakField("license")}
              title="Écouter les instructions pour ce champ"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
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
