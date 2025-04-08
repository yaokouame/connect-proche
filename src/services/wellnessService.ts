
import { WellnessGoal, WellnessRecommendation, Activity, Sleep, Nutrition, Hydration } from "@/types/health";
import { getStorageItem, addItemToStorageArray, setStorageItem } from "./storage/localStorageUtils";

/**
 * Services for wellness operations
 */

/**
 * Save wellness goal to localStorage
 */
export const saveWellnessGoal = async (goal: Omit<WellnessGoal, 'id'>) => {
  try {
    console.log("Saving wellness goal:", goal);
    
    // Generate an ID
    const newGoal = {
      id: `goal-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...goal
    };
    
    // Store in localStorage
    const key = `wellness_goals_${goal.userId}`;
    addItemToStorageArray(key, newGoal);
    
    return newGoal;
  } catch (error) {
    console.error("Error saving wellness goal:", error);
    throw error;
  }
};

/**
 * Get wellness goals for user from localStorage
 */
export const getUserWellnessGoals = async (userId: string) => {
  try {
    console.log("Getting wellness goals for user:", userId);
    
    // Retrieve from localStorage
    const key = `wellness_goals_${userId}`;
    return getStorageItem<WellnessGoal[]>(key, []);
  } catch (error) {
    console.error("Error getting wellness goals:", error);
    throw error;
  }
};

/**
 * Get user activity data
 */
export const getUserActivities = async (userId: string): Promise<Activity[]> => {
  try {
    const key = `activities_${userId}`;
    return getStorageItem<Activity[]>(key, []);
  } catch (error) {
    console.error("Error getting user activities:", error);
    return [];
  }
};

/**
 * Get user sleep data
 */
export const getUserSleep = async (userId: string): Promise<Sleep[]> => {
  try {
    const key = `sleep_${userId}`;
    return getStorageItem<Sleep[]>(key, []);
  } catch (error) {
    console.error("Error getting user sleep data:", error);
    return [];
  }
};

/**
 * Get user nutrition data
 */
export const getUserNutrition = async (userId: string): Promise<Nutrition[]> => {
  try {
    const key = `nutrition_${userId}`;
    return getStorageItem<Nutrition[]>(key, []);
  } catch (error) {
    console.error("Error getting user nutrition data:", error);
    return [];
  }
};

/**
 * Get user hydration data
 */
export const getUserHydration = async (userId: string): Promise<Hydration[]> => {
  try {
    const key = `hydration_${userId}`;
    return getStorageItem<Hydration[]>(key, []);
  } catch (error) {
    console.error("Error getting user hydration data:", error);
    return [];
  }
};

/**
 * Get wellness recommendations based on user data
 */
export const getWellnessRecommendations = async (userId: string): Promise<WellnessRecommendation[]> => {
  try {
    // In a real app, this would analyze user data and generate personalized recommendations
    // For now, return mock recommendations
    return [
      {
        id: "rec-1",
        title: "Increase daily water intake",
        description: "Try to drink at least 2 liters of water daily for better hydration.",
        category: "hydration",
        priority: "high"
      },
      {
        id: "rec-2",
        title: "Add more vegetables to your diet",
        description: "Include at least 5 servings of vegetables in your daily meals.",
        category: "nutrition",
        priority: "medium"
      },
      {
        id: "rec-3",
        title: "Improve sleep schedule",
        description: "Try to maintain a consistent sleep schedule, even on weekends.",
        category: "sleep",
        priority: "high"
      }
    ];
  } catch (error) {
    console.error("Error getting wellness recommendations:", error);
    return [];
  }
};

/**
 * Connect to external fitness app
 */
export const connectFitnessApp = async (
  userId: string, 
  appName: string, 
  credentials: { username: string; accessToken: string }
): Promise<boolean> => {
  try {
    console.log(`Connecting to fitness app ${appName} for user ${userId}`);
    
    // Store the connection info
    const connectedApps = getStorageItem<any[]>(`connected_apps_${userId}`, []);
    const newConnection = {
      appName,
      username: credentials.username,
      connectedAt: new Date().toISOString(),
    };
    
    setStorageItem(`connected_apps_${userId}`, [...connectedApps, newConnection]);
    return true;
  } catch (error) {
    console.error("Error connecting to fitness app:", error);
    return false;
  }
};

/**
 * Get exercise videos recommendations
 */
export const getExerciseVideos = async (
  category: string = 'all',
  duration?: number
): Promise<any[]> => {
  // Mock exercise videos
  const videos = [
    {
      id: 'vid-1',
      title: 'Basic Stretching Routine',
      category: 'stretching',
      duration: 10,
      thumbnail: 'https://example.com/thumbnails/stretching.jpg',
      url: 'https://example.com/videos/stretching'
    },
    {
      id: 'vid-2',
      title: '20-Minute HIIT Workout',
      category: 'cardio',
      duration: 20,
      thumbnail: 'https://example.com/thumbnails/hiit.jpg',
      url: 'https://example.com/videos/hiit'
    },
    {
      id: 'vid-3',
      title: 'Full Body Strength Training',
      category: 'strength',
      duration: 30,
      thumbnail: 'https://example.com/thumbnails/strength.jpg',
      url: 'https://example.com/videos/strength'
    }
  ];
  
  // Filter by category if not 'all'
  let filtered = category === 'all' ? videos : videos.filter(v => v.category === category);
  
  // Filter by duration if provided
  if (duration) {
    filtered = filtered.filter(v => v.duration <= duration);
  }
  
  return filtered;
};
