
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
    const { data, error } = await supabase
      .from('professionals')
      .select('*');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    throw error;
  }
};

export const updateProfessionalStatus = async (id: string, isOnline: boolean) => {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .update({ isOnline })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating professional status:", error);
    throw error;
  }
};

// Pharmacies
export const fetchPharmacies = async () => {
  try {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching pharmacies:", error);
    throw error;
  }
};

export const updatePharmacyDutyStatus = async (id: string, onDuty: boolean) => {
  try {
    const { data, error } = await supabase
      .from('pharmacies')
      .update({ onDuty })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating pharmacy duty status:", error);
    throw error;
  }
};

// Patients
export const fetchPatients = async () => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// Prescriptions
export const fetchPrescriptions = async () => {
  try {
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*');
    
    if (error) throw error;
    return data;
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
