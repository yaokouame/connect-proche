
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";
import AdminStats from "@/components/admin/AdminStats";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminPharmacies from "@/components/admin/AdminPharmacies";
import DatabaseRecords from "@/components/admin/DatabaseRecords";

const Admin = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState("stats");

  // Redirect if not an admin (for simplicity, we'll check if the user is a professional)
  if (!currentUser || currentUser.role !== "professional") {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-health-dark">
          Tableau de bord administrateur
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="database">Base de données</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <AdminStats />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>

          <TabsContent value="pharmacies">
            <AdminPharmacies />
          </TabsContent>
          
          <TabsContent value="database">
            <DatabaseRecords />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
