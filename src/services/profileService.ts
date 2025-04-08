
import { User } from "@/types/user";
import { getStorageItem, setStorageItem } from "./storage/localStorageUtils";

/**
 * Services for user profile operations
 */

/**
 * Save user profile to localStorage
 */
export const saveUserProfile = async (profile: Partial<User>) => {
  try {
    console.log("Saving user profile:", profile);
    
    const updatedProfile = {
      ...profile,
      updated_at: new Date().toISOString()
    };
    
    // Store in localStorage for demo purposes
    if (profile.id) {
      setStorageItem(`profile_${profile.id}`, updatedProfile);
    }
    
    return updatedProfile;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

/**
 * Get user profile from localStorage
 */
export const getUserProfile = async (userId: string) => {
  try {
    console.log("Getting user profile for:", userId);
    
    // Retrieve from localStorage
    const savedProfile = getStorageItem<User | null>(`profile_${userId}`, null);
    if (savedProfile) {
      return savedProfile;
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
