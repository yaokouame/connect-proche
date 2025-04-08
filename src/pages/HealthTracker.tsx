
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHealthTracker } from "@/hooks/useHealthTracker";
import HealthLoginPrompt from "@/components/health/HealthLoginPrompt";
import HealthTrackerHeader from "@/components/health/HealthTrackerHeader";
import HealthOverview from "@/components/health/HealthOverview";
import HealthTrends from "@/components/health/HealthTrends";
import DeviceManagement from "@/components/health/DeviceManagement";
import EmptyOverview from "@/components/health/EmptyOverview";
import EmptyTrends from "@/components/health/EmptyTrends";

const HealthTracker = () => {
  const {
    currentUser,
    vitalSigns,
    loadingVitalSigns,
    devices,
    loadingDevices,
    activeTab,
    setActiveTab,
    handleAddReading,
    handleAddDevice,
    handleSyncDevice
  } = useHealthTracker();
  
  if (!currentUser) {
    return (
      <Layout>
        <HealthLoginPrompt />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <HealthTrackerHeader 
          onAddReading={handleAddReading}
          userId={currentUser.id}
          onAddDevice={handleAddDevice}
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-6">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
            <TabsTrigger value="devices">Appareils</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {loadingVitalSigns ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
              </div>
            ) : vitalSigns ? (
              <HealthOverview 
                vitalSigns={vitalSigns} 
                onViewAllTrends={() => setActiveTab("trends")} 
              />
            ) : (
              <EmptyOverview onNavigateToDevices={() => setActiveTab("devices")} />
            )}
          </TabsContent>

          <TabsContent value="trends">
            {vitalSigns ? (
              <HealthTrends vitalSigns={vitalSigns} />
            ) : (
              <EmptyTrends />
            )}
          </TabsContent>

          <TabsContent value="devices">
            <DeviceManagement 
              devices={devices} 
              loadingDevices={loadingDevices}
              onSyncDevice={handleSyncDevice}
              onAddDevice={handleAddDevice}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HealthTracker;
