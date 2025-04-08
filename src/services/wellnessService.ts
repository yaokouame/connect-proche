
import { WellnessGoal, WellnessRecommendation, PhysicalActivity, SleepEntry, HydrationEntry, NutritionEntry, ExerciseVideo } from '@/types/health';

// Function to get user's wellness goals
export const getWellnessGoals = async (userId: string): Promise<WellnessGoal[]> => {
  // Wait a moment to simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Return mock data
  return [
    {
      id: 'goal-1',
      userId: userId,
      type: 'steps',
      target: 10000,
      unit: 'pas',
      progress: 7500,
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 23)).toISOString(),
      completed: false
    },
    {
      id: 'goal-2',
      userId: userId,
      type: 'water',
      target: 2000,
      unit: 'ml',
      progress: 1500,
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 23)).toISOString(),
      completed: false
    },
    {
      id: 'goal-3',
      userId: userId,
      type: 'sleep',
      target: 8,
      unit: 'heures',
      progress: 7,
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 23)).toISOString(),
      completed: false
    }
  ];
};

// Function to get wellness recommendations
export const getWellnessRecommendations = async (): Promise<WellnessRecommendation[]> => {
  // Wait a moment to simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  // Return mock data
  return [
    {
      id: 'rec-1',
      category: 'physical',
      title: 'Marchez 30 minutes par jour',
      description: 'La marche quotidienne améliore la santé cardiovasculaire et réduit le stress.',
      imageUrl: 'https://placehold.co/100x100/4aade9/white?text=Marche'
    },
    {
      id: 'rec-2',
      category: 'nutrition',
      title: 'Augmentez votre consommation de fruits',
      description: 'Visez 5 portions de fruits et légumes par jour pour un apport optimal en vitamines.',
      imageUrl: 'https://placehold.co/100x100/4aade9/white?text=Fruits'
    },
    {
      id: 'rec-3',
      category: 'mental',
      title: 'Pratiquer la méditation',
      description: '10 minutes de méditation par jour peuvent réduire significativement l\'anxiété.',
      imageUrl: 'https://placehold.co/100x100/4aade9/white?text=Méditation'
    },
    {
      id: 'rec-4',
      category: 'physical',
      title: 'Faites des étirements',
      description: 'Des étirements réguliers améliorent la flexibilité et préviennent les blessures.',
      imageUrl: 'https://placehold.co/100x100/4aade9/white?text=Étirements'
    },
    {
      id: 'rec-5',
      category: 'nutrition',
      title: 'Réduisez votre consommation de sucre',
      description: 'Limitez les boissons sucrées et les desserts pour une meilleure santé.',
      imageUrl: 'https://placehold.co/100x100/4aade9/white?text=Sucre'
    }
  ];
};

// Get user physical activities
export const getUserActivities = async (userId: string): Promise<PhysicalActivity[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const today = new Date();
  const activities: PhysicalActivity[] = [];
  
  // Generate 30 days of data
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random activity data
    const randomWalk = {
      id: `activity-walk-${i}`,
      userId,
      type: 'Marche',
      duration: Math.floor(Math.random() * 60) + 20,
      caloriesBurned: Math.floor(Math.random() * 200) + 100,
      date: date.toISOString().split('T')[0],
      source: Math.random() > 0.7 ? 'manual' : (Math.random() > 0.5 ? 'google_fit' : 'apple_health')
    } as PhysicalActivity;
    
    activities.push(randomWalk);
    
    // Add another activity on some days
    if (Math.random() > 0.6) {
      const randomRun = {
        id: `activity-run-${i}`,
        userId,
        type: 'Course',
        duration: Math.floor(Math.random() * 40) + 15,
        caloriesBurned: Math.floor(Math.random() * 300) + 150,
        date: date.toISOString().split('T')[0],
        source: Math.random() > 0.7 ? 'manual' : (Math.random() > 0.5 ? 'google_fit' : 'apple_health')
      } as PhysicalActivity;
      
      activities.push(randomRun);
    }
  }
  
  return activities;
};

