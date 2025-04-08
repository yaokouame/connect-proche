
import { supabase } from "@/integrations/supabase/client";
import { 
  Professional, 
  Pharmacy, 
  PatientProfile,
  Prescription,
  ProfessionalProfile 
} from "@/types/user";

/**
 * Services for database operations
 */

// Professionals
export const fetchProfessionals = async () => {
  try {
    // Mock database call for demonstration
    // In a real app with Supabase connected, this would use:
    // const { data, error } = await supabase.from('professionals').select('*');
    
    // For now, return mock data
    return mockProfessionals;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    throw error;
  }
};

export const updateProfessionalStatus = async (id: string, isOnline: boolean) => {
  try {
    // Mock database call for demonstration
    // In a real app with Supabase connected:
    // const { data, error } = await supabase.from('professionals').update({ isOnline }).eq('id', id).select();
    
    // Return mock data
    const updatedPro = mockProfessionals.find(p => p.id === id);
    if (updatedPro) {
      updatedPro.isOnline = isOnline;
    }
    return [updatedPro];
  } catch (error) {
    console.error("Error updating professional status:", error);
    throw error;
  }
};

// Pharmacies
export const fetchPharmacies = async () => {
  try {
    // Mock database call for demonstration
    // In a real app with Supabase connected:
    // const { data, error } = await supabase.from('pharmacies').select('*');
    
    // Return mock data
    return mockPharmacies;
  } catch (error) {
    console.error("Error fetching pharmacies:", error);
    throw error;
  }
};

export const updatePharmacyDutyStatus = async (id: string, onDuty: boolean) => {
  try {
    // Mock database call for demonstration
    // In a real app with Supabase connected:
    // const { data, error } = await supabase.from('pharmacies').update({ onDuty }).eq('id', id).select();
    
    // Return mock data
    const updatedPharmacy = mockPharmacies.find(p => p.id === id);
    if (updatedPharmacy) {
      updatedPharmacy.onDuty = onDuty;
    }
    return [updatedPharmacy];
  } catch (error) {
    console.error("Error updating pharmacy duty status:", error);
    throw error;
  }
};

// Patients
export const fetchPatients = async () => {
  try {
    // Mock database call for demonstration
    // In a real app with Supabase connected:
    // const { data, error } = await supabase.from('patients').select('*');
    
    // Return mock data
    return mockPatients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// Prescriptions
export const fetchPrescriptions = async () => {
  try {
    // Mock database call for demonstration
    // In a real app with Supabase connected:
    // const { data, error } = await supabase.from('prescriptions').select('*');
    
    // Return mock data
    return mockPrescriptions;
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    throw error;
  }
};

/**
 * Function to insert mock data for testing
 */
export const insertMockData = async () => {
  // This function would be used to seed the database with initial data
  // Implementation would depend on the specific needs
  console.log("Inserting mock data...");
};

// Mock data for demonstration
const mockProfessionals: ProfessionalProfile[] = [
  {
    id: "pro-123",
    name: "Dr. Jean Michel",
    email: "jean@example.com",
    role: "professional",
    specialty: "Cardiologue",
    license: "MED-12345",
    isOnline: true,
    location: {
      city: "Abidjan",
      region: "Cocody"
    }
  },
  {
    id: "pro-124",
    name: "Dr. Sophie Martin",
    email: "sophie@example.com",
    role: "professional",
    specialty: "Pédiatre",
    license: "MED-67890",
    isOnline: false,
    location: {
      city: "Abidjan",
      region: "Plateau"
    }
  }
];

const mockPharmacies: Pharmacy[] = [
  {
    id: "pharm-1",
    name: "Pharmacie Centrale",
    address: "123 Rue Principale",
    phone: "01 23 45 67 89",
    hours: "8h00 - 20h00",
    onDuty: true,
    location: { lat: 5.341, lng: -4.015 }
  },
  {
    id: "pharm-2",
    name: "Pharmacie du Marché",
    address: "45 Avenue du Commerce",
    phone: "01 23 45 67 90",
    hours: "9h00 - 19h00",
    onDuty: false,
    location: { lat: 5.345, lng: -4.025 }
  }
];

const mockPatients: PatientProfile[] = [
  {
    id: "patient-456",
    name: "Marie Dupont",
    email: "marie@example.com",
    role: "patient",
    location: {
      city: "Abidjan",
      region: "Plateau"
    }
  },
  {
    id: "patient-789",
    name: "Pierre Kouassi",
    email: "pierre@example.com",
    role: "patient",
    location: {
      city: "Abidjan",
      region: "Yopougon"
    }
  }
];

const mockPrescriptions: Prescription[] = [
  {
    id: "presc-1",
    patientId: "patient-456",
    professionalId: "pro-123",
    professionalName: "Dr. Jean Michel",
    date: "15/09/2023",
    expiryDate: "15/12/2023",
    status: "active",
    medications: [
      {
        name: "Amoxicilline",
        dosage: "500mg",
        frequency: "3 fois par jour",
        duration: "7 jours"
      }
    ],
    instructions: "Prendre avec de la nourriture."
  },
  {
    id: "presc-2",
    patientId: "patient-789",
    professionalId: "pro-124",
    professionalName: "Dr. Sophie Martin",
    date: "25/07/2023",
    expiryDate: "25/10/2023",
    status: "expired",
    medications: [
      {
        name: "Ventoline",
        dosage: "100µg",
        frequency: "2 inhalations",
        duration: "En cas de crise"
      }
    ],
    instructions: "Utiliser en cas de difficulté respiratoire."
  }
];
