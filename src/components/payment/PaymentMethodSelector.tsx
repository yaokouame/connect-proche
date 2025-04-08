
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentMethodSelectorProps {
  selectedMethod: "card" | "insurance" | "paypal";
  onMethodChange: (method: "card" | "insurance" | "paypal") => void;
}

const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) => {
  return (
    <RadioGroup
      value={selectedMethod}
      onValueChange={(value: "card" | "insurance" | "paypal") => onMethodChange(value)}
      className="space-y-3"
    >
      <div>
        <Card className={`border ${selectedMethod === "card" ? "border-primary" : "border-gray-200"}`}>
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
        <Card className={`border ${selectedMethod === "insurance" ? "border-primary" : "border-gray-200"}`}>
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
      
      <div>
        <Card className={`border ${selectedMethod === "paypal" ? "border-primary" : "border-gray-200"}`}>
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
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
