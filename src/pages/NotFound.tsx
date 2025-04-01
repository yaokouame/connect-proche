
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold text-health-blue mb-4">404</h1>
        <p className="text-2xl text-health-dark mb-8">Oops! Page introuvable</p>
        <p className="text-gray-600 text-center max-w-md mb-8">
          Nous sommes désolés, mais la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button size="lg">
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
