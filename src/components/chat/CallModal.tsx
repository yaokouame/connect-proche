
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Contact } from "@/types/chat";
import { PhoneCall, Video, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CallModalProps {
  contact: Contact;
  callType: "audio" | "video";
  onClose: () => void;
}

const CallModal = ({ contact, callType, onClose }: CallModalProps) => {
  const [isAccepting, setIsAccepting] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const handleAcceptCall = () => {
    setIsAccepting(true);
    
    // In a real app, this would handle the payment and initiate the call
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  
  const CallContent = (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-24 h-24 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue text-4xl font-semibold mb-4">
        {contact.name.charAt(0)}
      </div>
      
      <h3 className="text-xl font-medium mb-1">{contact.name}</h3>
      <p className="text-gray-500 mb-6">{contact.specialty}</p>
      
      <div className="flex items-center mb-8">
        {callType === "audio" ? (
          <PhoneCall className="w-6 h-6 text-health-blue mr-2" />
        ) : (
          <Video className="w-6 h-6 text-health-blue mr-2" />
        )}
        <span className="text-lg">
          {callType === "audio" ? "Appel audio" : "Appel vidéo"}
        </span>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg mb-6 text-center">
        <p className="text-gray-600 mb-2">Service payant</p>
        <p className="text-lg font-medium">2,50 € / minute</p>
      </div>
      
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onClose} disabled={isAccepting}>
          <X className="mr-2 h-4 w-4" />
          Annuler
        </Button>
        <Button onClick={handleAcceptCall} disabled={isAccepting}>
          {isAccepting ? (
            "Connexion en cours..."
          ) : (
            <>
              {callType === "audio" ? (
                <PhoneCall className="mr-2 h-4 w-4" />
              ) : (
                <Video className="mr-2 h-4 w-4" />
              )}
              Accepter et payer
            </>
          )}
        </Button>
      </div>
    </div>
  );
  
  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {callType === "audio" ? "Appel audio" : "Appel vidéo"} avec {contact.name}
            </DialogTitle>
          </DialogHeader>
          {CallContent}
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Drawer open={true} onOpenChange={() => onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {callType === "audio" ? "Appel audio" : "Appel vidéo"} avec {contact.name}
          </DrawerTitle>
        </DrawerHeader>
        {CallContent}
      </DrawerContent>
    </Drawer>
  );
};

export default CallModal;