// Get user sleep data
export const getUserSleep = async (userId: string): Promise<SleepEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const today = new Date();
  const sleepEntries: SleepEntry[] = [];
  
  // Generate 30 days of sleep data
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random sleep duration between 5-9 hours
    const durationInMinutes = (Math.floor(Math.random() * 4) + 5) * 60 + Math.floor(Math.random() * 60);
    
    // Sleep quality
    const qualities = ['poor', 'fair', 'good', 'excellent'];
    const qualityIndex = Math.floor(Math.random() * qualities.length);
    
    // Calculate sleep times
    const endTime = new Date(date);
    endTime.setHours(7, Math.floor(Math.random() * 60), 0);
    
    const startTime = new Date(endTime);
    startTime.setMinutes(startTime.getMinutes() - durationInMinutes);
    
    sleepEntries.push({
      id: `sleep-${i}`,
      userId,
      duration: durationInMinutes,
      quality: qualities[qualityIndex] as 'poor' | 'fair' | 'good' | 'excellent',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      date: date.toISOString().split('T')[0]
    });
  }
  
  return sleepEntries;
};

// Get user nutrition data
export const getUserNutrition = async (userId: string): Promise<NutritionEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const today = new Date();
  const nutritionEntries: NutritionEntry[] = [];
  
  // Common foods
  const breakfastFoods = [
    { name: 'Œufs brouillés', calories: 140, protein: 12, carbs: 1, fat: 10 },
    { name: 'Pain grillé', calories: 80, protein: 3, carbs: 15, fat: 1 },
    { name: 'Yaourt', calories: 120, protein: 10, carbs: 15, fat: 3 },
    { name: 'Banane', calories: 105, protein: 1, carbs: 27, fat: 0 },
    { name: 'Céréales', calories: 200, protein: 5, carbs: 40, fat: 3 }
  ];
  
  const lunchFoods = [
    { name: 'Poulet grillé', calories: 200, protein: 30, carbs: 0, fat: 8 },
    { name: 'Riz', calories: 150, protein: 3, carbs: 30, fat: 1 },
    { name: 'Salade verte', calories: 30, protein: 1, carbs: 5, fat: 0 },
    { name: 'Poisson', calories: 180, protein: 25, carbs: 0, fat: 10 },
    { name: 'Pâtes', calories: 200, protein: 7, carbs: 40, fat: 1 }
  ];
  
  const dinnerFoods = [
    { name: 'Steak', calories: 250, protein: 25, carbs: 0, fat: 15 },
    { name: 'Légumes sautés', calories: 100, protein: 3, carbs: 15, fat: 3 },
    { name: 'Soupe', calories: 120, protein: 5, carbs: 15, fat: 5 },
    { name: 'Pommes de terre', calories: 150, protein: 4, carbs: 35, fat: 0 },
    { name: 'Tofu', calories: 120, protein: 12, carbs: 3, fat: 6 }
  ];
  
  const snackFoods = [
    { name: 'Noix', calories: 180, protein: 5, carbs: 5, fat: 15 },
    { name: 'Yaourt', calories: 120, protein: 10, carbs: 15, fat: 3 },
    { name: 'Pomme', calories: 95, protein: 0, carbs: 25, fat: 0 },
    { name: 'Barre protéinée', calories: 200, protein: 15, carbs: 20, fat: 8 },
    { name: 'Chips', calories: 250, protein: 3, carbs: 25, fat: 15 }
  ];
  
  // Generate 7 days of nutrition data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Breakfast
    const breakfastItems = [];
    for (let j = 0; j < (Math.floor(Math.random() * 3) + 1); j++) {
      breakfastItems.push(breakfastFoods[Math.floor(Math.random() * breakfastFoods.length)]);
    }
    
    const breakfast: NutritionEntry = {
      id: `nutrition-breakfast-${i}`,
      userId,
      mealType: 'breakfast',
      foods: breakfastItems,
      date: dateStr,
      totalCalories: breakfastItems.reduce((sum, item) => sum + item.calories, 0)
    };
    
    nutritionEntries.push(breakfast);
    
    // Lunch
    const lunchItems = [];
    for (let j = 0; j < (Math.floor(Math.random() * 3) + 1); j++) {
      lunchItems.push(lunchFoods[Math.floor(Math.random() * lunchFoods.length)]);
    }
    
    const lunch: NutritionEntry = {
      id: `nutrition-lunch-${i}`,
      userId,
      mealType: 'lunch',
      foods: lunchItems,
      date: dateStr,
      totalCalories: lunchItems.reduce((sum, item) => sum + item.calories, 0)
    };
    
    nutritionEntries.push(lunch);
    
    // Dinner
    const dinnerItems = [];
    for (let j = 0; j < (Math.floor(Math.random() * 3) + 1); j++) {
      dinnerItems.push(dinnerFoods[Math.floor(Math.random() * dinnerFoods.length)]);
    }
    
    const dinner: NutritionEntry = {
      id: `nutrition-dinner-${i}`,
      userId,
      mealType: 'dinner',
      foods: dinnerItems,
      date: dateStr,
      totalCalories: dinnerItems.reduce((sum, item) => sum + item.calories, 0)
    };
    
    nutritionEntries.push(dinner);
    
    // Maybe add a snack
    if (Math.random() > 0.3) {
      const snackItems = [];
      for (let j = 0; j < (Math.floor(Math.random() * 2) + 1); j++) {
        snackItems.push(snackFoods[Math.floor(Math.random() * snackFoods.length)]);
      }
      
      const snack: NutritionEntry = {
        id: `nutrition-snack-${i}`,
        userId,
        mealType: 'snack',
        foods: snackItems,
        date: dateStr,
        totalCalories: snackItems.reduce((sum, item) => sum + item.calories, 0)
      };
      
      nutritionEntries.push(snack);
    }
  }
  
  return nutritionEntries;
};

