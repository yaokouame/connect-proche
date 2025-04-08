
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserActivities, getUserSleep, getUserNutrition, getUserHydration, getUserWellnessGoals, getWellnessRecommendations } from "@/services/wellnessService";
import { WellnessGoal, PhysicalActivity, SleepEntry, NutritionEntry, HydrationEntry } from "@/types/health";
import { useQuery } from "@tanstack/react-query";

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
  const userId = "user-123"; // Mock user ID for demo purposes
  
  // Fetch wellness goals
  const { 
    data: wellnessGoals = [],
    isLoading: isLoadingGoals
  } = useQuery({
    queryKey: ['wellnessGoals', userId],
    queryFn: () => getUserWellnessGoals(userId)
  });
  
  // Fetch wellness recommendations
  const {
    data: recommendations = [],
    isLoading: isLoadingRecommendations
  } = useQuery({
    queryKey: ['wellnessRecommendations'],
    queryFn: getWellnessRecommendations
  });
  
  // Fetch activities
  const {
    data: activities = [],
    isLoading: isLoadingActivities
  } = useQuery({
    queryKey: ['activities', userId],
    queryFn: () => getUserActivities(userId)
  });
  
  // Fetch sleep data
  const {
    data: sleepData = [],
    isLoading: isLoadingSleep
  } = useQuery({
    queryKey: ['sleep', userId],
    queryFn: () => getUserSleep(userId)
  });
  
  // Fetch nutrition data
  const {
    data: nutritionData = [],
    isLoading: isLoadingNutrition
  } = useQuery({
    queryKey: ['nutrition', userId],
    queryFn: () => getUserNutrition(userId)
  });
  
  // Fetch hydration data
  const {
    data: hydrationData = [],
    isLoading: isLoadingHydration
  } = useQuery({
    queryKey: ['hydration', userId],
    queryFn: () => getUserHydration(userId)
  });
  
  const handleVoiceResult = (text: string) => {
    console.log("Voice recognition result:", text);
    // Handle voice commands for wellness page
  };
  
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
                  <ActivityTracker activities={activities} isLoading={isLoadingActivities} />
                </TabsContent>
                
                <TabsContent value="sleep" className="space-y-4">
                  <SleepTracker sleepData={sleepData} isLoading={isLoadingSleep} />
                </TabsContent>
                
                <TabsContent value="nutrition" className="space-y-4">
                  <NutritionJournal nutritionData={nutritionData} isLoading={isLoadingNutrition} />
                </TabsContent>
                
                <TabsContent value="hydration" className="space-y-4">
                  <HydrationTracker hydrationData={hydrationData} isLoading={isLoadingHydration} />
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Programmes d'exercices recommandés</h2>
              <ExerciseVideos />
            </div>
          </div>
          
          <div className="space-y-6">
            <WellnessGoals goals={wellnessGoals} isLoading={isLoadingGoals} />
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recommandations personnalisées</h2>
              <WellnessRecommendations recommendations={recommendations} isLoading={isLoadingRecommendations} />
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Connecter vos applications</h2>
              <FitnessAppConnect />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <VoiceRecognition onResult={handleVoiceResult} />
        </div>
      </div>
    </Layout>
  );
};

export default WellnessPage;
