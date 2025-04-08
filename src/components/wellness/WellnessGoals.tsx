
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
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>{t('wellness.goals.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-gray-500">{t('common.loading')}</p>
        </CardContent>
      </Card>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>{t('wellness.goals.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-gray-500">{t('wellness.goals.noGoals')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>{t('wellness.goals.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const percentage = Math.min(100, Math.round((goal.progress / goal.target) * 100));
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t(`wellness.goals.types.${goal.type}`)}</h3>
                    <p className="text-sm text-gray-500">
                      {t('wellness.goals.goal')}: {goal.target} {goal.unit}
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
                  <p className="text-xs text-green-600 font-medium">{t('wellness.goals.completed')}</p>
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
