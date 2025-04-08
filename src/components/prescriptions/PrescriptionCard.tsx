
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prescription } from "@/types/user";
import { Calendar, Clock, User, Paperclip, FileText, ShoppingCart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrescriptionCardProps {
  prescription: Prescription;
  onViewDetails: (prescription: Prescription) => void;
  isUploading: boolean;
  uploadingPrescriptionId: string | null;
  triggerFileInput: (prescriptionId: string) => void;
  useForPurchase: (prescription: Prescription) => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  onViewDetails,
  isUploading,
  uploadingPrescriptionId,
  triggerFileInput,
  useForPurchase,
}) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "expired":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="border-l-4 border-l-health-blue">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{prescription.medications.length} Médicament(s)</CardTitle>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusBadgeColor(prescription.status)}>
              {prescription.status === "active" ? "Active" : 
              prescription.status === "expired" ? "Expirée" : "Complétée"}
            </Badge>
            {prescription.prescriptionImage && (
              <Badge className="bg-blue-500 flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                <span>Document joint</span>
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" /> 
            <span>Prescrite le: {prescription.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" /> 
            <span>Expire le: {prescription.expiryDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-1" /> 
            <span>Dr. {prescription.professionalName}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          onClick={() => onViewDetails(prescription)}
          className="w-full"
        >
          <FileText className="w-4 h-4 mr-2" /> Voir détails
        </Button>
        
        {/* Button to quickly attach a prescription without viewing details */}
        {!prescription.prescriptionImage && prescription.status === "active" && (
          <Button 
            variant="secondary" 
            className="w-full" 
            onClick={() => triggerFileInput(prescription.id)}
            disabled={isUploading && uploadingPrescriptionId === prescription.id}
          >
            {isUploading && uploadingPrescriptionId === prescription.id ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                Téléchargement...
              </div>
            ) : (
              <>
                <Paperclip className="w-4 h-4 mr-2" />
                Joindre l'ordonnance
              </>
            )}
          </Button>
        )}
        
        {/* Button to use the attached prescription for a purchase */}
        {prescription.prescriptionImage && prescription.status === "active" && (
          <Button 
            className="w-full"
            onClick={() => useForPurchase(prescription)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Utiliser pour achat
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PrescriptionCard;
