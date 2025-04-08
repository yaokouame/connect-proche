
import { WellnessGoal } from "@/types/health";
import { getStorageItem, addItemToStorageArray } from "./storage/localStorageUtils";

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
