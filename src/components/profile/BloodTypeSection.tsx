
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BloodTypeSectionProps {
  bloodType: string | undefined;
  setBloodType: (bloodType: string) => void;
}

const BloodTypeSection = ({ bloodType, setBloodType }: BloodTypeSectionProps) => {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"];
  const { t } = useLanguage();

  return (
    <div className="space-y-2 border-b pb-4">
      <div className="flex items-center gap-2">
        <Droplet className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-medium">{t('profile.bloodType.title')}</h3>
      </div>
      <div className="max-w-xs">
        <Select value={bloodType || "unknown"} onValueChange={setBloodType}>
          <SelectTrigger>
            <SelectValue placeholder={t('profile.bloodType.select')} />
          </SelectTrigger>
          <SelectContent>
            {bloodTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "unknown" ? t('profile.bloodType.unknown') : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BloodTypeSection;
