
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { PhysicalActivity } from "@/types/health";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface ActivityTrackerProps {
  activities: PhysicalActivity[];
  isLoading: boolean;
  preview?: boolean;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  activities,
  isLoading,
  preview = false
}) => {
  // Process data for the chart
  const chartData = React.useMemo(() => {
    const grouped = activities.reduce((acc: Record<string, { date: string; totalMinutes: number; totalCalories: number }>, activity) => {
      if (!acc[activity.date]) {
        acc[activity.date] = {
          date: activity.date,
          totalMinutes: 0,
          totalCalories: 0,
        };
      }
      
      acc[activity.date].totalMinutes += activity.duration;
      acc[activity.date].totalCalories += activity.caloriesBurned;
      
      return acc;
    }, {});
    
    return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
  }, [activities]);
  
  const recentActivities = activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, preview ? 3 : 5);
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Activité physique</CardTitle>
          <CardDescription>Suivi de vos activités récentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Activité physique</CardTitle>
            <CardDescription>Suivi de vos activités récentes</CardDescription>
          </div>
          {preview && (
            <Button variant="ghost" size="sm" className="gap-1">
              Détails <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <>
            <div className="h-[200px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(parseISO(date), 'dd/MM')}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="minutes"
                    orientation="left"
                    tickFormatter={(value) => `${value}m`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="calories"
                    orientation="right"
                    tickFormatter={(value) => `${value}cal`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      if (name === 'totalMinutes') return [`${value} min`, 'Durée'];
                      if (name === 'totalCalories') return [`${value} cal`, 'Calories'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => format(parseISO(label), 'dd MMMM yyyy', { locale: fr })}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalMinutes" 
                    name="totalMinutes"
                    stroke="#3b82f6" 
                    fill="#3b82f680"
                    yAxisId="minutes"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalCalories" 
                    name="totalCalories"
                    stroke="#ef4444" 
                    fill="#ef444480"
                    yAxisId="calories"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Activités récentes</h3>
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {activity.duration} min
                        </span>
                        <span>{activity.caloriesBurned} cal</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{format(parseISO(activity.date), 'dd/MM')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-2">Aucune activité récente à afficher</p>
            <Button>Ajouter une activité</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTracker;
