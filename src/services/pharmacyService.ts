
import { Pharmacy, HealthCenter } from "@/types/user";

// Mock data for pharmacies
export const getPharmacies = async (): Promise<Pharmacy[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "pharm-1",
      name: "Pharmacie Saint Jean",
      address: "Boulevard Latrille, Cocody, Abidjan",
      phone: "+225 27 22 44 56 78",
      hours: "Lun-Sam: 8h-20h, Dim: 10h-18h",
      location: { lat: 5.3471, lng: -4.0082 },
      acceptedInsuranceProviders: ["MUGEFCI", "CNPS", "IPS-CGRAE", "CMU"]
    },
    {
      id: "pharm-2",
      name: "Pharmacie Les Rosiers",
      address: "Rue des Jardins, II Plateaux, Abidjan",
      phone: "+225 27 22 41 73 22",
      hours: "Lun-Ven: 8h30-20h30, Sam-Dim: 9h-19h",
      location: { lat: 5.3500, lng: -4.0144 },
      acceptedInsuranceProviders: ["MUGEFCI", "CMU", "SUNU Assurances"]
    },
    {
      id: "pharm-3",
      name: "Pharmacie de Treichville",
      address: "Avenue 16, Treichville, Abidjan",
      phone: "+225 27 21 24 52 65",
      hours: "Lun-Sam: 9h-19h30, Fermé le dimanche",
      location: { lat: 5.2919, lng: -4.0128 },
      acceptedInsuranceProviders: ["CMU", "CNPS", "Saham Assurance"]
    },
  ];
};

// Mock data for health centers
export const getHealthCenters = async (): Promise<HealthCenter[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "center-1",
      name: "Centre Hospitalier Universitaire (CHU) de Cocody",
      type: "Hôpital universitaire",
      services: ["Médecine générale", "Cardiologie", "Pédiatrie", "Gynécologie"],
      address: "Boulevard de l'Université, Cocody, Abidjan",
      phone: "+225 27 22 48 10 00",
      hours: "24h/24, 7j/7",
      location: { lat: 5.3442, lng: -3.9996 },
      acceptedInsuranceProviders: ["MUGEFCI", "CNPS", "IPS-CGRAE", "CMU"]
    },
    {
      id: "center-2",
      name: "Polyclinique Internationale Sainte Anne-Marie (PISAM)",
      type: "Clinique privée",
      services: ["Urgences", "Chirurgie", "Radiologie", "Laboratoire d'analyses"],
      address: "Boulevard de la Corniche, Cocody, Abidjan",
      phone: "+225 27 22 48 31 31",
      hours: "24h/24, 7j/7",
      location: { lat: 5.3326, lng: -4.0167 },
      acceptedInsuranceProviders: ["MUGEFCI", "CNPS", "Allianz", "AXA", "Toutes assurances"]
    },
    {
      id: "center-3",
      name: "Centre Médical de Marcory",
      type: "Centre de santé",
      services: ["Médecine générale", "Dentisterie", "Maternité", "Services sociaux"],
      address: "Boulevard Valéry Giscard d'Estaing, Marcory, Abidjan",
      phone: "+225 27 21 21 64 64",
      hours: "Lun-Ven: 8h-18h, Sam: 9h-13h, Fermé le dimanche",
      location: { lat: 5.3019, lng: -4.0151 },
      acceptedInsuranceProviders: ["CMU", "CNPS", "MUGEFCI"]
    },
  ];
};
