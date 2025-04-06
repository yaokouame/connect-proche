
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Dumbbell, Droplets, Moon, Utensils, Heart } from "lucide-react";
import { WellnessGoal } from "@/types/health";

interface WellnessGoalsProps {
  goals: WellnessGoal[];
  onAddGoal?: () => void;
}

const getGoalIcon = (type: string) => {
  switch(type) {
    case 'steps':
      return <Dumbbell className="h-5 w-5 text-blue-500" />;
    case 'water':
      return <Droplets className="h-5 w-5 text-blue-500" />;
    case 'sleep':
      return <Moon className="h-5 w-5 text-indigo-500" />;
    case 'nutrition':
      return <Utensils className="h-5 w-5 text-green-500" />;
    case 'activity':
      return <Heart className="h-5 w-5 text-rose-500" />;
    default:
      return <Heart className="h-5 w-5 text-rose-500" />;
  }
};

const formatProgress = (goal: WellnessGoal) => {
  const percentage = Math.min(Math.round((goal.progress / goal.target) * 100), 100);
  return `${percentage}%`;
};

const WellnessGoals: React.FC<WellnessGoalsProps> = ({ goals, onAddGoal }) => {
  if (!goals || goals.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Objectifs de bien-être</CardTitle>
          <CardDescription>
            Définissez des objectifs pour améliorer votre bien-être
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-center text-gray-500 mb-4">
            Vous n'avez pas encore défini d'objectifs.
          </p>
          <Button onClick={onAddGoal} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un objectif
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Objectifs de bien-être</CardTitle>
            <CardDescription>
              Vos objectifs en cours
            </CardDescription>
          </div>
          <Button onClick={onAddGoal} variant="outline" size="sm" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map(goal => (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getGoalIcon(goal.type)}
                <span className="ml-2 font-medium">{goal.type === 'steps' ? 'Pas quotidiens' : 
                  goal.type === 'water' ? 'Hydratation' : 
                  goal.type === 'sleep' ? 'Sommeil' : 
                  goal.type === 'nutrition' ? 'Nutrition' : 'Activité physique'}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {goal.progress} / {goal.target} {goal.unit}
              </span>
            </div>
            <Progress 
              value={(goal.progress / goal.target) * 100} 
              className="h-2"
            />
            <p className="text-xs text-gray-500">
              {formatProgress(goal)} complété - Objectif à atteindre avant le {new Date(goal.endDate || goal.startDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-gray-500">
          Voir tous mes objectifs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WellnessGoals;
