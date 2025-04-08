
import React from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';
import PlaceCard from './PlaceCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface PlaceListProps {
  places: (Pharmacy | HealthCenter)[];
  loading: boolean;
  searchTerm: string;
  filterByInsurance: string | null;
  userLocation: { lat: number; lng: number } | null;
  userInsuranceProvider: string | null;
  viewOnMap: (location: { lat: number; lng: number }) => void;
}

const PlaceList = ({
  places,
  loading,
  searchTerm,
  filterByInsurance,
  userLocation,
  userInsuranceProvider,
  viewOnMap
}: PlaceListProps) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>{t("map.loadingPlaces")}</p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {filterByInsurance
            ? t("map.noPlacesInsurance").replace("{0}", searchTerm).replace("{1}", filterByInsurance)
            : t("map.noPlaces").replace("{0}", searchTerm)
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          userLocation={userLocation}
          userInsuranceProvider={userInsuranceProvider}
          viewOnMap={viewOnMap}
        />
      ))}
    </div>
  );
};

export default PlaceList;
