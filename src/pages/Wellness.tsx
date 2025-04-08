
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { wellnessService } from "@/services/wellnessService";
import { WellnessGoal } from "@/types/health";

// Wellness Components
import ActivityTracker from "@/components/wellness/ActivityTracker";
import HydrationTracker from "@/components/wellness/HydrationTracker";
import SleepTracker from "@/components/wellness/SleepTracker";
import NutritionJournal from "@/components/wellness/NutritionJournal";
import WellnessGoals from "@/components/wellness/WellnessGoals";
import WellnessRecommendations from "@/components/wellness/WellnessRecommendations";
import ExerciseVideos from "@/components/wellness/ExerciseVideos";
import FitnessAppConnect from "@/components/wellness/FitnessAppConnect";
import VoiceRecognition from "@/components/voice/VoiceRecognition";

const WellnessPage = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const [isLoading, setIsLoading] = useState(true);
  const [wellnessGoals, setWellnessGoals] = useState<WellnessGoal[]>([]);
  
  useEffect(() => {
    const fetchWellnessData = async () => {
      try {
        const goalsData = await wellnessService.getWellnessGoals();
        setWellnessGoals(goalsData);
      } catch (error) {
        console.error("Error fetching wellness data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWellnessData();
  }, []);
  
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">Bien-être et activité physique</h1>
        <p className="text-gray-600 mb-6">
          Suivez votre activité physique, votre sommeil et vos habitudes alimentaires pour améliorer votre bien-être.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="activity">Activité</TabsTrigger>
                <TabsTrigger value="sleep">Sommeil</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="hydration">Hydratation</TabsTrigger>
              </TabsList>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <TabsContent value="activity" className="space-y-4">
                  <ActivityTracker />
                </TabsContent>
                
                <TabsContent value="sleep" className="space-y-4">
                  <SleepTracker />
                </TabsContent>
                
                <TabsContent value="nutrition" className="space-y-4">
                  <NutritionJournal />
                </TabsContent>
                
                <TabsContent value="hydration" className="space-y-4">
                  <HydrationTracker />
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Programmes d'exercices recommandés</h2>
              <ExerciseVideos />
            </div>
          </div>
          
          <div className="space-y-6">
            <WellnessGoals goals={wellnessGoals} />
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recommandations personnalisées</h2>
              <WellnessRecommendations />
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Connecter vos applications</h2>
              <FitnessAppConnect />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <VoiceRecognition />
        </div>
      </div>
    </Layout>
  );
};

export default WellnessPage;
