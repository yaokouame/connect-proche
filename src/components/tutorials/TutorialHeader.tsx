
import React from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorialHeaderProps {
  onSpeakIntro?: () => void;
}

const TutorialHeader: React.FC<TutorialHeaderProps> = ({ onSpeakIntro }) => {
  const speakIntroduction = () => {
    if (onSpeakIntro) {
      onSpeakIntro();
    } else if ('speechSynthesis' in window) {
      const text = "Bienvenue sur le centre d'apprentissage médical. Vous trouverez ici des informations claires et fiables pour mieux comprendre votre santé, ainsi que des formations pour développer vos compétences.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <div className="text-center mb-8 relative">
      <h1 className="text-3xl font-bold mb-4 text-health-blue">Centre d'apprentissage médical</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
        Des informations claires et fiables pour mieux comprendre votre santé
        et celle de vos proches, ainsi que des formations pour développer vos compétences.
      </p>
      <div className="absolute top-0 right-0">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={speakIntroduction}
          title="Écouter l'introduction"
          aria-label="Écouter l'introduction"
        >
          <Volume2 className="h-5 w-5 text-health-blue" />
        </Button>
      </div>
    </div>
  );
};

export default TutorialHeader;
