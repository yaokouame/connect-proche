
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prescription } from "@/types/user";
import { FileText, Calendar, Clock, User } from "lucide-react";

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

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
    <div className="space-y-4">
      {prescriptions.length === 0 ? (
        <p className="text-gray-500 italic">Aucune ordonnance enregistrée</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="border-l-4 border-l-health-blue">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{prescription.medications.length} Médicament(s)</CardTitle>
                  <Badge className={getStatusBadgeColor(prescription.status)}>
                    {prescription.status === "active" ? "Active" : 
                     prescription.status === "expired" ? "Expirée" : "Complétée"}
                  </Badge>
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
              
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedPrescription(prescription)}
                      className="w-full"
                    >
                      <FileText className="w-4 h-4 mr-2" /> Voir détails
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Détails de l'ordonnance</DialogTitle>
                    </DialogHeader>
                    
                    {prescription && (
                      <div className="space-y-4">
                        <div className="border-b pb-2">
                          <p className="text-sm font-medium">Prescrite par:</p>
                          <p>Dr. {prescription.professionalName}</p>
                        </div>
                        
                        <div className="border-b pb-2">
                          <p className="text-sm font-medium">Dates:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-gray-500">Date</p>
                              <p>{prescription.date}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Expiration</p>
                              <p>{prescription.expiryDate}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Médicaments prescrits:</p>
                          {prescription.medications.map((med, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-md">
                              <p className="font-medium">{med.name}</p>
                              <div className="grid grid-cols-3 gap-1 text-sm mt-1">
                                <div>
                                  <p className="text-xs text-gray-500">Dosage</p>
                                  <p>{med.dosage}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Fréquence</p>
                                  <p>{med.frequency}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Durée</p>
                                  <p>{med.duration}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {prescription.instructions && (
                          <div className="border-t pt-2">
                            <p className="text-sm font-medium">Instructions:</p>
                            <p className="text-gray-700 whitespace-pre-line">{prescription.instructions}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="pt-2 text-center">
        <Button variant="outline" disabled>
          <FileText className="w-4 h-4 mr-2" /> Ajouter une ordonnance
          <span className="ml-2 text-xs text-gray-500">(Bientôt disponible)</span>
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionList;
