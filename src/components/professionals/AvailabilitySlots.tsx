
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AvailabilitySlotsProps {
  availableSlots?: string[];
}

const AvailabilitySlots: React.FC<AvailabilitySlotsProps> = ({ availableSlots }) => {
  const { t } = useLanguage();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  if (!availableSlots || availableSlots.length === 0) return null;
  
  const handleSlotClick = (slot: string) => {
    setSelectedSlot(selectedSlot === slot ? null : slot);
    // Store the selected slot in localStorage to be used in appointment creation
    if (selectedSlot === slot) {
      localStorage.removeItem('selectedTimeSlot');
    } else {
      localStorage.setItem('selectedTimeSlot', slot);
    }
  };
  
  return (
    <div className="pt-2">
      <p className="text-sm text-gray-500 mb-2">Prochaines disponibilités:</p>
      <div className="flex flex-wrap gap-2">
        {availableSlots.map((slot, idx) => (
          <button
            key={idx}
            onClick={() => handleSlotClick(slot)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              selectedSlot === slot 
                ? "bg-blue-600 text-white" 
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailabilitySlots;
