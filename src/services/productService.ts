
import { Product } from "@/types/user";

// Mock data for pharmaceutical products
export const getProducts = async (): Promise<Product[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "prod-1",
      name: "Doliprane 1000mg",
      category: "Analgésique",
      price: 2500,
      description: "Paracétamol pour le soulagement de la douleur et de la fièvre.",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      inStock: true,
      requiresPrescription: false,
      insuranceCoverage: {
        eligible: true,
        coveragePercentage: 65,
        requiresVoucher: false
      }
    },
    {
      id: "prod-2",
      name: "Advil 400mg",
      category: "Anti-inflammatoire",
      price: 3250,
      description: "Ibuprofène pour soulager la douleur et réduire l'inflammation.",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      inStock: true,
      requiresPrescription: false,
      insuranceCoverage: {
        eligible: true,
        coveragePercentage: 30,
        requiresVoucher: false
      }
    },
    {
      id: "prod-3",
      name: "Amoxicilline 500mg",
      category: "Antibiotique",
      price: 5450,
      description: "Antibiotique pour traiter diverses infections bactériennes.",
      imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      inStock: true,
      requiresPrescription: true,
      insuranceCoverage: {
        eligible: true,
        coveragePercentage: 65,
        requiresVoucher: false
      }
    },
    {
      id: "prod-4",
      name: "Ventoline 100µg",
      category: "Respiratoire",
      price: 3700,
      description: "Bronchodilatateur pour le traitement de l'asthme et d'autres problèmes respiratoires.",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      inStock: false,
      requiresPrescription: true,
      insuranceCoverage: {
        eligible: true,
        coveragePercentage: 100,
        requiresVoucher: true
      }
    },
    {
      id: "prod-5",
      name: "Smecta",
      category: "Digestif",
      price: 3150,
      description: "Traitement symptomatique des diarrhées aiguës et chroniques.",
      imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec871214838",
      inStock: true,
      requiresPrescription: false,
      insuranceCoverage: {
        eligible: false
      }
    },
    {
      id: "prod-6",
      name: "Aspirine 500mg",
      category: "Analgésique",
      price: 1950,
      description: "Acide acétylsalicylique pour soulager la douleur et réduire la fièvre.",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      inStock: true,
      requiresPrescription: false,
      insuranceCoverage: {
        eligible: true,
        coveragePercentage: 30
      }
    },
    {
      id: "prod-7",
      name: "Augmentin 1g",
      category: "Antibiotique",
      price: 6800,
      description: "Antibiotique à large spectre pour traiter différentes infections bactériennes.",
      imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      inStock: true,
      requiresPrescription: true,
      insuranceCoverage: {
        eligible: true,
        coveragePercentage: 80
      }
    },
    {
      id: "prod-8",
      name: "Imodium",
      category: "Digestif",
      price: 2700,
      description: "Pour le traitement de la diarrhée aiguë et chronique.",
      imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec871214838",
      inStock: true,
      requiresPrescription: false,
      insuranceCoverage: {
        eligible: false
      }
    }
  ];
};
