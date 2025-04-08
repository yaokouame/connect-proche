
import React from "react";
import { BanknoteIcon, Copy, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const BankTransferForm = () => {
  const [copied, setCopied] = React.useState<string | null>(null);
  
  const bankDetails = [
    { label: "Banque", value: "Banque Atlantique" },
    { label: "Titulaire", value: "HealthConnect SA" },
    { label: "IBAN", value: "SN39 0101 1010 2020 3030 4040 50" },
    { label: "BIC/SWIFT", value: "ATLFSNDA" },
    { label: "Référence", value: `COMMANDE-${Date.now().toString().slice(-6)}` }
  ];
  
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };
  
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Virement bancaire</h3>
        <BanknoteIcon className="h-6 w-6 text-gray-500" />
      </div>
      
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-amber-700 text-sm flex items-start">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <p>
          Veuillez effectuer un virement avec les coordonnées ci-dessous. 
          Votre commande sera traitée une fois le paiement reçu (1-3 jours ouvrables).
        </p>
      </div>
      
      <div className="space-y-3 mt-4">
        {bankDetails.map((detail) => (
          <div key={detail.label} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <span className="text-sm text-gray-500">{detail.label}</span>
              <p className="font-medium">{detail.value}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => copyToClipboard(detail.value, detail.label)}
              className="h-8"
            >
              {copied === detail.label ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 bg-blue-50 border border-blue-100 p-3 rounded-md text-blue-700 text-sm">
        <p className="text-center">
          Important : Incluez votre numéro de référence dans le libellé du virement
        </p>
      </div>
    </div>
  );
};

export default BankTransferForm;
