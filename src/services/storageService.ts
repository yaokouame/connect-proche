
// Import from individual service files
import { saveUserProfile, getUserProfile } from "./profileService";
import { saveVitalSign, getUserVitalSigns } from "./vitalSignsService";
import { saveInsuranceVoucher, getUserInsuranceVouchers } from "./insuranceService";
import { saveWellnessGoal, getUserWellnessGoals } from "./wellnessService";

// Re-export all services
export {
  // User profile services
  saveUserProfile,
  getUserProfile,
  
  // Vital signs services
  saveVitalSign,
  getUserVitalSigns,
  
  // Insurance services
  saveInsuranceVoucher,
  getUserInsuranceVouchers,
  
  // Wellness services
  saveWellnessGoal,
  getUserWellnessGoals
};
