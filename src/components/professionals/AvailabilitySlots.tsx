
import React from "react";

interface AvailabilitySlotsProps {
  availableSlots?: string[];
}

const AvailabilitySlots: React.FC<AvailabilitySlotsProps> = ({ availableSlots }) => {
  if (!availableSlots || availableSlots.length === 0) return null;
  
  return (
    <div className="pt-2">
      <p className="text-sm text-gray-500 mb-2">Prochaines disponibilités:</p>
      <div className="flex flex-wrap gap-2">
        {availableSlots.map((slot, idx) => (
          <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
            {slot}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AvailabilitySlots;
