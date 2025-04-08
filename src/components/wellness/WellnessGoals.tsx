
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { WellnessGoal } from '@/types/health';
import { useLanguage } from '@/contexts/LanguageContext';

interface WellnessGoalsProps {
  goals: WellnessGoal[];
  isLoading?: boolean; // Make isLoading optional
}

const WellnessGoals: React.FC<WellnessGoalsProps> = ({ goals, isLoading = false }) => {
  const { language } = useLanguage();
  
  const getTranslation = () => {
    if (language === 'fr') {
      return {
        title: 'Mes Objectifs Bien-être',
        noGoals: 'Aucun objectif défini. Ajoutez un objectif pour commencer à suivre votre progression.',
        loading: 'Chargement des objectifs...',
        step: 'Pas',
        water: 'Eau',
        sleep: 'Sommeil',
        nutrition: 'Nutrition',
        activity: 'Activité',
        goal: 'Objectif',
        progress: 'Progression',
        completed: 'Complété'
      };
    } else if (language === 'es') {
      return {
        title: 'Mis Objetivos de Bienestar',
        noGoals: 'No hay objetivos definidos. Agrega un objetivo para comenzar a seguir tu progreso.',
        loading: 'Cargando objetivos...',
        step: 'Pasos',
        water: 'Agua',
        sleep: 'Sueño',
        nutrition: 'Nutrición',
        activity: 'Actividad',
        goal: 'Meta',
        progress: 'Progreso',
        completed: 'Completado'
      };
    } else {
      return {
        title: 'My Wellness Goals',
        noGoals: 'No goals set. Add a goal to start tracking your progress.',
        loading: 'Loading goals...',
        step: 'Steps',
        water: 'Water',
        sleep: 'Sleep',
        nutrition: 'Nutrition',
        activity: 'Activity',
        goal: 'Goal',
        progress: 'Progress',
        completed: 'Completed'
      };
    }
  };
  
  const t = getTranslation();
  
  const getGoalTypeLabel = (type: string) => {
    switch (type) {
      case 'steps': return t.step;
      case 'water': return t.water;
      case 'sleep': return t.sleep;
      case 'nutrition': return t.nutrition;
      case 'activity': return t.activity;
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-gray-500">{t.loading}</p>
        </CardContent>
      </Card>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-gray-500">{t.noGoals}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const percentage = Math.min(100, Math.round((goal.progress / goal.target) * 100));
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{getGoalTypeLabel(goal.type)}</h3>
                    <p className="text-sm text-gray-500">
                      {t.goal}: {goal.target} {goal.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{percentage}%</p>
                    <p className="text-sm text-gray-500">
                      {goal.progress} / {goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
                {goal.completed && (
                  <p className="text-xs text-green-600 font-medium">{t.completed}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessGoals;