// Get user hydration data
export const getUserHydration = async (userId: string): Promise<HydrationEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const today = new Date();
  const hydrationEntries: HydrationEntry[] = [];
  
  // Generate 7 days of hydration data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // 4-8 hydration entries per day
    const entriesCount = Math.floor(Math.random() * 5) + 4;
    
    for (let j = 0; j < entriesCount; j++) {
      // Random time
      const hours = Math.floor(Math.random() * 14) + 7; // 7am to 9pm
      const minutes = Math.floor(Math.random() * 60);
      
      // Random amount between 150ml and 350ml
      const amount = Math.floor(Math.random() * 200) + 150;
      
      hydrationEntries.push({
        id: `hydration-${i}-${j}`,
        userId,
        amount,
        date: dateStr,
        time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      });
    }
  }
  
  return hydrationEntries;
};

// Function to get exercise videos
export const getExerciseVideos = async (): Promise<ExerciseVideo[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: 'video-1',
      title: 'Yoga matinal pour débutants',
      category: 'yoga',
      duration: 15,
      difficulty: 'beginner',
      thumbnailUrl: 'https://placehold.co/300x200/4aade9/white?text=Yoga',
      videoUrl: 'https://example.com/videos/yoga-morning.mp4',
      description: 'Une séance de yoga douce pour bien commencer la journée et améliorer votre flexibilité.'
    },
    {
      id: 'video-2',
      title: 'Cardio intense 20 minutes',
      category: 'cardio',
      duration: 20,
      difficulty: 'intermediate',
      thumbnailUrl: 'https://placehold.co/300x200/4aade9/white?text=Cardio',
      videoUrl: 'https://example.com/videos/cardio-20min.mp4',
      description: 'Séance de cardio à haute intensité pour brûler des calories et améliorer votre endurance.'
    },
    {
      id: 'video-3',
      title: 'Méditation guidée anti-stress',
      category: 'meditation',
      duration: 10,
      difficulty: 'beginner',
      thumbnailUrl: 'https://placehold.co/300x200/4aade9/white?text=Méditation',
      videoUrl: 'https://example.com/videos/meditation.mp4',
      description: 'Une méditation guidée pour réduire le stress et l\'anxiété en 10 minutes seulement.'
    },
    {
      id: 'video-4',
      title: 'Renforcement musculaire complet',
      category: 'strength',
      duration: 30,
      difficulty: 'advanced',
      thumbnailUrl: 'https://placehold.co/300x200/4aade9/white?text=Musculation',
      videoUrl: 'https://example.com/videos/strength.mp4',
      description: 'Séance complète de renforcement musculaire ciblant tous les groupes musculaires principaux.'
    }
  ];
};

// Function to connect fitness app
export const connectFitnessApp = async (appName: string): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return {
    success: true,
    message: `Application ${appName} connectée avec succès. Vos données seront synchronisées automatiquement.`
  };
};

// Alias function for backward compatibility
export const getUserWellnessGoals = getWellnessGoals;
