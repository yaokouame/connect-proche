
import React from "react";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AppointmentsPage = () => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Connectez-vous pour accéder à vos rendez-vous</h1>
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
        <h1 className="text-3xl font-bold mb-6">Mes Rendez-vous</h1>
        <Card>
          <CardHeader>
            <CardTitle>Liste des rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500">Fonctionnalité en cours de développement</p>
              <p className="text-gray-500">Revenez bientôt pour gérer vos rendez-vous</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
