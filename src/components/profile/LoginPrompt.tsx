
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginPrompt = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Connectez-vous pour accéder à votre profil</h1>
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
  );
};

export default LoginPrompt;
