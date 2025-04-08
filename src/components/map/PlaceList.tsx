
import React from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';
import PlaceCard from './PlaceCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, SearchX, Filter } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Loader2 className="h-8 w-8 text-health-blue animate-spin mb-4" />
        <p className="text-health-blue font-medium">{t("map.loadingPlaces")}</p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {searchTerm ? (
          <>
            <SearchX className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium mb-2">
              {t("map.noResultsSearch").replace("{0}", searchTerm)}
            </p>
          </>
        ) : filterByInsurance ? (
          <>
            <Filter className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium mb-2">
              {t("map.noResultsFilter").replace("{0}", filterByInsurance)}
            </p>
          </>
        ) : (
          <p className="text-gray-600 font-medium">
            {t("map.noPlacesFound")}
          </p>
        )}
        <p className="text-gray-500 text-sm max-w-xs">
          {t("map.tryDifferentSearch")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
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
