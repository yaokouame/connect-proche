
import React from "react";
import { Truck, Info, Check, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CashOnDeliveryFormProps {
  onTermsAcceptedChange?: (accepted: boolean) => void;
}

const CashOnDeliveryForm = ({ onTermsAcceptedChange }: CashOnDeliveryFormProps) => {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  
  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    if (onTermsAcceptedChange) {
      onTermsAcceptedChange(checked);
    }
  };
  
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Paiement à la livraison</h3>
        <Truck className="h-6 w-6 text-gray-500" />
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-3 rounded-md text-blue-700 text-sm flex items-start">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium mb-1">Informations importantes :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Préparez le montant exact si possible</li>
            <li>Paiement en espèces uniquement</li>
            <li>Un justificatif de paiement vous sera remis</li>
            <li>Frais supplémentaires de 1 000 F CFA appliqués</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-100 p-3 rounded-md text-amber-700 text-sm flex items-start">
        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p>Le livreur exigera une pièce d'identité. Assurez-vous d'être présent avec une pièce d'identité valide lors de la livraison.</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={termsAccepted}
          onCheckedChange={(checked) => handleTermsChange(checked === true)}
        />
        <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
          J'accepte de payer à la livraison et je comprends que des frais supplémentaires s'appliquent
        </Label>
      </div>
      
      {termsAccepted && (
        <div className="flex items-center text-green-600 text-sm">
          <Check className="h-4 w-4 mr-1" />
          Vous paierez à la livraison
        </div>
      )}
    </div>
  );
};

export default CashOnDeliveryForm;
