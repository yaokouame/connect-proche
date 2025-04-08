import { Pharmacy, HealthCenter } from '@/types/user';

// Mock data for pharmacies
export const getMockPharmacies = (): Pharmacy[] => [
  {
    id: 'ph-1',
    name: 'Pharmacie Centrale',
    address: '123 Avenue des Champs-Élysées, Paris',
    phone: '+33 1 23 45 67 89',
    hours: 'Lun-Sam: 8h-20h, Dim: 9h-18h',
    location: { lat: 48.873792, lng: 2.295028 },
    acceptedInsuranceProviders: ['CMU', 'Assurance Nationale', 'MutuelSanté'],
    rating: 4.5,
    placeId: 'ChIJxxxxxxxxxxxxxx1',
    onDuty: true
  },
  {
    id: 'ph-2',
    name: 'Pharmacie du Marché',
    address: '45 Rue de Rivoli, Paris',
    phone: '+33 1 98 76 54 32',
    hours: 'Lun-Ven: 8h30-19h30, Sam: 9h-19h',
    location: { lat: 48.856613, lng: 2.352222 },
    acceptedInsuranceProviders: ['MutuelSanté', 'AssurTous'],
    rating: 4.2,
    placeId: 'ChIJxxxxxxxxxxxxxx2',
    onDuty: false
  }
];

// Mock data for health centers
export const getMockHealthCenters = (): HealthCenter[] => [
  {
    id: 'hc-1',
    name: 'Centre Médical Saint-Michel',
    type: 'Clinique',
    services: ['Médecine générale', 'Cardiologie', 'Pédiatrie'],
    address: '7 Boulevard Saint-Michel, Paris',
    phone: '+33 1 11 22 33 44',
    hours: 'Lun-Ven: 8h-19h',
    location: { lat: 48.853333, lng: 2.343333 },
    acceptedInsuranceProviders: ['CMU', 'AssurTous', 'MutuelSanté'],
    rating: 4.7,
    placeId: 'ChIJxxxxxxxxxxxxxx3'
  },
  {
    id: 'hc-2',
    name: 'Hôpital Saint-Louis',
    type: 'Hôpital',
    services: ['Urgences', 'Chirurgie', 'Maternité', 'Oncologie'],
    address: '1 Avenue Claude Vellefaux, Paris',
    phone: '+33 1 42 49 49 49',
    hours: '24h/24, 7j/7',
    location: { lat: 48.874352, lng: 2.368351 },
    acceptedInsuranceProviders: ['CMU', 'Assurance Nationale', 'MutuelSanté', 'AssurTous'],
    rating: 4.4,
    placeId: 'ChIJxxxxxxxxxxxxxx4'
  }
];

// Function to search for pharmacies and health centers using Google Places API
// This is a mock implementation for now
export const searchNearbyPlaces = async (
  location: { lat: number; lng: number },
  radius: number = 1500,
  type: 'pharmacy' | 'health' | 'both',
  keyword?: string
): Promise<(Pharmacy | HealthCenter)[]> => {
  console.log(`Searching for ${type} places near ${location.lat},${location.lng} within ${radius}m`);
  
  // For demo purposes, return mock data
  let results: (Pharmacy | HealthCenter)[] = [];
  
  if (type === 'pharmacy' || type === 'both') {
    results = [...results, ...getMockPharmacies()];
  }
  
  if (type === 'health' || type === 'both') {
    results = [...results, ...getMockHealthCenters()];
  }
  
  // Filter by keyword if provided
  if (keyword && keyword.length > 0) {
    const lowerKeyword = keyword.toLowerCase();
    results = results.filter(
      place => place.name.toLowerCase().includes(lowerKeyword) || 
               place.address.toLowerCase().includes(lowerKeyword)
    );
  }
  
  // Sort by distance from provided location (simplified calculation)
  results.sort((a, b) => {
    const distA = Math.sqrt(
      Math.pow(a.location.lat - location.lat, 2) + 
      Math.pow(a.location.lng - location.lng, 2)
    );
    const distB = Math.sqrt(
      Math.pow(b.location.lat - location.lat, 2) + 
      Math.pow(b.location.lng - location.lng, 2)
    );
    return distA - distB;
  });
  
  return results;
};

// This function would use the Google Places API in a real implementation
export const getPlaceDetails = async (placeId: string): Promise<Pharmacy | HealthCenter | null> => {
  console.log(`Getting details for place ID: ${placeId}`);
  
  // For demo purposes, search in our mock data
  const allPlaces = [...getMockPharmacies(), ...getMockHealthCenters()];
  const place = allPlaces.find(p => p.placeId === placeId);
  
  return place || null;
};
