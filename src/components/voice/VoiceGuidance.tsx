
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones, Volume2 } from "lucide-react";
import VoiceAssistant from "./VoiceAssistant";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageGuide {
  path: string;
  description: string;
}

const VoiceGuidance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageGuide, setCurrentPageGuide] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  // Définir les guides vocaux pour chaque page
  const pageGuides: PageGuide[] = [
    {
      path: "/products", 
      description: "Bienvenue sur la page des produits. Vous pouvez parcourir les médicaments et produits de santé disponibles. Utilisez la barre de recherche en haut pour trouver un produit spécifique, ou parcourez les catégories. Pour ajouter un produit à votre panier, cliquez sur le bouton 'Ajouter au panier'. Si vous avez besoin d'aide, activez l'assistance vocale."
    },
    {
      path: "/cart", 
      description: "Vous êtes dans votre panier. Ici, vous pouvez voir les produits que vous avez choisis, modifier leur quantité ou les supprimer. Pour continuer vers le paiement, cliquez sur le bouton 'Procéder au paiement'."
    },
    {
      path: "/map", 
      description: "Voici la carte des pharmacies et centres de santé près de chez vous. Vous pouvez chercher un établissement, filtrer par type, ou voir leur distance par rapport à votre position."
    },
    {
      path: "/profile", 
      description: "Bienvenue sur votre profil. Ici, vous pouvez consulter et modifier vos informations personnelles, voir votre historique médical, et gérer vos ordonnances."
    },
    {
      path: "/", 
      description: "Bienvenue sur ConnectProche, votre plateforme de santé connectée. Vous pouvez parcourir les différentes sections pour trouver des professionnels de santé, consulter la carte des pharmacies, acheter des produits, ou accéder à votre espace personnel."
    }
  ];

  useEffect(() => {
    // Trouver le guide pour la page actuelle
    const guide = pageGuides.find(guide => location.pathname === guide.path);
    setCurrentPageGuide(guide?.description || null);
  }, [location.pathname]);

  const toggleGuidance = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end space-y-2">
      {isOpen && currentPageGuide && (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs animate-in slide-in-from-bottom-5">
          <h3 className="font-medium mb-2 flex items-center">
            <Headphones className="h-4 w-4 mr-2" />
            Assistance Vocale
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Cliquez sur le bouton pour écouter une description audio de cette page.
          </p>
          <VoiceAssistant pageDescription={currentPageGuide} />
        </div>
      )}
      
      <Button
        onClick={toggleGuidance}
        size="icon"
        className="bg-health-blue hover:bg-health-teal shadow-lg h-12 w-12 rounded-full"
        aria-label="Assistance vocale"
      >
        <Volume2 className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default VoiceGuidance;
