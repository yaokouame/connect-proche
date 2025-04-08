
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Tag, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PromoCodeInputProps {
  couponCode: string;
  setCouponCode: (value: string) => void;
  applyCoupon: () => void;
  isValidating?: boolean;
  discount: number;
}

const PromoCodeInput = ({
  couponCode,
  setCouponCode,
  applyCoupon,
  isValidating = false,
  discount
}: PromoCodeInputProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleApplyCoupon = () => {
    applyCoupon();
    // Show success message if discount was applied
    if (couponCode === "SANTE10") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            placeholder="Code promo"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={isValidating}
            className={couponCode === "SANTE10" && discount > 0 ? "pr-10 border-green-500" : ""}
          />
          {couponCode === "SANTE10" && discount > 0 && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
        <Button 
          variant={couponCode === "SANTE10" && discount > 0 ? "outline" : "outline"} 
          onClick={handleApplyCoupon}
          disabled={isValidating || !couponCode.trim()}
          className={couponCode === "SANTE10" && discount > 0 ? "border-green-500 text-green-600" : ""}
        >
          {isValidating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Vérification...
            </>
          ) : couponCode === "SANTE10" && discount > 0 ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Appliqué
            </>
          ) : (
            <>
              <Tag className="mr-2 h-4 w-4" />
              Appliquer
            </>
          )}
        </Button>
      </div>
      
      {showSuccess && couponCode === "SANTE10" && discount > 0 && (
        <Alert variant="success" className="bg-green-50 text-green-700 border-green-200">
          <AlertDescription className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Code <strong>SANTE10</strong> appliqué ! Vous économisez {discount.toFixed(0)} F CFA
          </AlertDescription>
        </Alert>
      )}
      
      {couponCode && couponCode !== "SANTE10" && (
        <div className="text-xs text-gray-500">
          Utilisez le code <span className="font-medium">SANTE10</span> pour obtenir 10% de réduction.
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;
