
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
import { MapPin, Phone, Clock, Navigation, BadgeCheck, Wallet, Map as MapIcon, Star } from "lucide-react";
import { formatDistance, calculateDistance } from '@/utils/mapUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface PlaceCardProps {
  place: Pharmacy | HealthCenter;
  userLocation: { lat: number; lng: number } | null;
  userInsuranceProvider: string | null;
  viewOnMap: (location: { lat: number; lng: number }) => void;
}

const PlaceCard = ({ place, userLocation, userInsuranceProvider, viewOnMap }: PlaceCardProps) => {
  const { t } = useLanguage();
  const distanceValue = userLocation ? calculateDistance(userLocation, place.location) : null;
  const distance = distanceValue !== null ? formatDistance(distanceValue) : '';

  // Check if the place is a health center by checking for the services property
  const isHealthCenter = 'services' in place;

  // Function to render star rating
  const renderRating = (rating: number = 0) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4", 
              star <= Math.round(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            )}
          />
        ))}
        <span className="ml-1 text-sm font-medium">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <Card 
      key={place.id} 
      className="overflow-hidden hover:border-health-blue transition-colors duration-200"
    >
      <CardHeader className="pb-2 bg-gradient-to-r from-health-blue/10 to-transparent">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-health-blue">{place.name}</CardTitle>
            <CardDescription className="flex items-start mt-1">
              <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-500" />
              {place.address}
            </CardDescription>
          </div>
          {place.rating && (
            <div className="flex-shrink-0">
              {renderRating(place.rating)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-700">
            <Phone className="h-4 w-4 mr-2 text-health-blue" />
            {place.phone}
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-health-blue" />
            {place.hours}
          </div>
          
          {userLocation && distance && (
            <div className="flex items-center text-sm font-medium text-health-teal">
              <Navigation className="h-4 w-4 mr-2" />
              {distance} {t('map.fromYourLocation')}
            </div>
          )}
          
          {isHealthCenter && 'services' in place && place.services && place.services.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2 text-gray-700">{t('map.services')}:</p>
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
            <div className="mt-3">
              <p className="text-sm font-medium flex items-center mb-2 text-gray-700">
                <Wallet className="h-4 w-4 mr-1 text-health-blue" />
                {t('map.insuranceAccepted')}:
              </p>
              <div className="flex flex-wrap gap-1">
                {place.acceptedInsuranceProviders.map((provider, idx) => {
                  const isUserInsurance = provider === userInsuranceProvider;
                  return (
                    <Badge 
                      key={idx} 
                      variant={isUserInsurance ? "default" : "outline"}
                      className={isUserInsurance ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {provider}
                      {isUserInsurance && (
                        <BadgeCheck className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
          
          <Button 
            variant="outline"
            size="sm" 
            onClick={() => viewOnMap(place.location)}
            className="flex items-center w-full mt-3 border-health-blue text-health-blue hover:bg-health-blue hover:text-white"
          >
            <MapIcon className="h-4 w-4 mr-2" />
            {t('map.viewOnMap')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
