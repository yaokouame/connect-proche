
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatPatientQrData } from "@/utils/patientQrUtils";
import { PatientProfile } from "@/types/user";
import { QrCode, Info, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientQrCodeSectionProps {
  patient: PatientProfile;
}

const PatientQrCodeSection = ({ patient }: PatientQrCodeSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const patientData = formatPatientQrData(patient);
  
  // QR code URL using the QR code API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(patientData)}`;
  
  const handleDownload = () => {
    // Create a temporary anchor element to download the QR code
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-medical-${patient.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code téléchargé",
      description: "Le QR code a été téléchargé avec succès.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-health-blue" />
          <h3 className="text-lg font-medium">QR Code Medical</h3>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600 mb-4">
            Ce QR code contient vos informations médicales essentielles. Montrez-le à un professionnel de santé en cas d'urgence.
          </p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Afficher mon QR code médical
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>QR Code médical</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-48 h-48 bg-white flex items-center justify-center border">
                    <img src={qrCodeUrl} alt="QR Code" className="w-full h-full" />
                  </div>
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 gap-1 mt-2">
                    <Info className="h-3 w-3" />
                    <span>Informations médicales essentielles</span>
                  </div>
                  
                  <p className="text-sm text-center mt-4">
                    Ce QR code contient vos informations médicales essentielles comme votre groupe sanguin, 
                    allergies, médicaments et contact d'urgence.
                  </p>
                  
                  <Button onClick={handleDownload} className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le QR code
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientQrCodeSection;
