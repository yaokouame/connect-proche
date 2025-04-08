
import { InsuranceProvider } from "@/types/health";

// Mock data for insurance providers
export const getInsuranceProviders = async (): Promise<InsuranceProvider[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "ins-1",
      name: "CMU (Couverture Maladie Universelle)",
      logoUrl: "/placeholder.svg",
      contactPhone: "+225 27 22 52 78 00",
      contactEmail: "contact@cmu.ci",
      website: "https://www.cmu.ci",
      availablePlans: ["Régime général", "Régime indigent", "Régime étudiant"]
    },
    {
      id: "ins-2",
      name: "MUGEFCI",
      logoUrl: "/placeholder.svg",
      contactPhone: "+225 27 22 52 63 80",
      contactEmail: "contact@mugefci.ci",
      website: "https://www.mugefci.ci",
      availablePlans: ["Base", "Complémentaire", "Familial"]
    },
    {
      id: "ins-3",
      name: "CNPS",
      logoUrl: "/placeholder.svg",
      contactPhone: "+225 27 20 25 21 00",
      contactEmail: "contact@cnps.ci",
      website: "https://www.cnps.ci",
      availablePlans: ["Assurance maladie", "Retraite", "Prestations familiales"]
    },
    {
      id: "ins-4",
      name: "SUNU Assurances",
      logoUrl: "/placeholder.svg",
      contactPhone: "+225 27 20 31 02 03",
      contactEmail: "contact@sunu-ci.com",
      website: "https://www.sunu-group.com",
      availablePlans: ["Essentiel", "Confort", "Prestige", "Excellence"]
    },
  ];
};
