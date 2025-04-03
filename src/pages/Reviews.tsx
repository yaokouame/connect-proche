
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorReviews from "@/components/reviews/DoctorReviews";
import CommunityForum from "@/components/reviews/CommunityForum";
import HealthArticles from "@/components/reviews/HealthArticles";

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-health-blue">Avis et Expériences des Patients</h1>
        
        <Tabs defaultValue="reviews" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="reviews">Avis Médecins</TabsTrigger>
            <TabsTrigger value="forum">Forum Santé</TabsTrigger>
            <TabsTrigger value="articles">Conseils & Articles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews">
            <DoctorReviews />
          </TabsContent>
          
          <TabsContent value="forum">
            <CommunityForum />
          </TabsContent>
          
          <TabsContent value="articles">
            <HealthArticles />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reviews;
