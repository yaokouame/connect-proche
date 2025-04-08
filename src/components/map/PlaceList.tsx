
import React from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';
import PlaceCard from './PlaceCard';

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
  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Chargement des établissements...</p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {filterByInsurance
            ? `Aucun établissement trouvé pour "${searchTerm}" acceptant l'assurance ${filterByInsurance}`
            : `Aucun établissement trouvé pour "${searchTerm}"`
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
