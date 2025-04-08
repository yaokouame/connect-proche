
import React from "react";
import { Professional } from "@/types/user";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import ProfileHeader from "./ProfileHeader";
import ExperienceInfo from "./ExperienceInfo";
import AvailabilitySlots from "./AvailabilitySlots";

interface ProfessionalCardProps {
  professional: Professional;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  const { t } = useLanguage();

  // Function to format prices in F CFA
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CI', { 
      style: 'currency', 
      currency: 'XOF',
      maximumFractionDigits: 0,
      currencyDisplay: 'code'
    }).format(price).replace('XOF', 'F CFA');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <ProfileHeader professional={professional} />
        <ExperienceInfo professional={professional} />
        <AvailabilitySlots availableSlots={professional.availableSlots} />
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <p className="text-sm text-gray-500">
            Consultation: <span className="font-medium text-gray-900">{formatPrice(professional.fees?.consultation)}</span>
          </p>
        </div>
        <Button>{t('professionals.appointment')}</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfessionalCard;
