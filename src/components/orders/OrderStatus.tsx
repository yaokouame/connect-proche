
import React from "react";
import { CheckCircle, Truck, Package, Home, Clock, ExternalLink } from "lucide-react";

type OrderStatusType = "confirmed" | "processing" | "shipped" | "delivered" | "delayed";

interface OrderStatusProps {
  currentStatus: OrderStatusType;
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
}

const OrderStatus = ({ 
  currentStatus, 
  estimatedDelivery, 
  trackingNumber, 
  trackingUrl,
  carrier 
}: OrderStatusProps) => {
  const statuses = [
    { id: "confirmed", label: "Confirmée", icon: CheckCircle, color: "green" },
    { id: "processing", label: "En préparation", icon: Package, color: "blue" },
    { id: "shipped", label: "Expédiée", icon: Truck, color: "orange" },
    { id: "delivered", label: "Livrée", icon: Home, color: "purple" },
  ];
  
  // If the status is delayed, we'll change the shipped step to show a clock icon instead
  const displayStatuses = statuses.map(status => {
    if (currentStatus === "delayed" && status.id === "shipped") {
      return { ...status, label: "En transit (retardée)", icon: Clock, color: "amber" };
    }
    return status;
  });
  
  const getStatusIndex = (status: OrderStatusType) => {
    if (status === "delayed") return 2; // Same position as shipped
    return displayStatuses.findIndex(s => s.id === status);
  };
  
  const currentIndex = getStatusIndex(currentStatus);
  
  // Get the default tracking URL if none is provided
  const getTrackingUrl = () => {
    if (trackingUrl) return trackingUrl;
    
    if (carrier && trackingNumber) {
      // Standard tracking URLs for common carriers
      switch(carrier.toLowerCase()) {
        case "dhl":
          return `https://www.dhl.com/tracking/shipments?tracking-id=${trackingNumber}`;
        case "ups":
          return `https://www.ups.com/track?tracknum=${trackingNumber}`;
        case "fedex":
          return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
        default:
          return `https://tracking.example.com?number=${trackingNumber}`;
      }
    }
    
    return trackingNumber ? `https://tracking.example.com?number=${trackingNumber}` : "#";
  };
  
  return (
    <div className="py-4">
      <div className="flex justify-between">
        {displayStatuses.map((status, index) => {
          const isActive = index <= currentIndex;
          const isCurrentStep = index === currentIndex;
          const StatusIcon = status.icon;
          
          return (
            <div key={status.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive 
                  ? (currentStatus === "delayed" && index === currentIndex)
                    ? "bg-amber-100 text-amber-600" 
                    : `bg-${status.color}-100 text-${status.color}-600`
                  : "bg-gray-100 text-gray-400"
              }`}>
                <StatusIcon className={`h-5 w-5 ${isCurrentStep ? "animate-pulse" : ""}`} />
              </div>
              <p className={`mt-2 text-xs sm:text-sm ${
                isActive 
                  ? (currentStatus === "delayed" && index === currentIndex)
                    ? "font-medium text-amber-600" 
                    : `font-medium text-${status.color}-600`
                  : "text-gray-400"
              }`}>
                {status.label}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="relative mt-2 mb-4">
        <div className="absolute top-0 h-1 w-full bg-gray-200 rounded-full">
          <div 
            className={`absolute top-0 h-1 rounded-full ${
              currentStatus === "delayed" ? "bg-amber-500" : "bg-green-500"
            }`}
            style={{ 
              width: `${currentIndex === 0 ? 0 : currentIndex === displayStatuses.length - 1 
                ? 100 : (currentIndex / (displayStatuses.length - 1)) * 100}%` 
            }}
          />
        </div>
      </div>
      
      <div className="mt-6 space-y-2 text-sm">
        {estimatedDelivery && (
          <div className="flex justify-between items-center px-3 py-2 bg-blue-50 rounded-md">
            <span className="font-medium">Livraison estimée:</span>
            <span>{estimatedDelivery}</span>
          </div>
        )}
        
        {trackingNumber && (
          <div className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-md">
            <span className="font-medium">Numéro de suivi:</span>
            <span className="font-mono">{trackingNumber}</span>
          </div>
        )}
        
        {carrier && (
          <div className="flex justify-between items-center px-3 py-2 bg-purple-50 rounded-md">
            <span className="font-medium">Transporteur:</span>
            <span>{carrier}</span>
          </div>
        )}
        
        {(currentStatus === "shipped" || currentStatus === "delayed") && trackingNumber && (
          <div className="flex justify-center mt-3">
            <a 
              href={getTrackingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm flex items-center bg-blue-50 px-4 py-2 rounded-md"
            >
              <Truck className="h-4 w-4 mr-2" />
              Suivre votre colis
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        )}
      </div>
      
      {currentStatus === "processing" && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md text-blue-700 text-sm">
          <p className="flex items-start">
            <Package className="h-4 w-4 mr-2 mt-0.5" />
            <span>Votre commande est en cours de préparation dans notre entrepôt. Elle sera expédiée prochainement.</span>
          </p>
        </div>
      )}
      
      {currentStatus === "delayed" && (
        <div className="mt-4 p-3 bg-amber-50 rounded-md text-amber-700 text-sm">
          <p className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5" />
            <span>Votre commande connaît un léger retard. Notre service client vous contactera si le délai se prolonge.</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
