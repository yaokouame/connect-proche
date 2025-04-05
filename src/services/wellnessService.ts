import { 
  PhysicalActivity, 
  NutritionEntry, 
  HydrationEntry, 
  SleepEntry, 
  WellnessGoal,
  WellnessRecommendation,
  ExerciseVideo
} from "@/types/health";

// Mock physical activity data
export const getUserActivities = async (userId: string): Promise<PhysicalActivity[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const today = new Date();
  const activities: PhysicalActivity[] = [];
  
  // Generate 7 days of activity data
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Walking
    activities.push({
      id: `act-walk-${i}`,
      userId,
      type: 'Marche',
      duration: Math.floor(Math.random() * 60) + 20, // 20-80 minutes
      caloriesBurned: Math.floor(Math.random() * 200) + 100, // 100-300 calories
      date: dateStr,
      source: i % 3 === 0 ? 'google_fit' : 'apple_health'
    });
    
    // Other random activities
    const activityTypes = ['Course', 'Vélo', 'Natation', 'Yoga', 'Musculation'];
    if (Math.random() > 0.4) { // 60% chance to have another activity
      const actType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      activities.push({
        id: `act-${actType.toLowerCase()}-${i}`,
        userId,
        type: actType,
        duration: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
        caloriesBurned: Math.floor(Math.random() * 300) + 150, // 150-450 calories
        date: dateStr,
        source: 'manual'
      });
    }
  }
  
  return activities;
};

// Mock nutrition data
export const getUserNutrition = async (userId: string): Promise<NutritionEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const today = new Date();
  const entries: NutritionEntry[] = [];
  
  // Generate 3 days of nutrition data
  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Breakfast
    entries.push({
      id: `meal-breakfast-${i}`,
      userId,
      mealType: 'breakfast',
      foods: [
        {
          name: 'Yaourt grec',
          calories: 150,
          protein: 15,
          carbs: 6,
          fat: 5
        },
        {
          name: 'Fruits rouges',
          calories: 80,
          protein: 1,
          carbs: 20,
          fat: 0
        }
      ],
      date: dateStr,
      totalCalories: 230
    });
    
    // Lunch
    entries.push({
      id: `meal-lunch-${i}`,
      userId,
      mealType: 'lunch',
      foods: [
        {
          name: 'Salade de quinoa',
          calories: 320,
          protein: 12,
          carbs: 45,
          fat: 10
        },
        {
          name: 'Poulet grillé',
          calories: 250,
          protein: 35,
          carbs: 0,
          fat: 12
        }
      ],
      date: dateStr,
      totalCalories: 570
    });
    
    // Dinner
    entries.push({
      id: `meal-dinner-${i}`,
      userId,
      mealType: 'dinner',
      foods: [
        {
          name: 'Saumon',
          calories: 280,
          protein: 30,
          carbs: 0,
          fat: 18
        },
        {
          name: 'Légumes rôtis',
          calories: 150,
          protein: 5,
          carbs: 25,
          fat: 4
        }
      ],
      date: dateStr,
      totalCalories: 430
    });
  }
  
  return entries;
};

// Mock hydration data
export const getUserHydration = async (userId: string): Promise<HydrationEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const today = new Date();
  const entries: HydrationEntry[] = [];
  
  // Generate 5 days of hydration data
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate 4-8 water intake entries per day
    const entryCount = Math.floor(Math.random() * 5) + 4;
    
    for (let j = 0; j < entryCount; j++) {
      const hour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
      const minute = Math.floor(Math.random() * 60);
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      entries.push({
        id: `hydration-${i}-${j}`,
        userId,
        amount: (Math.floor(Math.random() * 3) + 1) * 250, // 250, 500, or 750 ml
        date: dateStr,
        time: timeStr
      });
    }
  }
  
  return entries;
};

// Mock sleep data
export const getUserSleep = async (userId: string): Promise<SleepEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const today = new Date();
  const entries: SleepEntry[] = [];
  
  // Generate 7 days of sleep data
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const sleepHours = Math.floor(Math.random() * 3) + 6; // 6-8 hours
    const sleepMinutes = Math.floor(Math.random() * 60);
    const totalMinutes = sleepHours * 60 + sleepMinutes;
    
    const endTime = new Date(date);
    endTime.setHours(7, Math.floor(Math.random() * 60), 0);
    
    const startTime = new Date(endTime);
    startTime.setMinutes(startTime.getMinutes() - totalMinutes);
    
    const qualityOptions: SleepEntry['quality'][] = ['poor', 'fair', 'good', 'excellent'];
    const quality = qualityOptions[Math.floor(Math.random() * qualityOptions.length)];
    
    entries.push({
      id: `sleep-${i}`,
      userId,
      duration: totalMinutes,
      quality,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      date: dateStr
    });
  }
  
  return entries;
};

