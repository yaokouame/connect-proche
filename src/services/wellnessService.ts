
import { WellnessGoal, WellnessRecommendation, ActivityData, SleepData, HydrationData, NutritionData } from '@/types/health';

// Get wellness goals for a specific user
export const getWellnessGoals = async (userId: string): Promise<WellnessGoal[]> => {
  // In a real app, this would be an API call to get data from a database
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "goal1",
      userId: userId,
      type: "steps",
      target: 10000,
      unit: "pas",
      progress: 7500,
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      completed: false
    },
    {
      id: "goal2",
      userId: userId,
      type: "water",
      target: 2000,
      unit: "ml",
      progress: 1500,
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      completed: false
    },
    {
      id: "goal3",
      userId: userId,
      type: "sleep",
      target: 8,
      unit: "heures",
      progress: 7,
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      completed: false
    },
    {
      id: "goal4",
      userId: userId,
      type: "nutrition",
      target: 2000,
      unit: "calories",
      progress: 1800,
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      completed: false
    },
    {
      id: "goal5",
      userId: userId,
      type: "activity",
      target: 150,
      unit: "minutes",
      progress: 120,
      startDate: "2023-09-01",
      endDate: "2023-09-07",
      completed: true
    }
  ];
};

// Get wellness recommendations based on user profile and goals
export const getWellnessRecommendations = async (userId: string): Promise<WellnessRecommendation[]> => {
  // In a real app, this would be an API call to get personalized recommendations
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "rec1",
      userId: userId,
      type: "activity",
      title: "Marche matinale",
      description: "Commencez votre journée avec 20 minutes de marche pour stimuler votre métabolisme.",
      imageUrl: "/placeholder.svg",
      category: "Activité physique",
      benefits: ["Améliore la circulation", "Réduit le stress", "Augmente l'énergie"]
    },
    {
      id: "rec2",
      userId: userId,
      type: "nutrition",
      title: "Petit-déjeuner équilibré",
      description: "Incluez des protéines et des fibres dans votre petit-déjeuner pour rester rassasié plus longtemps.",
      imageUrl: "/placeholder.svg",
      category: "Nutrition",
      benefits: ["Contrôle de l'appétit", "Stabilise la glycémie", "Fournit de l'énergie durable"]
    },
    {
      id: "rec3",
      userId: userId,
      type: "hydration",
      title: "Hydratation régulière",
      description: "Buvez un verre d'eau toutes les heures pour maintenir une hydratation optimale.",
      imageUrl: "/placeholder.svg",
      category: "Hydratation",
      benefits: ["Améliore la concentration", "Soutient la digestion", "Maintient l'énergie"]
    },
    {
      id: "rec4",
      userId: userId,
      type: "sleep",
      title: "Routine de sommeil",
      description: "Établissez une routine de coucher régulière en vous déconnectant des écrans 1 heure avant.",
      imageUrl: "/placeholder.svg",
      category: "Sommeil",
      benefits: ["Améliore la qualité du sommeil", "Réduit l'insomnie", "Favorise la récupération"]
    },
    {
      id: "rec5",
      userId: userId,
      type: "mental",
      title: "Méditation guidée",
      description: "Pratiquez 10 minutes de méditation guidée pour réduire le stress et l'anxiété.",
      imageUrl: "/placeholder.svg",
      category: "Santé mentale",
      benefits: ["Réduit l'anxiété", "Améliore la concentration", "Favorise le calme intérieur"]
    }
  ];
};

// Get user activity data
export const getUserActivities = async (userId: string): Promise<ActivityData[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data for the last 7 days
  const today = new Date();
  const data: ActivityData[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      steps: Math.floor(Math.random() * 5000) + 5000,
      activeMinutes: Math.floor(Math.random() * 60) + 30,
      caloriesBurned: Math.floor(Math.random() * 300) + 200,
      distance: parseFloat((Math.random() * 3 + 2).toFixed(1))
    });
  }
  
  return data;
};

// Get user sleep data
export const getUserSleep = async (userId: string): Promise<SleepData[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data for the last 7 days
  const today = new Date();
  const data: SleepData[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const deepSleep = parseFloat((Math.random() * 2 + 1).toFixed(1));
    const lightSleep = parseFloat((Math.random() * 3 + 3).toFixed(1));
    const remSleep = parseFloat((Math.random() * 1.5 + 1).toFixed(1));
    
    data.push({
      date: date.toISOString().split('T')[0],
      duration: deepSleep + lightSleep + remSleep,
      quality: Math.floor(Math.random() * 30) + 70,
      deepSleep,
      lightSleep,
      remSleep,
      awakeTime: parseFloat((Math.random() * 0.5).toFixed(1))
    });
  }
  
  return data;
};

// Get user nutrition data
export const getUserNutrition = async (userId: string): Promise<NutritionData[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data for the last 7 days
  const today = new Date();
  const data: NutritionData[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      calories: Math.floor(Math.random() * 500) + 1500,
      protein: Math.floor(Math.random() * 30) + 60,
      carbs: Math.floor(Math.random() * 50) + 150,
      fat: Math.floor(Math.random() * 20) + 50,
      fiber: Math.floor(Math.random() * 10) + 15
    });
  }
  
  return data;
};

// Get user hydration data
export const getUserHydration = async (userId: string): Promise<HydrationData[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data for the last 7 days
  const today = new Date();
  const data: HydrationData[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      intake: Math.floor(Math.random() * 1000) + 1000,
      target: 2000,
      intakeByHour: Array.from({ length: 12 }, () => Math.floor(Math.random() * 200))
    });
  }
  
  return data;
};

// Connect to fitness app
export const connectFitnessApp = async (appName: string, userId: string): Promise<{ success: boolean, message: string }> => {
  // In a real app, this would initiate an OAuth flow or similar
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful connection for demo purposes
  return {
    success: true,
    message: `Connecté avec succès à ${appName}`
  };
};

// Get exercise videos
export const getExerciseVideos = async (category?: string): Promise<any[]> => {
  // In a real app, this would be an API call to fetch videos
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "vid1",
      title: "Yoga matinal - 15 minutes",
      description: "Routine de yoga douce pour commencer la journée",
      thumbnailUrl: "/placeholder.svg",
      duration: "15:00",
      category: "Yoga",
      difficulty: "Débutant"
    },
    {
      id: "vid2",
      title: "Renforcement musculaire sans équipement",
      description: "Entraînement complet du corps utilisant seulement votre poids corporel",
      thumbnailUrl: "/placeholder.svg",
      duration: "25:00",
      category: "Force",
      difficulty: "Intermédiaire"
    },
    {
      id: "vid3",
      title: "Cardio à faible impact",
      description: "Séance de cardio douce pour tous les niveaux de forme physique",
      thumbnailUrl: "/placeholder.svg",
      duration: "20:00",
      category: "Cardio",
      difficulty: "Débutant"
    },
    {
      id: "vid4",
      title: "Étirements pour la flexibilité",
      description: "Routine d'étirements pour améliorer la flexibilité et réduire les tensions",
      thumbnailUrl: "/placeholder.svg",
      duration: "18:00",
      category: "Étirements",
      difficulty: "Tous niveaux"
    },
    {
      id: "vid5",
      title: "Méditation guidée pour débutants",
      description: "Introduction à la méditation pour la gestion du stress",
      thumbnailUrl: "/placeholder.svg",
      duration: "10:00",
      category: "Méditation",
      difficulty: "Débutant"
    }
  ];
};
