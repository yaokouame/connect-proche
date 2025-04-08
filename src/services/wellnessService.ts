
import { WellnessGoal, WellnessRecommendation } from '@/types/health';

const STORAGE_KEYS = {
  WELLNESS_GOALS: 'wellness_goals',
  WELLNESS_RECOMMENDATIONS: 'wellness_recommendations',
};

export const getWellnessGoals = (userId: string): WellnessGoal[] => {
  const storedGoals = localStorage.getItem(`${STORAGE_KEYS.WELLNESS_GOALS}_${userId}`);
  if (!storedGoals) return [];
  return JSON.parse(storedGoals);
};

export const saveWellnessGoal = (userId: string, goal: WellnessGoal): void => {
  const goals = getWellnessGoals(userId);
  const existingGoalIndex = goals.findIndex(g => g.id === goal.id);
  
  if (existingGoalIndex >= 0) {
    goals[existingGoalIndex] = goal;
  } else {
    goals.push(goal);
  }
  
  localStorage.setItem(`${STORAGE_KEYS.WELLNESS_GOALS}_${userId}`, JSON.stringify(goals));
};

export const deleteWellnessGoal = (userId: string, goalId: string): void => {
  const goals = getWellnessGoals(userId);
  const updatedGoals = goals.filter(goal => goal.id !== goalId);
  localStorage.setItem(`${STORAGE_KEYS.WELLNESS_GOALS}_${userId}`, JSON.stringify(updatedGoals));
};

export const updateGoalProgress = (userId: string, goalId: string, progress: number): void => {
  const goals = getWellnessGoals(userId);
  const updatedGoals = goals.map(goal => {
    if (goal.id === goalId) {
      const updatedGoal = { ...goal, progress };
      // Check if goal is completed
      if (progress >= goal.target && !goal.completed) {
        updatedGoal.completed = true;
        updatedGoal.completedDate = new Date().toISOString();
      }
      return updatedGoal;
    }
    return goal;
  });
  
  localStorage.setItem(`${STORAGE_KEYS.WELLNESS_GOALS}_${userId}`, JSON.stringify(updatedGoals));
};

export const getWellnessRecommendations = async (userId: string): Promise<WellnessRecommendation[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedRecommendations = localStorage.getItem(`${STORAGE_KEYS.WELLNESS_RECOMMENDATIONS}_${userId}`);
      if (storedRecommendations) {
        resolve(JSON.parse(storedRecommendations));
      } else {
        // Generate mock recommendations if none exist
        const recommendations = generateMockRecommendations();
        localStorage.setItem(`${STORAGE_KEYS.WELLNESS_RECOMMENDATIONS}_${userId}`, JSON.stringify(recommendations));
        resolve(recommendations);
      }
    }, 500);
  });
};

const generateMockRecommendations = (): WellnessRecommendation[] => {
  return [
    {
      id: '1',
      title: 'Augmentez votre consommation d\'eau',
      description: 'Essayez de boire au moins 2 litres d\'eau par jour pour rester hydraté.',
      category: 'nutrition',
      imageUrl: '/assets/water.jpg',
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Pratiquez une activité physique modérée',
      description: 'Visez 30 minutes d\'exercice modéré par jour, comme la marche rapide.',
      category: 'physical',
      imageUrl: '/assets/exercise.jpg',
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'Méditation quotidienne',
      description: 'Prenez 10 minutes chaque jour pour méditer et réduire votre stress.',
      category: 'mental',
      imageUrl: '/assets/meditation.jpg',
      difficulty: 'easy'
    },
    {
      id: '4',
      title: 'Améliorez votre sommeil',
      description: 'Visez 7-8 heures de sommeil par nuit et établissez une routine régulière de coucher.',
      category: 'physical',
      imageUrl: '/assets/sleep.jpg',
      difficulty: 'medium'
    },
    {
      id: '5',
      title: 'Mangez plus de légumes',
      description: 'Essayez d\'inclure des légumes dans au moins deux repas par jour.',
      category: 'nutrition',
      imageUrl: '/assets/vegetables.jpg',
      difficulty: 'easy'
    }
  ];
};

export const getMockActivityData = () => {
  return {
    steps: [
      { date: '2023-01-01', value: 5200 },
      { date: '2023-01-02', value: 6300 },
      { date: '2023-01-03', value: 4900 },
      { date: '2023-01-04', value: 7100 },
      { date: '2023-01-05', value: 5600 },
      { date: '2023-01-06', value: 8200 },
      { date: '2023-01-07', value: 6700 },
    ],
    calories: 1450,
    distance: 4.2,
    activeMinutes: 35
  };
};

export const getMockSleepData = () => {
  return {
    duration: 7.5, // hours
    quality: 85, // percent
    deepSleep: 2.3, // hours
    remSleep: 1.8, // hours
    lightSleep: 3.4, // hours
    awakeTime: 0.2, // hours
    weeklyAverage: 7.2 // hours
  };
};

export const getMockNutritionData = () => {
  return {
    calories: 2100,
    protein: 85, // grams
    carbs: 220, // grams
    fat: 65, // grams
    fiber: 28, // grams
    sugar: 35, // grams
    water: 1800 // ml
  };
};

export const getMockHydrationData = () => {
  return {
    dailyGoal: 2000, // ml
    current: 1200, // ml
    percentage: 60, // percent
    history: [
      { time: '08:00', amount: 300 },
      { time: '10:30', amount: 250 },
      { time: '13:00', amount: 350 },
      { time: '15:30', amount: 300 },
    ]
  };
};

export const toggleFitnessAppConnection = (appName: string): { success: boolean, message?: string } => {
  // Mock implementation
  const connectedApps = JSON.parse(localStorage.getItem('connected_fitness_apps') || '[]');
  
  if (connectedApps.includes(appName)) {
    // Disconnect
    const updatedApps = connectedApps.filter((app: string) => app !== appName);
    localStorage.setItem('connected_fitness_apps', JSON.stringify(updatedApps));
    return { success: true, message: `Disconnected from ${appName}` };
  } else {
    // Connect
    connectedApps.push(appName);
    localStorage.setItem('connected_fitness_apps', JSON.stringify(connectedApps));
    return { success: true, message: `Connected to ${appName}` };
  }
};

export const getConnectedFitnessApps = (): string[] => {
  return JSON.parse(localStorage.getItem('connected_fitness_apps') || '[]');
};
