
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, FileText } from "lucide-react";

interface InsurancePaymentFormProps {
  insuranceProvider: string;
  setInsuranceProvider: (value: string) => void;
  policyNumber: string;
  setPolicyNumber: (value: string) => void;
  hasVoucher: boolean;
  setHasVoucher: (value: boolean) => void;
}

const InsurancePaymentForm = ({
  insuranceProvider,
  setInsuranceProvider,
  policyNumber,
  setPolicyNumber,
  hasVoucher,
  setHasVoucher,
}: InsurancePaymentFormProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Informations d'assurance</h3>
        <Building className="h-6 w-6 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="insurance-provider">Assureur</Label>
          <Select 
            value={insuranceProvider} 
            onValueChange={setInsuranceProvider}
          >
            <SelectTrigger id="insurance-provider">
              <SelectValue placeholder="Sélectionnez votre assureur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpam">CPAM (Assurance Maladie)</SelectItem>
              <SelectItem value="mgen">MGEN</SelectItem>
              <SelectItem value="axa">AXA Santé</SelectItem>
              <SelectItem value="harmonie">Harmonie Mutuelle</SelectItem>
              <SelectItem value="allianz">Allianz Santé</SelectItem>
              <SelectItem value="swisslife">Swiss Life</SelectItem>
              <SelectItem value="autres">Autre assureur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="policy-number">Numéro de police / d'adhérent</Label>
          <Input
            id="policy-number"
            placeholder="Votre numéro de police d'assurance"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="has-voucher"
            checked={hasVoucher}
            onChange={(e) => setHasVoucher(e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <Label htmlFor="has-voucher" className="text-sm">
            J'ai un bon de prise en charge
          </Label>
        </div>
        
        {hasVoucher && (
          <div className="mt-2">
            <Label htmlFor="voucher-upload">Télécharger votre bon de prise en charge</Label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="voucher-upload"
                className="cursor-pointer flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <FileText className="mr-2 h-5 w-5 text-gray-500" />
                Parcourir...
                <input
                  id="voucher-upload"
                  name="voucher-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
              <span className="ml-3 text-sm text-gray-500">
                PDF, JPG, PNG (max 5MB)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsurancePaymentForm;
