
import { VitalSign } from "@/types/health";
import { getStorageItem, setStorageItem, addItemToStorageArray } from "./storage/localStorageUtils";

/**
 * Services for vital signs operations
 */

/**
 * Save vital sign to localStorage
 */
export const saveVitalSign = async (vitalSign: Omit<VitalSign, 'id'>) => {
  try {
    console.log("Saving vital sign:", vitalSign);
    
    // Generate an ID and add timestamp
    const newVitalSign = {
      id: `vital-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...vitalSign,
      timestamp: vitalSign.timestamp || new Date().toISOString()
    };
    
    // Store in localStorage
    const key = `vital_signs_${vitalSign.userId}`;
    addItemToStorageArray(key, newVitalSign);
    
    return newVitalSign;
  } catch (error) {
    console.error("Error saving vital sign:", error);
    throw error;
  }
};

/**
 * Get vital signs for user from localStorage
 */
export const getUserVitalSigns = async (userId: string) => {
  try {
    console.log("Getting vital signs for user:", userId);
    
    // Retrieve from localStorage
    const key = `vital_signs_${userId}`;
    const allSigns = getStorageItem<VitalSign[]>(key, []);
    
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
