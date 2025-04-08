
import React from "react";
import { Professional } from "@/types/user";
import { MapPin, Clock } from "lucide-react";

interface ExperienceInfoProps {
  professional: Professional;
}

const ExperienceInfo: React.FC<ExperienceInfoProps> = ({ professional }) => {
  return (
    <div className="space-y-1 mt-3">
      <div className="flex items-center text-sm">
        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
        <span>{professional.location}</span>
      </div>
      <div className="flex items-center text-sm">
        <Clock className="h-4 w-4 text-gray-500 mr-2" />
        <span>{professional.experience} ans d'expérience</span>
      </div>
    </div>
  );
};

export default ExperienceInfo;
