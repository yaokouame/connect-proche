
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
    console.log("Fetching professionals from Supabase...");
    // Using Supabase to fetch data
    const { data, error } = await supabase.from('professionals').select('*');
    
    if (error) {
      console.error("Error fetching professionals from Supabase:", error);
      // Fall back to mock data if there's an error
      return mockProfessionals;
    }
    
    console.log("Fetched professionals:", data);
    return data.length ? data : mockProfessionals;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return mockProfessionals;
  }
};

export const updateProfessionalStatus = async (id: string, isOnline: boolean) => {
  try {
    console.log(`Updating professional status for ${id} to ${isOnline}`);
    // Update in Supabase
    const { data, error } = await supabase
      .from('professionals')
      .update({ isOnline })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error("Error updating professional status in Supabase:", error);
      // Fall back to mock data
      const updatedPro = mockProfessionals.find(p => p.id === id);
      if (updatedPro) {
        updatedPro.isOnline = isOnline;
      }
      return [updatedPro];
    }
    
    console.log("Updated professional:", data);
    return data;
  } catch (error) {
    console.error("Error updating professional status:", error);
    // Fall back to mock data
    const updatedPro = mockProfessionals.find(p => p.id === id);
    if (updatedPro) {
      updatedPro.isOnline = isOnline;
    }
    return [updatedPro];
  }
};

// Pharmacies
export const fetchPharmacies = async () => {
  try {
    console.log("Fetching pharmacies from Supabase...");
    // Using Supabase to fetch data
    const { data, error } = await supabase.from('pharmacies').select('*');
    
    if (error) {
      console.error("Error fetching pharmacies from Supabase:", error);
      // Fall back to mock data
      return mockPharmacies;
    }
    
    console.log("Fetched pharmacies:", data);
    return data.length ? data : mockPharmacies;
  } catch (error) {
    console.error("Error fetching pharmacies:", error);
    return mockPharmacies;
  }
};

export const updatePharmacyDutyStatus = async (id: string, onDuty: boolean) => {
  try {
    console.log(`Updating pharmacy duty status for ${id} to ${onDuty}`);
    // Update in Supabase
    const { data, error } = await supabase
      .from('pharmacies')
      .update({ onDuty })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error("Error updating pharmacy duty status in Supabase:", error);
      // Fall back to mock data
      const updatedPharmacy = mockPharmacies.find(p => p.id === id);
      if (updatedPharmacy) {
        updatedPharmacy.onDuty = onDuty;
      }
      return [updatedPharmacy];
    }
    
    console.log("Updated pharmacy:", data);
    return data;
  } catch (error) {
    console.error("Error updating pharmacy duty status:", error);
    // Fall back to mock data
    const updatedPharmacy = mockPharmacies.find(p => p.id === id);
    if (updatedPharmacy) {
      updatedPharmacy.onDuty = onDuty;
    }
    return [updatedPharmacy];
  }
};

// Patients
export const fetchPatients = async () => {
  try {
    console.log("Fetching patients from Supabase...");
    // Using Supabase to fetch data
    const { data, error } = await supabase.from('patients').select('*');
    
    if (error) {
      console.error("Error fetching patients from Supabase:", error);
      // Fall back to mock data
      return mockPatients;
    }
    
    console.log("Fetched patients:", data);
    return data.length ? data : mockPatients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return mockPatients;
  }
};

// Prescriptions
export const fetchPrescriptions = async () => {
  try {
    console.log("Fetching prescriptions from Supabase...");
    // Using Supabase to fetch data
    const { data, error } = await supabase.from('prescriptions').select('*');
    
    if (error) {
      console.error("Error fetching prescriptions from Supabase:", error);
      // Fall back to mock data
      return mockPrescriptions;
    }
    
    console.log("Fetched prescriptions:", data);
    return data.length ? data : mockPrescriptions;
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return mockPrescriptions;
  }
};

