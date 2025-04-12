
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getUserActivities, 
  getUserSleep, 
  getUserNutrition, 
  getUserHydration, 
  getWellnessGoals, 
  getWellnessRecommendations 
} from "@/services/wellnessService";
import { WellnessGoal, PhysicalActivity, SleepEntry, NutritionEntry, HydrationEntry } from "@/types/health";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";

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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CallToAction from "@/components/tutorials/CallToAction";

const WellnessPage = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const userId = "user-123"; // Mock user ID for demo purposes
  const { t } = useLanguage();
  
  // Fetch wellness goals
  const { 
    data: wellnessGoals = [],
    isLoading: isLoadingGoals
  } = useQuery({
    queryKey: ['wellnessGoals', userId],
    queryFn: () => getWellnessGoals(userId)
  });
  
  // Fetch wellness recommendations
  const {
    data: recommendations = [],
    isLoading: isLoadingRecommendations
  } = useQuery({
    queryKey: ['wellnessRecommendations'],
    queryFn: () => getWellnessRecommendations()
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-3 text-health-blue">{t('wellness.title')}</h1>
          <p className="text-gray-600 max-w-3xl">
            Suivez votre activité physique, votre sommeil et vos habitudes alimentaires pour améliorer votre bien-être.
            Découvrez des programmes d'exercices personnalisés et connectez vos applications de fitness préférées.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tracking Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Suivi quotidien</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="activity">{t('wellness.activity')}</TabsTrigger>
                  <TabsTrigger value="sleep">{t('wellness.sleep')}</TabsTrigger>
                  <TabsTrigger value="nutrition">{t('wellness.nutrition')}</TabsTrigger>
                  <TabsTrigger value="hydration">Hydratation</TabsTrigger>
                </TabsList>
                
                <div className="bg-white rounded-lg">
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
            </div>
            
            {/* Exercise Videos Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Programmes d'exercices recommandés</h2>
              <ExerciseVideos />
            </div>
            
            {/* Recommendations Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Conseils personnalisés</h2>
              <WellnessRecommendations recommendations={recommendations} isLoading={isLoadingRecommendations} />
            </div>
          </div>
          
          {/* Sidebar - Right Side (1/3) */}
          <div className="space-y-8">
            {/* Goals Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Mes objectifs</h2>
              <WellnessGoals goals={wellnessGoals} isLoading={isLoadingGoals} />
            </div>
            
            {/* Connect Apps Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Applications connectées</h2>
              <p className="text-sm text-gray-500 mb-4">
                Connectez vos applications de fitness préférées pour synchroniser automatiquement vos données.
              </p>
              <FitnessAppConnect />
            </div>
          </div>
        </div>
        
        {/* Voice Recognition */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Commandes vocales</h2>
          <p className="text-sm text-gray-500 mb-4">
            Utilisez votre voix pour naviguer et enregistrer des données de bien-être.
          </p>
          <VoiceRecognition onResult={handleVoiceResult} />
        </div>
        
        {/* Call to Action */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <CallToAction />
        </div>
      </div>
    </Layout>
  );
};

export default WellnessPage;
