
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MobilePaymentFormProps {
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
}

const MobilePaymentForm = ({
  mobileNumber,
  setMobileNumber,
}: MobilePaymentFormProps) => {
  const [provider, setProvider] = React.useState("orange");

  // Format phone number as user types
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    
    // Format with spaces for readability
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i === 2 || i === 5 || i === 8) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }
    
    setMobileNumber(formattedValue);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Mobile Money</h3>
        <Smartphone className="h-6 w-6 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="mobile-provider">Opérateur</Label>
          <Select 
            value={provider} 
            onValueChange={setProvider}
          >
            <SelectTrigger id="mobile-provider">
              <SelectValue placeholder="Sélectionner un opérateur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orange">Orange Money</SelectItem>
              <SelectItem value="mtn">MTN Mobile Money</SelectItem>
              <SelectItem value="moov">Moov Money</SelectItem>
              <SelectItem value="wave">Wave</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="mobile-number">Numéro de téléphone</Label>
          <Input
            id="mobile-number"
            placeholder="01 23 45 67 89"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            className="font-mono"
          />
          <p className="text-xs text-gray-500 mt-1">
            Vous recevrez un code de confirmation sur ce numéro
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center bg-gray-50 p-2 rounded text-sm text-gray-600">
        <Shield className="h-4 w-4 mr-1 text-gray-500" />
        Transaction sécurisée via votre opérateur mobile
      </div>
    </div>
  );
};

export default MobilePaymentForm;
