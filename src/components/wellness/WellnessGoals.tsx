
import React from "react";
import { WellnessGoal } from "@/types/health";
import { Progress } from "@/components/ui/progress";
import { Footprints, Heart, Droplet, Moon, Timer } from "lucide-react";

interface WellnessGoalsProps {
  goals: WellnessGoal[];
  isLoading: boolean;
}

const WellnessGoals: React.FC<WellnessGoalsProps> = ({ goals, isLoading }) => {
  const getGoalIcon = (type: WellnessGoal['type']) => {
    switch (type) {
      case 'steps':
        return <Footprints className="h-5 w-5 text-blue-500" />;
      case 'water':
        return <Droplet className="h-5 w-5 text-cyan-500" />;
      case 'sleep':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'activity':
        return <Timer className="h-5 w-5 text-green-500" />;
      default:
        return <Heart className="h-5 w-5 text-pink-500" />;
    }
  };
  
  const getGoalTitle = (goal: WellnessGoal) => {
    switch (goal.type) {
      case 'steps':
        return `Marcher ${goal.target} pas par jour`;
      case 'water':
        return `Boire ${goal.target} ml d'eau par jour`;
      case 'sleep':
        return `Dormir ${goal.target / 60} heures par nuit`;
      case 'activity':
        return `${goal.target} minutes d'activité physique par semaine`;
      default:
        return `Objectif: ${goal.target} ${goal.unit}`;
    }
  };
  
  const getProgressColor = (type: WellnessGoal['type']) => {
    switch (type) {
      case 'steps':
        return 'bg-blue-500';
      case 'water':
        return 'bg-cyan-500';
      case 'sleep':
        return 'bg-indigo-500';
      case 'activity':
        return 'bg-green-500';
      default:
        return 'bg-pink-500';
    }
  };
  
  if (isLoading) {
    return (
      <div className="w-full p-4 rounded-lg bg-gray-50 animate-pulse mb-6">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-lg bg-gray-50 mb-6">
      <h2 className="text-lg font-medium mb-4">Mes objectifs de bien-être</h2>
      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = Math.min(Math.round((goal.progress / goal.target) * 100), 100);
          
          return (
            <div key={goal.id} className="bg-white p-3 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                {getGoalIcon(goal.type)}
                <div className="ml-3 flex-1">
                  <p className="font-medium">{getGoalTitle(goal)}</p>
                </div>
                <span className="text-sm font-medium">{percentage}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={percentage} 
                  className="h-2" 
                  indicatorClassName={getProgressColor(goal.type)}
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {goal.progress} / {goal.target} {goal.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WellnessGoals;
