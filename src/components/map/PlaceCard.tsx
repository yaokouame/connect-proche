
import React from "react";
import { Pharmacy, HealthCenter } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistance } from "@/utils/mapUtils";
import { MapPin, Phone, Clock, Activity, Shield, Circle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PlaceCardProps {
  place: Pharmacy | HealthCenter;
  userLocation: { lat: number; lng: number } | null;
  userInsuranceProvider: string | null;
  viewOnMap: (location: { lat: number; lng: number }) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  userLocation,
  userInsuranceProvider,
  viewOnMap,
}) => {
  const { t } = useLanguage();
  
  // Calculate if user insurance is accepted
  const isUserInsuranceAccepted = 
    userInsuranceProvider && 
    place.acceptedInsuranceProviders && 
    place.acceptedInsuranceProviders.includes(userInsuranceProvider);
  
  // Check if this is a pharmacy and if it has onDuty status
  const isPharmacy = !('services' in place);
  const dutyStatus = isPharmacy && 'onDuty' in place ? place.onDuty : null;
  
  // Determine border color based on duty status (only for pharmacies)
  const borderColor = isPharmacy 
    ? dutyStatus 
      ? "border-l-green-500" 
      : "border-l-red-500"
    : "border-l-primary";
  
  return (
    <Card className={`mb-4 overflow-hidden border-l-4 ${borderColor}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          {place.name}
          {isPharmacy && (
            dutyStatus ? (
              <Circle className="ml-2 h-4 w-4 text-green-500 fill-green-500" />
            ) : (
              <Circle className="ml-2 h-4 w-4 text-red-500 fill-red-500" />
            )
          )}
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{place.address}</span>
        </div>
        
        {/* Add duty status label for pharmacies */}
        {isPharmacy && (
          <div className="mt-1">
            <Badge variant={dutyStatus ? "success" : "destructive"}>
              {dutyStatus ? t('map.onDuty') : t('map.offDuty')}
            </Badge>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pb-2 pt-0">
        {/* Phone and hours */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{place.phone}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{place.hours}</span>
          </div>
          
          {userLocation && place.location && (
            <div className="flex items-center font-medium">
              <span>
                {formatDistance(userLocation, place.location)} {t('map.fromYourLocation')}
              </span>
            </div>
          )}
        </div>
        
        {/* Insurance accepted */}
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-1.5">{t('generic.acceptedInsurance')}:</h4>
          <div className="flex flex-wrap gap-1.5">
            {place.acceptedInsuranceProviders && place.acceptedInsuranceProviders.length > 0 ? (
              place.acceptedInsuranceProviders.map((provider, index) => (
                <Badge key={index} variant={isUserInsuranceAccepted && provider === userInsuranceProvider ? "default" : "outline"}>
                  {provider}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">{t('generic.noInsurance')}</span>
            )}
          </div>
        </div>
        
        {/* Services for HealthCenter */}
        {'services' in place && place.services && place.services.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium mb-1.5">
              <Activity className="inline-block mr-1 h-4 w-4" /> 
              {t('generic.services')}:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {place.services.map((service, index) => (
                <Badge key={index} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => place.location && viewOnMap(place.location)}
        >
          {t('map.showOnMap')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
