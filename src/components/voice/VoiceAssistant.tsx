
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface VoiceAssistantProps {
  pageDescription?: string;
  autoStart?: boolean;
  className?: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  pageDescription,
  autoStart = false,
  className = "",
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { t } = useLanguage();
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Check if SpeechSynthesis is supported
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
      setIsSupported(true);
    } else {
      console.error("Le navigateur ne supporte pas la synthèse vocale");
      setIsSupported(false);
    }

    return () => {
      if (speechSynthRef.current && utteranceRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (autoStart && pageDescription && isSupported && !isSpeaking) {
      speakText(pageDescription);
    }
  }, [autoStart, pageDescription, isSupported]);

  const speakText = (text: string) => {
    if (!speechSynthRef.current) return;

    speechSynthRef.current.cancel();
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    
    // Essaie de trouver une voix française
    const voices = speechSynthRef.current.getVoices();
    const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
    if (frenchVoice) {
      utteranceRef.current.voice = frenchVoice;
    }

    utteranceRef.current.lang = 'fr-FR';
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utteranceRef.current.onpause = () => setIsPaused(true);
    utteranceRef.current.onresume = () => setIsPaused(false);
    utteranceRef.current.onerror = (event) => {
      console.error("Erreur de synthèse vocale:", event);
      toast({
        title: "Erreur vocale",
        description: "Impossible de lire le texte",
        variant: "destructive",
      });
      setIsSpeaking(false);
    };

    speechSynthRef.current.speak(utteranceRef.current);
  };

  const toggleSpeech = () => {
    if (!speechSynthRef.current) return;

    if (isSpeaking && !isPaused) {
      speechSynthRef.current.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      speechSynthRef.current.resume();
      setIsPaused(false);
    } else if (pageDescription) {
      speakText(pageDescription);
    }
  };

  const stopSpeech = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      onClick={toggleSpeech}
      variant="outline"
      size="icon"
      className={`relative ${className}`}
      aria-label={isSpeaking ? "Mettre en pause l'assistance vocale" : "Activer l'assistance vocale"}
      title={isSpeaking ? "Mettre en pause l'assistance vocale" : "Activer l'assistance vocale"}
    >
      {isSpeaking ? (
        <Volume2 className={isPaused ? "h-5 w-5 text-gray-400" : "h-5 w-5 text-green-500"} />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
      
      {isSpeaking && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      )}
    </Button>
  );
};

export const VoiceHelp: React.FC<{ text: string }> = ({ text }) => {
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useLanguage();

  const speakHelp = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      className="cursor-help inline-flex items-center text-xs text-gray-500"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6" 
        onClick={speakHelp}
      >
        <Info className="h-4 w-4" />
      </Button>
      {showInfo && (
        <div className="ml-2">{text}</div>
      )}
    </div>
  );
};

export default VoiceAssistant;
