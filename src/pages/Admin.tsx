
import React from "react";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminStats from "@/components/admin/AdminStats";
import { useLanguage } from "@/contexts/LanguageContext";

const Admin = () => {
  const { currentUser } = useUser();
  const { t } = useLanguage();
  
  // Check if user is admin
  const isAdmin = currentUser?.role === "professional";
  
  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-health-blue">Tableau de bord administrateur</h1>
        
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="mt-6">
            <AdminStats />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <AdminOrders />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
