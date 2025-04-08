
import React from "react";
import { Professional } from "@/types/user";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ExperienceInfo from "./ExperienceInfo";
import AvailabilitySlots from "./AvailabilitySlots";
import { toast } from "@/components/ui/use-toast";

interface ProfessionalCardProps {
  professional: Professional;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Function to format prices in F CFA
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CI', { 
      style: 'currency', 
      currency: 'XOF',
      maximumFractionDigits: 0,
      currencyDisplay: 'code'
    }).format(price).replace('XOF', 'F CFA');
  };

  const handleAppointment = () => {
    // Store the professional ID for the appointment page
    localStorage.setItem('selectedProfessionalId', professional.id);
    
    // Show success toast
    toast({
      title: t('professionals.appointment'),
      description: `Rendez-vous avec ${professional.name}`,
      duration: 3000,
    });
    
    // Navigate to appointments page
    navigate('/appointments');
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
        <Button onClick={handleAppointment}>{t('professionals.appointment')}</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfessionalCard;
