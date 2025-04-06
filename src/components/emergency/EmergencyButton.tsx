
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, AlertCircle } from "lucide-react";
import { EmergencyDrawer } from "./EmergencyDrawer";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useUser();
  const { t } = useLanguage();
  
  const emergencyNumber = "112"; // European emergency number

  const handleEmergencyCall = () => {
    // Open the phone app with the emergency number
    window.location.href = `tel:${emergencyNumber}`;
  };

  return (
    <>
      <Button
        variant="destructive"
        size="lg"
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 p-0 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <AlertCircle className="w-7 h-7" />
      </Button>
      
      <EmergencyDrawer 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        onCallEmergency={handleEmergencyCall}
      />
    </>
  );
};

export default EmergencyButton;
