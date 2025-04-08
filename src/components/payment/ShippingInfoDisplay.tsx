
import React from "react";

interface ShippingInfoDisplayProps {
  shippingInfo: {
    fullName: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };
}

const ShippingInfoDisplay = ({ shippingInfo }: ShippingInfoDisplayProps) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium mb-2">Adresse de livraison</h3>
      <p>{shippingInfo.fullName}</p>
      <p>{shippingInfo.streetAddress}</p>
      <p>{shippingInfo.postalCode} {shippingInfo.city}</p>
      <p>{shippingInfo.country}</p>
      <p className="text-gray-500 mt-2">{shippingInfo.phone}</p>
    </div>
  );
};

export default ShippingInfoDisplay;
