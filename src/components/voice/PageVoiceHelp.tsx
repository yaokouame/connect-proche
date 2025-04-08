
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PageVoiceHelpProps {
  pageDescription: string;
  instructions?: Record<string, string>;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  variant?: "icon" | "button";
  className?: string;
}

const PageVoiceHelp: React.FC<PageVoiceHelpProps> = ({
  pageDescription,
  instructions = {},
  position = "top-right",
  variant = "icon",
  className = "",
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Configure position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  useEffect(() => {
    // Créer l'utterance au montage du composant
    if ('speechSynthesis' in window) {
      const newUtterance = new SpeechSynthesisUtterance();
      newUtterance.lang = "fr-FR";
      
      newUtterance.onstart = () => setIsSpeaking(true);
      newUtterance.onend = () => setIsSpeaking(false);
      newUtterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: "Erreur de synthèse vocale",
          description: "Impossible de lire le texte. Veuillez réessayer.",
          variant: "destructive",
        });
      };
      
      setUtterance(newUtterance);
    }
    
    // Nettoyer à la suppression du composant
    return () => {
      if (utterance && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!utterance || !('speechSynthesis' in window)) {
      toast({
        title: "Fonctionnalité non disponible",
        description: "La synthèse vocale n'est pas prise en charge par votre navigateur.",
        variant: "destructive",
      });
      return;
    }
    
    // Annuler toute synthèse vocale en cours
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      // Si on clique sur le même bouton, on arrête simplement
      if (utterance.text === text && isSpeaking) {
        setIsSpeaking(false);
        return;
      }
    }
    
    utterance.text = text;
    window.speechSynthesis.speak(utterance);
  };

  const speakPageDescription = () => {
    speak(pageDescription);
  };

  const speakInstruction = (key: string) => {
    if (instructions[key]) {
      speak(instructions[key]);
    }
  };

  if (!('speechSynthesis' in window)) {
    return null;
  }

  if (variant === "icon") {
    return (
      <div className={`fixed z-40 ${positionClasses[position]} ${className}`}>
        <Button
          onClick={speakPageDescription}
          variant="outline"
          size="icon"
          className={`h-10 w-10 rounded-full shadow-md ${isSpeaking ? 'bg-red-100 border-red-300' : ''}`}
          title="Aide vocale pour cette page"
          aria-label="Aide vocale pour cette page"
        >
          {isSpeaking ? 
            <VolumeX className="h-5 w-5 text-red-500" /> : 
            <Volume2 className="h-5 w-5 text-health-blue" />
          }
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={speakPageDescription}
      variant="outline"
      size="sm"
      className={`${className} ${isSpeaking ? 'bg-red-100 border-red-300 text-red-700' : ''}`}
      title="Aide vocale pour cette page"
      aria-label="Aide vocale pour cette page"
    >
      {isSpeaking ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
      {isSpeaking ? "Arrêter" : "Aide vocale"}
    </Button>
  );
};

export default PageVoiceHelp;
