
import { InsuranceVoucher, InsuranceProvider } from "@/types/health";
import { Pharmacy, HealthCenter, Product, Appointment } from "@/types/user";

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
      imageUrl: "/placeholder.svg",
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
      imageUrl: "/placeholder.svg",
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
      imageUrl: "/placeholder.svg",
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
      imageUrl: "/placeholder.svg",
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
      imageUrl: "/placeholder.svg",
      inStock: true,
      requiresPrescription: false,
      insuranceCoverage: {
        eligible: false
      }
    },
  ];
};

// Mock appointments data
export const getUserAppointments = async (userId: string): Promise<Appointment[]> => {
  // In a real app, this would be an API call filtered by userId
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "apt-1",
      patientId: "patient-456",
      professionalId: "pro-123",
      date: "2023-10-15",
      time: "14:30",
      status: "scheduled",
      notes: "Consultation générale",
      insuranceVoucherId: "voucher-123"
    },
    {
      id: "apt-2",
      patientId: "patient-456",
      professionalId: "pro-124",
      date: "2023-09-25",
      time: "10:00",
      status: "completed",
      notes: "Suivi traitement paludisme",
    },
  ];
};

// Mock appointment creation
export const createAppointment = async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    patientId: appointmentData.patientId || "",
    professionalId: appointmentData.professionalId || "",
    date: appointmentData.date || "",
    time: appointmentData.time || "",
    status: "scheduled",
    notes: appointmentData.notes,
    insuranceVoucherId: appointmentData.insuranceVoucherId
  };
  
  return newAppointment;
};

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
