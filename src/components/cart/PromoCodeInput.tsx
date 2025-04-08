
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PromoCodeInputProps {
  couponCode: string;
  setCouponCode: (value: string) => void;
  applyCoupon: () => void;
}

const PromoCodeInput = ({
  couponCode,
  setCouponCode,
  applyCoupon
}: PromoCodeInputProps) => {
  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Code promo"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <Button variant="outline" onClick={applyCoupon}>Appliquer</Button>
    </div>
  );
};

export default PromoCodeInput;
