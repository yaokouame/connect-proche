
import React from "react";
import { useUser } from "@/contexts/UserContext";
import { PatientProfile } from "@/types/user";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone, Share2, AlertCircle, X, Heart, User, FileText } from "lucide-react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerFooter 
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

interface EmergencyDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCallEmergency: () => void;
}

export const EmergencyDrawer = ({ open, onOpenChange, onCallEmergency }: EmergencyDrawerProps) => {
  const { currentUser } = useUser();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const patientUser = currentUser as PatientProfile | undefined;
  
  const handleShareMedicalInfo = () => {
    // Create a shareable URL or QR code (stub for now)
    // In a real app, this would generate a temporary secure link
    navigator.clipboard.writeText(
      `${window.location.origin}/emergency-info/${currentUser?.id}`
    ).then(() => {
      toast({
        title: "Lien d'urgence copié",
        description: "Le lien d'accès à vos informations médicales a été copié dans le presse-papiers.",
      });
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-red-50">
        <DrawerHeader className="bg-red-600 text-white">
          <DrawerTitle className="text-xl font-bold flex items-center">
            <AlertCircle className="mr-2" /> Urgence
          </DrawerTitle>
          <p className="opacity-90">Accédez rapidement à vos informations médicales essentielles</p>
        </DrawerHeader>
        
        <div className="p-4 space-y-6">
          <Button 
            variant="destructive" 
            className="w-full py-6 text-lg" 
            onClick={onCallEmergency}
          >
            <Phone className="mr-2 h-5 w-5" /> Appeler le SAMU (185)
          </Button>
          
          {currentUser ? (
            <>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-700" /> 
                  Information personnelle
                </h3>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p><strong>Nom:</strong> {currentUser.name}</p>
                  {patientUser?.dateOfBirth && (
                    <p><strong>Date de naissance:</strong> {patientUser.dateOfBirth}</p>
                  )}
                  {patientUser?.bloodType && (
                    <p><strong>Groupe sanguin:</strong> {patientUser.bloodType}</p>
                  )}
                </div>
              </div>
              
              {/* Insurance Information Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-500" /> 
                  Assurance santé
                </h3>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  {patientUser?.insuranceInfo ? (
                    <>
                      <p><strong>Assureur:</strong> {patientUser.insuranceInfo.provider}</p>
                      <p><strong>N° Police:</strong> {patientUser.insuranceInfo.policyNumber}</p>
                      <p><strong>N° Adhérent:</strong> {patientUser.insuranceInfo.membershipNumber}</p>
                      <p><strong>Validité:</strong> {patientUser.insuranceInfo.validUntil}</p>
                    </>
                  ) : (
                    <p className="text-gray-500 italic">Aucune information d'assurance enregistrée</p>
                  )}
                </div>
              </div>
              
              {patientUser?.allergies && patientUser.allergies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-red-500" /> 
                    Allergies
                  </h3>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <ul className="list-disc list-inside">
                      {patientUser.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {patientUser?.medications && patientUser.medications.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-500" /> 
                    Médicaments actuels
                  </h3>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <ul className="list-disc list-inside">
                      {patientUser.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {patientUser?.emergencyContact && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-blue-500" /> 
                    Contact d'urgence
                  </h3>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p><strong>Nom:</strong> {patientUser.emergencyContact.name}</p>
                    <p><strong>Relation:</strong> {patientUser.emergencyContact.relationship}</p>
                    <p>
                      <strong>Téléphone:</strong> 
                      <a href={`tel:${patientUser.emergencyContact.phone}`} className="text-blue-500 ml-1">
                        {patientUser.emergencyContact.phone}
                      </a>
                    </p>
                    {patientUser.emergencyContact.email && (
                      <p><strong>Email:</strong> {patientUser.emergencyContact.email}</p>
                    )}
                  </div>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleShareMedicalInfo}
              >
                <Share2 className="mr-2 h-5 w-5" /> 
                Partager avec les services d'urgence
              </Button>
            </>
          ) : (
            <div className="text-center p-4 bg-white rounded-md shadow-sm">
              <p className="mb-3 text-gray-500">
                Connectez-vous pour afficher vos informations médicales d'urgence
              </p>
              <Button variant="default" className="mx-auto" onClick={() => {
                onOpenChange(false);
                window.location.href = '/login';
              }}>
                Se connecter
              </Button>
            </div>
          )}
        </div>
        
        <DrawerFooter className="border-t pt-2">
          <DrawerClose asChild>
            <Button variant="outline">
              <X className="mr-2 h-4 w-4" /> Fermer
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
