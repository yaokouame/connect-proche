
import React from "react";
import Layout from "@/components/Layout";
import MedicationList from "@/components/medications/MedicationList";
import MedicationReminders from "@/components/medications/MedicationReminders";
import MedicationScanner from "@/components/medications/MedicationScanner";
import MedicationInteractions from "@/components/medications/MedicationInteractions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Medications = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-health-blue">Gestion des Médicaments</h1>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="list">Mes Médicaments</TabsTrigger>
            <TabsTrigger value="reminders">Rappels</TabsTrigger>
            <TabsTrigger value="scanner">Scanner</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <MedicationList />
          </TabsContent>
          
          <TabsContent value="reminders">
            <MedicationReminders />
          </TabsContent>
          
          <TabsContent value="scanner">
            <MedicationScanner />
          </TabsContent>
          
          <TabsContent value="interactions">
            <MedicationInteractions />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Medications;
