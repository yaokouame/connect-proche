
import { Pharmacy, HealthCenter, Product, Appointment, InsuranceProvider } from "../types/user";

// Mock data for pharmacies
export const getPharmacies = async (): Promise<Pharmacy[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "pharm-1",
      name: "Pharmacie Centrale",
      address: "12 rue de la Paix, 75001 Paris",
      phone: "+33 1 42 68 50 00",
      hours: "Lun-Sam: 8h-20h, Dim: 10h-18h",
      location: { lat: 48.8711, lng: 2.3322 },
      acceptedInsuranceProviders: ["CPAM", "MGEN", "Allianz", "AXA"]
    },
    {
      id: "pharm-2",
      name: "Grande Pharmacie de la Ville",
      address: "45 avenue des Champs-Élysées, 75008 Paris",
      phone: "+33 1 53 89 25 10",
      hours: "Lun-Ven: 8h30-20h30, Sam-Dim: 9h-19h",
      location: { lat: 48.8724, lng: 2.3015 },
      acceptedInsuranceProviders: ["CPAM", "Harmonie Mutuelle", "Swiss Life"]
    },
    {
      id: "pharm-3",
      name: "Pharmacie du Marché",
      address: "73 rue Mouffetard, 75005 Paris",
      phone: "+33 1 45 35 82 21",
      hours: "Lun-Sam: 9h-19h30, Fermé le dimanche",
      location: { lat: 48.8422, lng: 2.3508 },
      acceptedInsuranceProviders: ["CPAM", "MGEN", "Malakoff Médéric"]
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
      name: "Centre Médical Saint-Louis",
      type: "Clinique générale",
      services: ["Médecine générale", "Cardiologie", "Pédiatrie", "Gynécologie"],
      address: "42 boulevard Saint-Michel, 75006 Paris",
      phone: "+33 1 46 33 45 70",
      hours: "Lun-Ven: 8h-20h, Sam: 9h-17h, Fermé le dimanche",
      location: { lat: 48.8518, lng: 2.3408 },
      acceptedInsuranceProviders: ["CPAM", "MGEN", "AXA", "AG2R La Mondiale"]
    },
    {
      id: "center-2",
      name: "Hôpital Hôtel-Dieu",
      type: "Hôpital universitaire",
      services: ["Urgences", "Chirurgie", "Radiologie", "Laboratoire d'analyses"],
      address: "1 Parvis Notre-Dame, 75004 Paris",
      phone: "+33 1 42 34 82 34",
      hours: "24h/24, 7j/7",
      location: { lat: 48.8542, lng: 2.3480 },
      acceptedInsuranceProviders: ["CPAM", "Toutes mutuelles"]
    },
    {
      id: "center-3",
      name: "Centre de Santé Belleville",
      type: "Centre de santé communautaire",
      services: ["Médecine générale", "Dentisterie", "Psychologie", "Services sociaux"],
      address: "18 rue des Pyrénées, 75020 Paris",
      phone: "+33 1 43 66 90 45",
      hours: "Lun-Ven: 9h-19h, Sam: 9h-12h, Fermé le dimanche",
      location: { lat: 48.8725, lng: 2.3887 },
      acceptedInsuranceProviders: ["CPAM", "CMU", "AME", "MGEN"]
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
      price: 3.50,
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
      price: 4.95,
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
      price: 8.25,
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
      price: 5.65,
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
      price: 4.80,
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
      notes: "Suivi traitement cardiaque",
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
      name: "CPAM (Assurance Maladie)",
      logoUrl: "/placeholder.svg",
      contactPhone: "+33 3646",
      contactEmail: "contact@ameli.fr",
      website: "https://www.ameli.fr",
      availablePlans: ["Régime général", "ALD", "CMU-C"]
    },
    {
      id: "ins-2",
      name: "MGEN",
      logoUrl: "/placeholder.svg",
      contactPhone: "+33 3676",
      contactEmail: "contact@mgen.fr",
      website: "https://www.mgen.fr",
      availablePlans: ["ÉCO", "RÉFÉRENCE", "ÉQUILIBRE", "INTÉGRALE"]
    },
    {
      id: "ins-3",
      name: "AXA Santé",
      logoUrl: "/placeholder.svg",
      contactPhone: "+33 1 40 75 48 00",
      contactEmail: "contact@axa.fr",
      website: "https://www.axa.fr",
      availablePlans: ["Ma Santé Basique", "Ma Santé Évolution", "Ma Santé Intégrale"]
    },
    {
      id: "ins-4",
      name: "Harmonie Mutuelle",
      logoUrl: "/placeholder.svg",
      contactPhone: "+33 9 80 98 09 80",
      contactEmail: "contact@harmonie-mutuelle.fr",
      website: "https://www.harmonie-mutuelle.fr",
      availablePlans: ["Essentielle", "Equilibre", "Confort", "Plénitude"]
    },
  ];
};
