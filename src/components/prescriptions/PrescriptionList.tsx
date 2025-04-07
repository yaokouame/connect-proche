
import React, { useState, useRef } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prescription, PrescriptionFile } from "@/types/user";
import { FileText, Calendar, Clock, User, Upload, Paperclip, Check, X, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingPrescriptionId, setUploadingPrescriptionId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, prescriptionId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "application/pdf") {
      toast({
        title: "Format de fichier non supporté",
        description: "Veuillez télécharger une image (JPEG, PNG) ou un PDF",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 5 Mo",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadingPrescriptionId(prescriptionId);
    
    // Simuler un téléchargement
    setTimeout(() => {
      // Dans une application réelle, nous enverrions le fichier au serveur
      // et mettrions à jour l'ordonnance avec le fichier téléchargé
      
      const mockPrescriptionFile: PrescriptionFile = {
        id: `file-${Date.now()}`,
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        verified: false
      };
      
      // Mettre à jour l'ordonnance locale avec le fichier téléchargé
      const updatedPrescriptions = prescriptions.map(p => {
        if (p.id === prescriptionId) {
          return { ...p, prescriptionImage: mockPrescriptionFile };
        }
        return p;
      });
      
      // Dans une application réelle, nous enverrions la mise à jour au serveur également
      
      setIsUploading(false);
      setUploadingPrescriptionId(null);
      
      toast({
        title: "Ordonnance téléchargée",
        description: "Votre ordonnance a été téléchargée avec succès et sera vérifiée par un pharmacien",
      });
      
      // Si le fichier est actuellement affiché, mettre à jour l'affichage
      if (selectedPrescription?.id === prescriptionId) {
        setSelectedPrescription({ ...selectedPrescription, prescriptionImage: mockPrescriptionFile });
      }
    }, 1500);
  };

  const triggerFileInput = (prescriptionId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.dataset.prescriptionId = prescriptionId;
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prescriptionId = fileInputRef.current?.dataset.prescriptionId;
    if (prescriptionId) {
      handleFileChange(e, prescriptionId);
    }
  };

  const useForPurchase = (prescription: Prescription) => {
    // Dans une application réelle, cela marquerait cette ordonnance pour être utilisée
    // pour un achat à venir et redirigerait vers la page des produits
    toast({
      title: "Ordonnance sélectionnée",
      description: "Cette ordonnance sera utilisée pour votre prochain achat de médicaments",
    });
  };

  return (
    <div className="space-y-4">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileInputChange} 
        accept="image/jpeg,image/png,application/pdf" 
        className="hidden" 
      />
      
      {prescriptions.length === 0 ? (
        <p className="text-gray-500 italic">Aucune ordonnance enregistrée</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="border-l-4 border-l-health-blue">
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
                        
                        {/* Section pour afficher/télécharger le document d'ordonnance */}
                        <div className="border-t pt-4">
                          <p className="text-sm font-medium mb-2">Document d'ordonnance:</p>
                          
                          {prescription.prescriptionImage ? (
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <Paperclip className="w-4 h-4 mr-2 text-blue-500" />
                                  <p className="text-sm">{prescription.prescriptionImage.fileName}</p>
                                </div>
                                <div>
                                  {prescription.prescriptionImage.verified ? (
                                    <Badge className="bg-green-500 flex items-center gap-1">
                                      <Check className="w-3 h-3" />
                                      <span>Vérifié</span>
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-amber-500 border-amber-500 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>En attente</span>
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="border rounded-md overflow-hidden mb-2 max-h-[200px]">
                                {/* Si c'est une image, on la montre directement */}
                                <img 
                                  src={prescription.prescriptionImage.fileUrl} 
                                  alt="Ordonnance"
                                  className="w-full object-contain max-h-[200px]"
                                />
                              </div>
                              
                              <div className="text-xs text-gray-500">
                                Téléchargé le {prescription.prescriptionImage.uploadDate}
                              </div>
                            </div>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="w-full flex items-center justify-center" 
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
                                  <Upload className="w-4 h-4 mr-2" />
                                  Joindre l'ordonnance
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                        
                        <DialogFooter>
                          {prescription.status === "active" && prescription.prescriptionImage && (
                            <Button onClick={() => useForPurchase(prescription)}>
                              Utiliser pour achat
                            </Button>
                          )}
                        </DialogFooter>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                
                {/* Bouton pour joindre rapidement une ordonnance sans voir les détails */}
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
                
                {/* Bouton pour utiliser l'ordonnance jointe pour un achat */}
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
          ))}
        </div>
      )}

      <div className="pt-2 text-center">
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" /> Ajouter une ordonnance
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionList;
