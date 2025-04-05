
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import wellness components
import ActivityTracker from "@/components/wellness/ActivityTracker";
import NutritionJournal from "@/components/wellness/NutritionJournal";
import HydrationTracker from "@/components/wellness/HydrationTracker";
import SleepTracker from "@/components/wellness/SleepTracker";
import WellnessGoals from "@/components/wellness/WellnessGoals";
import WellnessRecommendations from "@/components/wellness/WellnessRecommendations";
import ExerciseVideos from "@/components/wellness/ExerciseVideos";
import FitnessAppConnect from "@/components/wellness/FitnessAppConnect";

import {
  getUserActivities,
  getUserNutrition,
  getUserHydration,
  getUserSleep,
  getUserWellnessGoals,
  getWellnessRecommendations
} from "@/services/wellnessService";

const Wellness = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch wellness data
  const { data: activities, isLoading: loadingActivities } = useQuery({
    queryKey: ["activities", currentUser?.id],
    queryFn: () => getUserActivities(currentUser?.id || ""),
    enabled: !!currentUser,
  });
  
  const { data: nutrition, isLoading: loadingNutrition } = useQuery({
    queryKey: ["nutrition", currentUser?.id],
    queryFn: () => getUserNutrition(currentUser?.id || ""),
    enabled: !!currentUser,
  });
  
  const { data: hydration, isLoading: loadingHydration } = useQuery({
    queryKey: ["hydration", currentUser?.id],
    queryFn: () => getUserHydration(currentUser?.id || ""),
    enabled: !!currentUser,
  });
  
  const { data: sleep, isLoading: loadingSleep } = useQuery({
    queryKey: ["sleep", currentUser?.id],
    queryFn: () => getUserSleep(currentUser?.id || ""),
    enabled: !!currentUser,
  });
  
  const { data: goals, isLoading: loadingGoals } = useQuery({
    queryKey: ["wellnessGoals", currentUser?.id],
    queryFn: () => getUserWellnessGoals(currentUser?.id || ""),
    enabled: !!currentUser,
  });
  
  const { data: recommendations, isLoading: loadingRecommendations } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => getWellnessRecommendations(),
  });
  
  if (!currentUser) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Connectez-vous pour accéder à votre espace bien-être</h1>
          <p className="mb-8 text-gray-600">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button>Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">S'inscrire</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Bien-être & Prévention</h1>
          <FitnessAppConnect />
        </div>
        
        <WellnessGoals isLoading={loadingGoals} goals={goals || []} />
        
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-8"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="activity">Activité physique</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition & Hydratation</TabsTrigger>
            <TabsTrigger value="sleep">Sommeil</TabsTrigger>
            <TabsTrigger value="videos">Vidéos d'exercices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActivityTracker 
                isLoading={loadingActivities} 
                activities={activities || []} 
                preview 
              />
              
              <div className="space-y-6">
                <HydrationTracker 
                  isLoading={loadingHydration} 
                  hydrationData={hydration || []} 
                  preview 
                />
                
                <SleepTracker 
                  isLoading={loadingSleep} 
                  sleepData={sleep || []} 
                  preview 
                />
              </div>
            </div>
            
            <WellnessRecommendations 
              isLoading={loadingRecommendations} 
              recommendations={recommendations || []} 
            />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityTracker 
              isLoading={loadingActivities} 
              activities={activities || []} 
            />
          </TabsContent>

          <TabsContent value="nutrition">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NutritionJournal 
                isLoading={loadingNutrition} 
                nutritionData={nutrition || []} 
              />
              
              <HydrationTracker 
                isLoading={loadingHydration} 
                hydrationData={hydration || []} 
              />
            </div>
          </TabsContent>

          <TabsContent value="sleep">
            <SleepTracker 
              isLoading={loadingSleep} 
              sleepData={sleep || []} 
            />
          </TabsContent>

          <TabsContent value="videos">
            <ExerciseVideos />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Wellness;
