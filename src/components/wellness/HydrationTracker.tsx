
import React from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { Button } from "@/components/ui/button";
import { HydrationEntry } from "@/types/health";
import { ArrowRight, Droplet, Plus } from "lucide-react";

interface HydrationTrackerProps {
  hydrationData: HydrationEntry[];
  isLoading: boolean;
  preview?: boolean;
}

const HydrationTracker: React.FC<HydrationTrackerProps> = ({
  hydrationData,
  isLoading,
  preview = false
}) => {
  // Process data for the chart
  const chartData = React.useMemo(() => {
    const grouped = hydrationData.reduce((acc: Record<string, { date: string; totalWater: number }>, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = {
          date: entry.date,
          totalWater: 0,
        };
      }
      
      acc[entry.date].totalWater += entry.amount;
      
      return acc;
    }, {});
    
    return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
  }, [hydrationData]);
  
  // Calculate today's hydration
  const today = new Date().toISOString().split('T')[0];
  const todayHydration = hydrationData
    .filter(entry => entry.date === today)
    .reduce((total, entry) => total + entry.amount, 0);
  
  const dailyGoal = 2000; // ml
  const percentComplete = Math.min((todayHydration / dailyGoal) * 100, 100);
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Hydratation</CardTitle>
          <CardDescription>Suivi de votre consommation d'eau</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[150px] flex items-center justify-center">
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
            <CardTitle className="text-lg">Hydratation</CardTitle>
            <CardDescription>Suivi de votre consommation d'eau</CardDescription>
          </div>
          {preview && (
            <Button variant="ghost" size="sm" className="gap-1">
              Détails <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {hydrationData.length > 0 ? (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <div className="w-16 h-16 relative mr-4">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                  <div 
                    className="absolute bottom-0 rounded-full bg-blue-400"
                    style={{
                      width: '100%',
                      height: `${percentComplete}%`,
                      transition: 'height 1s ease-out'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Droplet className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayHydration} ml</p>
                  <p className="text-sm text-gray-500">sur {dailyGoal} ml</p>
                </div>
              </div>
              
              <Button className="flex flex-col items-center justify-center h-full gap-2">
                <Plus className="h-6 w-6" />
                <span>Ajouter</span>
              </Button>
            </div>
            
            {!preview && (
              <div className="h-[200px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => format(parseISO(date), 'dd/MM')}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value}ml`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value} ml`, 'Eau']}
                      labelFormatter={(label) => format(parseISO(label), 'dd MMMM yyyy', { locale: fr })}
                    />
                    <Bar 
                      dataKey="totalWater" 
                      name="Eau"
                      fill="#0ea5e9" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-2">Aucune donnée d'hydratation</p>
            <Button>Commencer à suivre</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HydrationTracker;
