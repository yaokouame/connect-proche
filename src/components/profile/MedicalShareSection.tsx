
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Share2, Clock, QrCode, Link, Clipboard, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface MedicalShareSectionProps {
  patientId: string;
}

const MedicalShareSection = ({ patientId }: MedicalShareSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shareMethod, setShareMethod] = useState<"qrcode" | "link">("qrcode");
  const [expiryTime, setExpiryTime] = useState("24");
  const [shareToken, setShareToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const { toast } = useToast();

  const generateShareToken = () => {
    // In a real app, this would call an API to generate a secure token
    // and store it in the database with an expiry time
    const mockToken = `med-${patientId.substring(0, 5)}-${Math.random().toString(36).substring(2, 8)}`;
    setShareToken(mockToken);
    return mockToken;
  };

  const handleGenerateShare = () => {
    const token = generateShareToken();
    
    // In a real app, we would save this share to the database
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + parseInt(expiryTime));
    
    toast({
      title: "Partage créé",
      description: `Votre dossier médical peut être partagé pendant ${expiryTime} heures.`,
    });
  };

  const copyToClipboard = () => {
    // Create the full URL for sharing
    const shareUrl = `${window.location.origin}/shared-medical-record/${shareToken}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Lien copié",
      description: "Le lien de partage a été copié dans le presse-papier.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-health-blue" />
          <h3 className="text-lg font-medium">Partage sécurisé du dossier</h3>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600 mb-4">
            Partagez votre dossier médical de manière sécurisée avec un professionnel de santé via un QR code ou un lien temporaire.
          </p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Partager mon dossier médical
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Partager mon dossier médical</DialogTitle>
              </DialogHeader>
              
              {!shareToken ? (
                <div className="space-y-4 py-4">
                  <div className="flex space-x-2">
                    <Button 
                      variant={shareMethod === "qrcode" ? "default" : "outline"} 
                      onClick={() => setShareMethod("qrcode")}
                      className="flex-1"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                    <Button 
                      variant={shareMethod === "link" ? "default" : "outline"} 
                      onClick={() => setShareMethod("link")}
                      className="flex-1"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Lien
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Durée de validité</span>
                    </div>
                    <Select value={expiryTime} onValueChange={setExpiryTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une durée" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 heure</SelectItem>
                        <SelectItem value="6">6 heures</SelectItem>
                        <SelectItem value="24">24 heures</SelectItem>
                        <SelectItem value="48">48 heures</SelectItem>
                        <SelectItem value="168">7 jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allow-edit" checked={allowEdit} onCheckedChange={(checked) => setAllowEdit(!!checked)} />
                    <label htmlFor="allow-edit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Autoriser les modifications
                    </label>
                  </div>
                  
                  <Button className="w-full" onClick={handleGenerateShare}>
                    Générer le {shareMethod === "qrcode" ? "QR code" : "lien"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  {shareMethod === "qrcode" ? (
                    <div className="flex flex-col items-center justify-center">
                      {/* This would normally be a QR code image */}
                      <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border">
                        <QrCode className="h-20 w-20 text-health-blue" />
                      </div>
                      <p className="text-sm text-center mt-4">
                        Montrez ce QR code à votre professionnel de santé pour lui donner accès à votre dossier médical.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lien de partage</label>
                      <div className="flex">
                        <Input
                          value={`${window.location.origin}/shared-medical-record/${shareToken}`}
                          readOnly
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={copyToClipboard} className="ml-2">
                          {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Ce lien expirera dans {expiryTime} heure{parseInt(expiryTime) > 1 ? "s" : ""}.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setShareToken("")}>
                      Retour
                    </Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Fermer
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalShareSection;
