
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { isSpeechRecognitionSupported, createSpeechRecognition, SpeechRecognition } from "@/utils/voiceRecognition";
import { VoiceRecognitionProps } from "@/types/health";

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({
  onResult,
  onListening,
  language = "fr-FR",
  continuous = false,
  className
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    const supported = isSpeechRecognitionSupported();
    setIsSupported(supported);
    
    if (supported) {
      const recognitionInstance = createSpeechRecognition();
      if (recognitionInstance) {
        recognitionInstance.lang = language;
        recognitionInstance.continuous = continuous;
        recognitionInstance.interimResults = false;
        
        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onResult(transcript);
        };
        
        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          toast({
            title: "Erreur de reconnaissance vocale",
            description: `Une erreur est survenue: ${event.error}`,
            variant: "destructive"
          });
          setIsListening(false);
          if (onListening) onListening(false);
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
          if (onListening) onListening(false);
        };
        
        setRecognition(recognitionInstance);
      }
    }
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [language, continuous, onResult, onListening]);

  const toggleListening = useCallback(() => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        setIsListening(true);
        if (onListening) onListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        toast({
          title: "Erreur de reconnaissance vocale",
          description: "Impossible de démarrer la reconnaissance vocale",
          variant: "destructive"
        });
      }
    }
  }, [isListening, recognition, onListening]);

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      onClick={toggleListening}
      variant="outline"
      size="icon"
      className={className}
      aria-label={isListening ? "Arrêter la dictée vocale" : "Démarrer la dictée vocale"}
      title={isListening ? "Arrêter la dictée vocale" : "Démarrer la dictée vocale"}
    >
      {isListening ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5" />}
    </Button>
  );
};

export default VoiceRecognition;
