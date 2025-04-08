
import React from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Navigation, BadgeCheck, Wallet, Map as MapIcon } from "lucide-react";
import { formatDistance } from '@/utils/mapUtils';

interface PlaceCardProps {
  place: Pharmacy | HealthCenter;
  userLocation: { lat: number; lng: number } | null;
  userInsuranceProvider: string | null;
  viewOnMap: (location: { lat: number; lng: number }) => void;
}

const PlaceCard = ({ place, userLocation, userInsuranceProvider, viewOnMap }: PlaceCardProps) => {
  const distance = userLocation ? formatDistance(
    Math.sqrt(
      Math.pow(place.location.lat - userLocation.lat, 2) + 
      Math.pow(place.location.lng - userLocation.lng, 2)
    ) * 111.32 // Approximate conversion to km at equator
  ) : '';

  // Check if the place is a health center by checking for the services property
  const isHealthCenter = 'services' in place;

  return (
    <Card key={place.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{place.name}</CardTitle>
        <CardDescription className="flex items-start">
          <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
          {place.address}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Phone className="h-4 w-4 mr-1" />
          {place.phone}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          {place.hours}
        </div>
        
        {place.rating && (
          <div className="flex items-center text-sm text-yellow-600 font-medium mb-4">
            {"⭐".repeat(Math.min(Math.round(place.rating), 5))} 
            <span className="ml-1">({place.rating.toFixed(1)})</span>
          </div>
        )}
        
        {userLocation && (
          <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
            <Navigation className="h-4 w-4 mr-1" />
            {distance}
          </div>
        )}
        
        {isHealthCenter && 'services' in place && place.services && place.services.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Services:</p>
            <div className="flex flex-wrap gap-1">
              {place.services.map((service, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-health-blue/10 text-health-blue px-2 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {place.acceptedInsuranceProviders && place.acceptedInsuranceProviders.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium flex items-center mb-2">
              <Wallet className="h-4 w-4 mr-1 text-gray-500" />
              Assurances acceptées:
            </p>
            <div className="flex flex-wrap gap-1">
              {place.acceptedInsuranceProviders.map((provider, idx) => {
                const isUserInsurance = provider === userInsuranceProvider;
                return (
                  <Badge 
                    key={idx} 
                    className={isUserInsurance ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                  >
                    {provider}
                    {isUserInsurance && (
                      <BadgeCheck className="h-3 w-3 ml-1 text-green-600" />
                    )}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        
        <Button 
          size="sm" 
          onClick={() => viewOnMap(place.location)}
          className="flex items-center"
        >
          <MapIcon className="h-4 w-4 mr-2" />
          Voir sur la carte
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
