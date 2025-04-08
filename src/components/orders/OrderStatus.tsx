
import React from "react";
import { CheckCircle, Truck, Package, Home } from "lucide-react";

type OrderStatusType = "confirmed" | "processing" | "shipped" | "delivered";

interface OrderStatusProps {
  currentStatus: OrderStatusType;
}

const OrderStatus = ({ currentStatus }: OrderStatusProps) => {
  const statuses = [
    { id: "confirmed", label: "Confirmée", icon: CheckCircle },
    { id: "processing", label: "En préparation", icon: Package },
    { id: "shipped", label: "Expédiée", icon: Truck },
    { id: "delivered", label: "Livrée", icon: Home },
  ];
  
  const getStatusIndex = (status: OrderStatusType) => {
    return statuses.findIndex(s => s.id === status);
  };
  
  const currentIndex = getStatusIndex(currentStatus);
  
  return (
    <div className="py-4">
      <div className="flex justify-between">
        {statuses.map((status, index) => {
          const isActive = index <= currentIndex;
          const StatusIcon = status.icon;
          
          return (
            <div key={status.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
              }`}>
                <StatusIcon className="h-5 w-5" />
              </div>
              <p className={`mt-2 text-sm ${
                isActive ? "font-medium text-green-600" : "text-gray-400"
              }`}>
                {status.label}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="relative mt-2">
        <div className="absolute top-0 h-0.5 w-full bg-gray-200">
          <div 
            className="absolute top-0 h-0.5 bg-green-500" 
            style={{ 
              width: `${currentIndex === 0 ? 0 : currentIndex === statuses.length - 1 
                ? 100 : (currentIndex / (statuses.length - 1)) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
