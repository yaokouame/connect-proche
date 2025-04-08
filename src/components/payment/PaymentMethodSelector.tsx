
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Building, Wallet, Smartphone, BanknoteIcon, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentMethodSelectorProps {
  selectedMethod: "card" | "insurance" | "paypal" | "mobile" | "transfer" | "cod";
  onMethodChange: (method: "card" | "insurance" | "paypal" | "mobile" | "transfer" | "cod") => void;
}

const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) => {
  return (
    <RadioGroup
      value={selectedMethod}
      onValueChange={(value: "card" | "insurance" | "paypal" | "mobile" | "transfer" | "cod") => onMethodChange(value)}
      className="space-y-3"
    >
      <div>
        <Card className={`border ${selectedMethod === "card" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span>Carte bancaire</span>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className={`border ${selectedMethod === "paypal" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer">
                <Wallet className="h-5 w-5 text-gray-600" />
                <span>PayPal</span>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className={`border ${selectedMethod === "mobile" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mobile" id="mobile" />
              <Label htmlFor="mobile" className="flex items-center space-x-2 cursor-pointer">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <span>Mobile Money</span>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className={`border ${selectedMethod === "transfer" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="transfer" id="transfer" />
              <Label htmlFor="transfer" className="flex items-center space-x-2 cursor-pointer">
                <BanknoteIcon className="h-5 w-5 text-gray-600" />
                <span>Virement bancaire</span>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className={`border ${selectedMethod === "cod" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer">
                <Truck className="h-5 w-5 text-gray-600" />
                <span>Paiement à la livraison</span>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className={`border ${selectedMethod === "insurance" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="insurance" id="insurance" />
              <Label htmlFor="insurance" className="flex items-center space-x-2 cursor-pointer">
                <Building className="h-5 w-5 text-gray-600" />
                <span>Assurance santé</span>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
