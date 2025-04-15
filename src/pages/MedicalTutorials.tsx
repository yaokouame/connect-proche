
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConferencesSection from "@/components/tutorials/ConferencesSection";
import TutorialContent from "@/components/tutorials/TutorialContent";
import MedicalActionsSection from "@/components/tutorials/MedicalActionsSection";

const MedicalTutorials = () => {
  const [activeTab, setActiveTab] = useState<string>("tutorials");
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-health-blue">Centre d'apprentissage médical</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des informations claires et fiables pour mieux comprendre votre santé
            et celle de vos proches, ainsi que des formations pour développer vos compétences.
          </p>
        </div>

        <Tabs defaultValue="tutorials" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tutorials">Tutoriels</TabsTrigger>
            <TabsTrigger value="conferences">Formations et conférences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tutorials">
            <TutorialContent />
          </TabsContent>
          
          <TabsContent value="conferences">
            <ConferencesSection />
          </TabsContent>
        </Tabs>

        <MedicalActionsSection />
      </div>
    </Layout>
  );
};

export default MedicalTutorials;
