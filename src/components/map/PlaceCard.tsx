
import React from "react";
import { Pharmacy, HealthCenter } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistance } from "@/utils/mapUtils";
import { MapPin, Phone, Clock, Activity, Shield } from "lucide-react";
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
  
  return (
    <Card className="mb-4 overflow-hidden border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{place.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{place.address}</span>
        </div>
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
