
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CardPaymentFormProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardHolder: string;
  setCardHolder: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  is3DSecureEnabled: boolean;
  setIs3DSecureEnabled: (value: boolean) => void;
}

const CardPaymentForm = ({
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  is3DSecureEnabled,
  setIs3DSecureEnabled
}: CardPaymentFormProps) => {
  // Formater le numéro de carte avec des espaces tous les 4 chiffres
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    
    // Ajouter un espace tous les 4 chiffres
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }
    
    setCardNumber(formattedValue);
  };

  // Formater la date d'expiration (MM/YY)
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    
    setExpiryDate(value);
  };

  // Limiter CVV à 3 ou 4 chiffres
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Informations de paiement</h3>
        <CreditCard className="h-6 w-6 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="card-number">Numéro de carte</Label>
          <Input
            id="card-number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="font-mono"
          />
        </div>
        
        <div>
          <Label htmlFor="card-holder">Titulaire de la carte</Label>
          <Input
            id="card-holder"
            placeholder="Prénom NOM"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry-date">Date d'expiration</Label>
            <Input
              id="expiry-date"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="cvv">
              CVV
              <span className="ml-1 text-xs text-gray-500">(3 ou 4 chiffres)</span>
            </Label>
            <Input
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
              type="password"
              className="font-mono"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="3d-secure"
            checked={is3DSecureEnabled}
            onCheckedChange={setIs3DSecureEnabled}
          />
          <Label htmlFor="3d-secure" className="cursor-pointer flex items-center">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
            <span>Activer la vérification 3D Secure</span>
          </Label>
        </div>
        
        {is3DSecureEnabled && (
          <div className="bg-green-50 border border-green-100 p-2 rounded text-sm text-green-700">
            La vérification 3D Secure vous redirigera vers l'interface sécurisée de votre banque
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-center bg-gray-50 p-2 rounded text-sm text-gray-600">
        <Lock className="h-4 w-4 mr-1 text-gray-500" />
        Paiement sécurisé avec cryptage SSL 256-bit
      </div>
    </div>
  );
};

export default CardPaymentForm;
