
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface PromoCodeInputProps {
  couponCode: string;
  setCouponCode: (value: string) => void;
  applyCoupon: () => void;
  isValidating?: boolean;
}

const PromoCodeInput = ({
  couponCode,
  setCouponCode,
  applyCoupon,
  isValidating = false
}: PromoCodeInputProps) => {
  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Code promo"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        disabled={isValidating}
      />
      <Button 
        variant="outline" 
        onClick={applyCoupon}
        disabled={isValidating || !couponCode.trim()}
      >
        {isValidating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Vérification...
          </>
        ) : (
          "Appliquer"
        )}
      </Button>
    </div>
  );
};

export default PromoCodeInput;
