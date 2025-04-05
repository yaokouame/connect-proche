
export interface VitalSign {
  id: string;
  userId: string;
  type: 'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'weight' | 'temperature' | 'oxygen';
  value: number | string;
  unit: string;
  timestamp: string;
  notes?: string;
  device?: string;
}

export interface VitalSignsData {
  bloodPressure: VitalSign[];
  heartRate: VitalSign[];
  bloodSugar: VitalSign[];
  weight: VitalSign[];
  temperature: VitalSign[];
  oxygen: VitalSign[];
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: string;
  lastSync: string;
  status: 'connected' | 'disconnected' | 'pairing';
}

// New interfaces for wellness tracking
export interface PhysicalActivity {
  id: string;
  userId: string;
  type: string;
  duration: number; // in minutes
  caloriesBurned: number;
  date: string;
  source: 'manual' | 'google_fit' | 'apple_health';
}

export interface NutritionEntry {
  id: string;
  userId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: {
    name: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }[];
  date: string;
  totalCalories: number;
}

export interface HydrationEntry {
  id: string;
  userId: string;
  amount: number; // in ml
  date: string;
  time: string;
}

export interface SleepEntry {
  id: string;
  userId: string;
  duration: number; // in minutes
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  startTime: string;
  endTime: string;
  date: string;
}

export interface WellnessGoal {
  id: string;
  userId: string;
  type: 'steps' | 'water' | 'sleep' | 'nutrition' | 'activity';
  target: number;
  unit: string;
  progress: number;
  startDate: string;
  endDate?: string;
  completed: boolean;
}

export interface WellnessRecommendation {
  id: string;
  category: 'nutrition' | 'physical' | 'mental';
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ExerciseVideo {
  id: string;
  title: string;
  category: 'yoga' | 'meditation' | 'cardio' | 'strength' | 'flexibility';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
}
