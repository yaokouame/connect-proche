
import { supabase } from "@/integrations/supabase/client";
import { User, PatientProfile, ProfessionalProfile, InsuranceVoucher, Medication } from "@/types/user";
import { VitalSign, PhysicalActivity, NutritionEntry, HydrationEntry, SleepEntry, WellnessGoal } from "@/types/health";

// Mock database functionality since the Supabase tables don't exist yet
// In a real implementation, these would call the actual Supabase tables

// User profiles
export const saveUserProfile = async (profile: Partial<User>) => {
  try {
    console.log("Saving user profile:", profile);
    // This is a mock implementation for now
    const updatedProfile = {
      ...profile,
      updated_at: new Date().toISOString()
    };
    
    // Store in localStorage for demo purposes
    if (profile.id) {
      localStorage.setItem(`profile_${profile.id}`, JSON.stringify(updatedProfile));
    }
    
    return updatedProfile;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    console.log("Getting user profile for:", userId);
    
    // Retrieve from localStorage for demo purposes
    const savedProfile = localStorage.getItem(`profile_${userId}`);
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    
    // Return mock data if no saved profile exists
    return {
      id: userId,
      email: "user@example.com",
      name: "Demo User",
      role: "patient",
      profileImageUrl: null,
      created_at: new Date().toISOString(),
      allergies: [],
      medications: [],
      medicalHistory: [],
      bloodType: "unknown",
      isProfileComplete: false,
      isSharingMedicalData: false,
      authorizedDoctors: []
    };
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Vital signs
export const saveVitalSign = async (vitalSign: Omit<VitalSign, 'id'>) => {
  try {
    console.log("Saving vital sign:", vitalSign);
    
    // Generate an ID and add timestamp
    const newVitalSign = {
      id: `vital-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...vitalSign,
      timestamp: vitalSign.timestamp || new Date().toISOString()
    };
    
    // Store in localStorage for demo purposes
    const key = `vital_signs_${vitalSign.userId}`;
    const existingSignsJson = localStorage.getItem(key);
    const existingSigns = existingSignsJson ? JSON.parse(existingSignsJson) : [];
    
    localStorage.setItem(key, JSON.stringify([...existingSigns, newVitalSign]));
    
    return newVitalSign;
  } catch (error) {
    console.error("Error saving vital sign:", error);
    throw error;
  }
};

export const getUserVitalSigns = async (userId: string) => {
  try {
    console.log("Getting vital signs for user:", userId);
    
    // Retrieve from localStorage for demo purposes
    const key = `vital_signs_${userId}`;
    const signsJson = localStorage.getItem(key);
    const allSigns = signsJson ? JSON.parse(signsJson) : [];
    
    // Transform data to match frontend structure
    const vitalSignsData = {
      bloodPressure: [],
      heartRate: [],
      bloodSugar: [],
      weight: [],
      temperature: [],
      oxygen: []
    };
    
    allSigns.forEach(sign => {
      const transformedSign = {
        id: sign.id,
        userId: sign.userId,
        type: sign.type,
        value: sign.value,
        unit: sign.unit,
        timestamp: sign.timestamp,
        notes: sign.notes,
        device: sign.device
      };
      
      switch(sign.type) {
        case 'blood_pressure':
          vitalSignsData.bloodPressure.push(transformedSign);
          break;
        case 'heart_rate':
          vitalSignsData.heartRate.push(transformedSign);
          break;
        case 'blood_sugar':
          vitalSignsData.bloodSugar.push(transformedSign);
          break;
        case 'weight':
          vitalSignsData.weight.push(transformedSign);
          break;
        case 'temperature':
          vitalSignsData.temperature.push(transformedSign);
          break;
        case 'oxygen':
          vitalSignsData.oxygen.push(transformedSign);
          break;
      }
    });
    
    return vitalSignsData;
  } catch (error) {
    console.error("Error getting vital signs:", error);
    throw error;
  }
};

// Insurance vouchers
export const saveInsuranceVoucher = async (voucher: Omit<InsuranceVoucher, 'id'>) => {
  try {
    console.log("Saving insurance voucher:", voucher);
    
    // Generate an ID
    const newVoucher = {
      id: `voucher-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...voucher
    };
    
    // Store in localStorage for demo purposes
    const key = `insurance_vouchers_${voucher.userId}`;
    const existingVouchersJson = localStorage.getItem(key);
    const existingVouchers = existingVouchersJson ? JSON.parse(existingVouchersJson) : [];
    
    localStorage.setItem(key, JSON.stringify([...existingVouchers, newVoucher]));
    
    return newVoucher;
  } catch (error) {
    console.error("Error saving insurance voucher:", error);
    throw error;
  }
};

export const getUserInsuranceVouchers = async (userId: string) => {
  try {
    console.log("Getting insurance vouchers for user:", userId);
    
    // Retrieve from localStorage for demo purposes
    const key = `insurance_vouchers_${userId}`;
    const vouchersJson = localStorage.getItem(key);
    const vouchers = vouchersJson ? JSON.parse(vouchersJson) : [];
    
    return vouchers;
  } catch (error) {
    console.error("Error getting insurance vouchers:", error);
    throw error;
  }
};

// Wellness goals
export const saveWellnessGoal = async (goal: Omit<WellnessGoal, 'id'>) => {
  try {
    console.log("Saving wellness goal:", goal);
    
    // Generate an ID
    const newGoal = {
      id: `goal-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...goal
    };
    
    // Store in localStorage for demo purposes
    const key = `wellness_goals_${goal.userId}`;
    const existingGoalsJson = localStorage.getItem(key);
    const existingGoals = existingGoalsJson ? JSON.parse(existingGoalsJson) : [];
    
    localStorage.setItem(key, JSON.stringify([...existingGoals, newGoal]));
    
    return newGoal;
  } catch (error) {
    console.error("Error saving wellness goal:", error);
    throw error;
  }
};

export const getUserWellnessGoals = async (userId: string) => {
  try {
    console.log("Getting wellness goals for user:", userId);
    
    // Retrieve from localStorage for demo purposes
    const key = `wellness_goals_${userId}`;
    const goalsJson = localStorage.getItem(key);
    const goals = goalsJson ? JSON.parse(goalsJson) : [];
    
    return goals;
  } catch (error) {
    console.error("Error getting wellness goals:", error);
    throw error;
  }
};

// Add more database service functions as needed for other data types
