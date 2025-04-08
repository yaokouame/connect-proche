
import React from "react";
import { CheckCircle, Truck, Package, Home, Clock } from "lucide-react";

type OrderStatusType = "confirmed" | "processing" | "shipped" | "delivered" | "delayed";

interface OrderStatusProps {
  currentStatus: OrderStatusType;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

const OrderStatus = ({ currentStatus, estimatedDelivery, trackingNumber }: OrderStatusProps) => {
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
  
  return (
    <div className="py-4">
      <div className="flex justify-between">
        {displayStatuses.map((status, index) => {
          const isActive = index <= currentIndex;
          const isCurrentStep = index === currentIndex;
          const StatusIcon = status.icon;
          const statusColor = isActive 
            ? (currentStatus === "delayed" && index === currentIndex) 
              ? "text-amber-600 bg-amber-100" 
              : `text-${status.color}-600 bg-${status.color}-100`
            : "text-gray-400 bg-gray-100";
          
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
              <p className={`mt-2 text-sm ${
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
        <div className="absolute top-0 h-0.5 w-full bg-gray-200">
          <div 
            className={`absolute top-0 h-0.5 ${
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
          <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded-md">
            <span className="font-medium">Livraison estimée:</span>
            <span>{estimatedDelivery}</span>
          </div>
        )}
        
        {trackingNumber && (
          <div className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded-md">
            <span className="font-medium">Numéro de suivi:</span>
            <span className="font-mono">{trackingNumber}</span>
          </div>
        )}
        
        {currentStatus === "shipped" && (
          <div className="flex justify-center mt-2">
            <a 
              href={trackingNumber ? `https://tracking.example.com?number=${trackingNumber}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              <Truck className="h-4 w-4 mr-1" />
              Suivre votre colis
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
