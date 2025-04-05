
import React from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NutritionEntry } from "@/types/health";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import { ArrowRight, Plus, UtensilsCrossed } from "lucide-react";

interface NutritionJournalProps {
  nutritionData: NutritionEntry[];
  isLoading: boolean;
}

const NutritionJournal: React.FC<NutritionJournalProps> = ({
  nutritionData,
  isLoading
}) => {
  // Get today's entries
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = nutritionData.filter(entry => entry.date === today);
  
  // Calculate total calories and macros for today
  const todayTotals = todayEntries.reduce(
    (acc, entry) => {
      acc.calories += entry.totalCalories;
      
      entry.foods.forEach(food => {
        if (food.protein) acc.protein += food.protein;
        if (food.carbs) acc.carbs += food.carbs;
        if (food.fat) acc.fat += food.fat;
      });
      
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  
  // Prepare data for pie chart
  const macroData = [
    { name: 'Protéines', value: todayTotals.protein, color: '#10b981' },
    { name: 'Glucides', value: todayTotals.carbs, color: '#f59e0b' },
    { name: 'Lipides', value: todayTotals.fat, color: '#ef4444' },
  ];
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Journal alimentaire</CardTitle>
          <CardDescription>Suivi de votre alimentation</CardDescription>
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
            <CardTitle className="text-xl">Journal alimentaire</CardTitle>
            <CardDescription>Suivi de votre alimentation</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Ajouter un repas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {todayEntries.length > 0 ? (
          <>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Aujourd'hui</h3>
                <p className="text-lg font-bold">{todayTotals.calories} kcal</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="text-green-600 font-bold">{todayTotals.protein}g</p>
                  <p className="text-gray-500">Protéines</p>
                </div>
                <div>
                  <p className="text-amber-500 font-bold">{todayTotals.carbs}g</p>
                  <p className="text-gray-500">Glucides</p>
                </div>
                <div>
                  <p className="text-red-500 font-bold">{todayTotals.fat}g</p>
                  <p className="text-gray-500">Lipides</p>
                </div>
              </div>
            </div>
            
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}g`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Repas d'aujourd'hui</h3>
              <div className="space-y-2">
                {todayEntries.map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium capitalize">{entry.mealType}</p>
                      <p className="text-sm text-gray-500">
                        {entry.foods.map(f => f.name).join(', ')}
                      </p>
                    </div>
                    <p className="font-medium">{entry.totalCalories} kcal</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <UtensilsCrossed className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">Aucun repas enregistré aujourd'hui</p>
            <Button>Ajouter un repas</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionJournal;
