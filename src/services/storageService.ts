
import { 
  VitalSign, 
  MedicationReminder, 
  WellnessGoal 
} from '@/types/health';
import { getVitalSigns } from './vitalSignsService';
import { getWellnessGoals } from './wellnessService';
import { getMedicationReminders } from './healthService';

export const updateProfilePhoto = async (userId: string, photoFile: File): Promise<string> => {
  // In a real app, this would upload the file to storage and return a URL
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock a URL return
      resolve('https://example.com/profile-photos/user123.jpg');
    }, 1000);
  });
};

export const uploadMedicalDocument = async (
  userId: string,
  documentFile: File,
  documentType: string,
  documentName: string
): Promise<{ id: string; url: string; name: string; type: string; uploadDate: string }> => {
  // In a real app, this would upload the file to storage and store metadata
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock a document metadata return
      resolve({
        id: `doc-${Date.now()}`,
        url: 'https://example.com/medical-docs/doc123.pdf',
        name: documentName,
        type: documentType,
        uploadDate: new Date().toISOString(),
      });
    }, 1500);
  });
};

// Function to cache data locally
export const cacheUserData = async (userId: string): Promise<void> => {
  try {
    // Fetch data from various services
    const [vitalSigns, medicationReminders, wellnessGoals] = await Promise.all([
      getVitalSigns(userId),
      getMedicationReminders(userId),
      getWellnessGoals(userId)
    ]);
    
    // Store in local storage
    localStorage.setItem(`user_${userId}_vitalSigns`, JSON.stringify(vitalSigns));
    localStorage.setItem(`user_${userId}_medicationReminders`, JSON.stringify(medicationReminders));
    localStorage.setItem(`user_${userId}_wellnessGoals`, JSON.stringify(wellnessGoals));
    localStorage.setItem(`user_${userId}_lastSync`, new Date().toISOString());
    
    console.log('User data cached successfully');
  } catch (error) {
    console.error('Error caching user data:', error);
  }
};

// Get cached vital signs
export const getCachedVitalSigns = (userId: string): VitalSign[] | null => {
  const data = localStorage.getItem(`user_${userId}_vitalSigns`);
  return data ? JSON.parse(data) : null;
};

// Get cached medication reminders
export const getCachedMedicationReminders = (userId: string): MedicationReminder[] | null => {
  const data = localStorage.getItem(`user_${userId}_medicationReminders`);
  return data ? JSON.parse(data) : null;
};

// Get cached wellness goals
export const getCachedWellnessGoals = (userId: string): WellnessGoal[] | null => {
  const data = localStorage.getItem(`user_${userId}_wellnessGoals`);
  return data ? JSON.parse(data) : null;
};

// Check if cache is stale (older than 1 hour)
export const isCacheStale = (userId: string): boolean => {
  const lastSync = localStorage.getItem(`user_${userId}_lastSync`);
  if (!lastSync) return true;
  
  const lastSyncTime = new Date(lastSync).getTime();
  const currentTime = new Date().getTime();
  const oneHour = 60 * 60 * 1000;
  
  return currentTime - lastSyncTime > oneHour;
};
