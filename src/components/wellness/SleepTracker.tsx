
import React from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { Button } from "@/components/ui/button";
import { SleepEntry } from "@/types/health";
import { ArrowRight, Moon, Plus, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SleepTrackerProps {
  sleepData: SleepEntry[];
  isLoading: boolean;
  preview?: boolean;
}

const SleepTracker: React.FC<SleepTrackerProps> = ({
  sleepData,
  isLoading,
  preview = false
}) => {
  // Process data for the chart
  const chartData = React.useMemo(() => {
    return sleepData
      .map(entry => ({
        date: entry.date,
        hours: Math.round(entry.duration / 60 * 10) / 10, // Convert minutes to hours with 1 decimal
        quality: entry.quality,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [sleepData]);
  
  const getQualityColor = (quality: SleepEntry['quality']): string => {
    switch (quality) {
      case 'poor': return 'bg-red-100 text-red-800';
      case 'fair': return 'bg-amber-100 text-amber-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'excellent': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getQualityLabel = (quality: SleepEntry['quality']): string => {
    switch (quality) {
      case 'poor': return 'Mauvais';
      case 'fair': return 'Moyen';
      case 'good': return 'Bon';
      case 'excellent': return 'Excellent';
      default: return quality;
    }
  };
  
  // Get latest sleep data
  const latestSleep = sleepData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Sommeil</CardTitle>
          <CardDescription>Suivi de vos cycles de sommeil</CardDescription>
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
            <CardTitle className="text-lg">Sommeil</CardTitle>
            <CardDescription>Suivi de vos cycles de sommeil</CardDescription>
          </div>
          {preview && (
            <Button variant="ghost" size="sm" className="gap-1">
              Détails <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {sleepData.length > 0 ? (
          <>
            {latestSleep && (
              <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-500">Dernière nuit</p>
                    <p className="text-2xl font-bold">
                      {Math.floor(latestSleep.duration / 60)}h {latestSleep.duration % 60}min
                    </p>
                  </div>
                  <Badge className={getQualityColor(latestSleep.quality)}>
                    {getQualityLabel(latestSleep.quality)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Moon className="h-4 w-4 text-indigo-700" />
                    <span>{format(parseISO(latestSleep.startTime), 'HH:mm')}</span>
                  </div>
                  <div className="h-[2px] flex-1 bg-indigo-200 mx-2"></div>
                  <div className="flex items-center gap-1">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span>{format(parseISO(latestSleep.endTime), 'HH:mm')}</span>
                  </div>
                </div>
              </div>
            )}
            
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
                      tickFormatter={(value) => `${value}h`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value} heures`, 'Sommeil']}
                      labelFormatter={(label) => format(parseISO(label), 'dd MMMM yyyy', { locale: fr })}
                    />
                    <Bar 
                      dataKey="hours" 
                      name="Sommeil"
                      fill="#8b5cf6" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-2">Aucune donnée de sommeil</p>
            <Button>Ajouter un enregistrement</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
