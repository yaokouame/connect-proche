
import React from "react";
import { Professional } from "@/types/user";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 mx-auto md:mx-0">
            <img
              src={professional.profileImage}
              alt={professional.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow space-y-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold flex items-center">
                  {professional.name}
                  {professional.verified && (
                    <CheckCircle className="h-4 w-4 text-blue-500 ml-2" />
                  )}
                </h3>
                <p className="text-gray-600">{professional.specialty}</p>
              </div>
              
              <div className="flex items-center mt-2 md:mt-0">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{professional.rating}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({professional.reviewCount} avis)
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <span>{professional.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span>{professional.experience} ans d'expérience</span>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-2">Prochaines disponibilités:</p>
              <div className="flex flex-wrap gap-2">
                {professional.availableSlots?.map((slot, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
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