// Mock wellness goals
export const getUserWellnessGoals = async (userId: string): Promise<WellnessGoal[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 'goal-1',
      userId,
      type: 'steps',
      target: 10000,
      unit: 'pas',
      progress: 7500,
      startDate: new Date().toISOString().split('T')[0],
      completed: false
    },
    {
      id: 'goal-2',
      userId,
      type: 'water',
      target: 2000,
      unit: 'ml',
      progress: 1500,
      startDate: new Date().toISOString().split('T')[0],
      completed: false
    },
    {
      id: 'goal-3',
      userId,
      type: 'sleep',
      target: 480,
      unit: 'minutes',
      progress: 420,
      startDate: new Date().toISOString().split('T')[0],
      completed: false
    },
    {
      id: 'goal-4',
      userId,
      type: 'activity',
      target: 150,
      unit: 'minutes',
      progress: 90,
      startDate: new Date().toISOString().split('T')[0],
      completed: false
    }
  ];
};

// Mock wellness recommendations
export const getWellnessRecommendations = async (): Promise<WellnessRecommendation[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: 'rec-1',
      category: 'nutrition',
      title: 'Augmentez votre consommation de légumes',
      description: 'Essayez d\'incorporer au moins 5 portions de légumes variés par jour pour améliorer votre apport en vitamines et minéraux essentiels.',
      imageUrl: 'https://images.unsplash.com/photo-1557844352-761f2895b816?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80'
    },
    {
      id: 'rec-2',
      category: 'physical',
      title: 'Intégrez plus d\'activité dans votre quotidien',
      description: 'Prenez les escaliers au lieu de l\'ascenseur, marchez pendant votre pause déjeuner ou faites du vélo pour vos courts trajets.',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80'
    },
    {
      id: 'rec-3',
      category: 'mental',
      title: 'Pratiquez la pleine conscience',
      description: 'Consacrez 10 minutes par jour à la méditation ou à des exercices de respiration pour réduire le stress et améliorer votre bien-être mental.',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80'
    }
  ];
};

// Mock exercise videos
export const getExerciseVideos = async (category?: string): Promise<ExerciseVideo[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const videos: ExerciseVideo[] = [
    {
      id: 'video-1',
      title: 'Yoga pour débutants',
      category: 'yoga',
      duration: 20,
      difficulty: 'beginner',
      thumbnailUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
      videoUrl: 'https://example.com/videos/yoga-beginners',
      description: 'Une séance de yoga douce pour les débutants, axée sur les postures de base et la respiration.'
    },
    {
      id: 'video-2',
      title: 'Méditation guidée anti-stress',
      category: 'meditation',
      duration: 15,
      difficulty: 'beginner',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
      videoUrl: 'https://example.com/videos/meditation-stress',
      description: 'Une méditation guidée pour réduire le stress et l\'anxiété, idéale en fin de journée.'
    },
    {
      id: 'video-3',
      title: 'Entraînement HIIT 20 minutes',
      category: 'cardio',
      duration: 20,
      difficulty: 'intermediate',
      thumbnailUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
      videoUrl: 'https://example.com/videos/hiit-20min',
      description: 'Un entraînement par intervalles de haute intensité qui brûle un maximum de calories en 20 minutes.'
    },
    {
      id: 'video-4',
      title: 'Renforcement musculaire complet',
      category: 'strength',
      duration: 30,
      difficulty: 'intermediate',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
      videoUrl: 'https://example.com/videos/strength-full',
      description: 'Une séance complète de renforcement musculaire ciblant tous les groupes musculaires principaux.'
    },
    {
      id: 'video-5',
      title: 'Étirements pour la souplesse',
      category: 'flexibility',
      duration: 15,
      difficulty: 'beginner',
      thumbnailUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
      videoUrl: 'https://example.com/videos/stretching',
      description: 'Des étirements doux pour améliorer votre souplesse et réduire les tensions musculaires.'
    },
    {
      id: 'video-6',
      title: 'Yoga flow énergisant',
      category: 'yoga',
      duration: 45,
      difficulty: 'advanced',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
      videoUrl: 'https://example.com/videos/yoga-flow',
      description: 'Une séquence de yoga dynamique pour renforcer et assouplir le corps entier.'
    }
  ];
  
  if (category) {
    return videos.filter(video => video.category === category);
  }
  
  return videos;
};

// Connect to fitness apps
export const connectFitnessApp = async (appType: 'google_fit' | 'apple_health'): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    message: appType === 'google_fit' 
      ? 'Connexion à Google Fit réussie' 
      : 'Connexion à Apple Health réussie'
  };
};