// Save prescription to database
export const savePrescription = async (prescription: Prescription) => {
  try {
    console.log("Saving prescription to Supabase:", prescription);
    // Save to Supabase
    const { data, error } = await supabase
      .from('prescriptions')
      .upsert(prescription)
      .select();
    
    if (error) {
      console.error("Error saving prescription to Supabase:", error);
      throw error;
    }
    
    console.log("Saved prescription:", data);
    return data[0];
  } catch (error) {
    console.error("Error saving prescription:", error);
    throw error;
  }
};

/**
 * Function to insert mock data for testing
 */
export const insertMockData = async () => {
  try {
    console.log("Checking existing data in Supabase...");
    
    // Check if data already exists for professionals
    const { count: professionalCount, error: proCountError } = await supabase
      .from('professionals')
      .select('*', { count: 'exact', head: true });
      
    if (proCountError) {
      console.error("Error checking professionals count:", proCountError);
    }
    
    console.log("Professional count:", professionalCount);
    
    if (!professionalCount) {
      console.log("Inserting mock professionals...");
      
      // Insert professionals one by one to better handle errors
      for (const professional of mockProfessionals) {
        const { error } = await supabase
          .from('professionals')
          .upsert(professional, { onConflict: 'id' });
          
        if (error) {
          console.error(`Error inserting professional ${professional.id}:`, error);
        } else {
          console.log(`Successfully inserted professional: ${professional.name}`);
        }
      }
    }
    
    // Check if data already exists for pharmacies
    const { count: pharmacyCount, error: pharmCountError } = await supabase
      .from('pharmacies')
      .select('*', { count: 'exact', head: true });
      
    if (pharmCountError) {
      console.error("Error checking pharmacies count:", pharmCountError);
    }
    
    console.log("Pharmacy count:", pharmacyCount);
    
    if (!pharmacyCount) {
      console.log("Inserting mock pharmacies...");
      
      // Insert pharmacies one by one
      for (const pharmacy of mockPharmacies) {
        const { error } = await supabase
          .from('pharmacies')
          .upsert(pharmacy, { onConflict: 'id' });
          
        if (error) {
          console.error(`Error inserting pharmacy ${pharmacy.id}:`, error);
        } else {
          console.log(`Successfully inserted pharmacy: ${pharmacy.name}`);
        }
      }
    }
    
    // Check if data already exists for patients
    const { count: patientCount, error: patientCountError } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true });
      
    if (patientCountError) {
      console.error("Error checking patients count:", patientCountError);
    }
    
    console.log("Patient count:", patientCount);
    
    if (!patientCount) {
      console.log("Inserting mock patients...");
      
      // Insert patients one by one
      for (const patient of mockPatients) {
        const { error } = await supabase
          .from('patients')
          .upsert(patient, { onConflict: 'id' });
          
        if (error) {
          console.error(`Error inserting patient ${patient.id}:`, error);
        } else {
          console.log(`Successfully inserted patient: ${patient.name}`);
        }
      }
    }
    
    // We need to make sure patients and professionals exist before inserting prescriptions
    // that have foreign key references to them
    if (professionalCount && patientCount) {
      // Check if data already exists for prescriptions
      const { count: prescriptionCount, error: prescCountError } = await supabase
        .from('prescriptions')
        .select('*', { count: 'exact', head: true });
        
      if (prescCountError) {
        console.error("Error checking prescriptions count:", prescCountError);
      }
      
      console.log("Prescription count:", prescriptionCount);
      
      if (!prescriptionCount) {
        console.log("Inserting mock prescriptions...");
        
        // Insert prescriptions one by one
        for (const prescription of mockPrescriptions) {
          const { error } = await supabase
            .from('prescriptions')
            .upsert(prescription, { onConflict: 'id' });
            
          if (error) {
            console.error(`Error inserting prescription ${prescription.id}:`, error);
          } else {
            console.log(`Successfully inserted prescription for patient: ${prescription.patientId}`);
          }
        }
      }
    } else {
      console.log("Skipping prescription insertion as professionals and/or patients data is missing");
    }
    
    console.log("Mock data insertion complete");
    
  } catch (error) {
    console.error("Error during mock data insertion:", error);
  }
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
