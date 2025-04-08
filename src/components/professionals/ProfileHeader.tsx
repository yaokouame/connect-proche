
import React from "react";
import { Professional } from "@/types/user";
import { CheckCircle } from "lucide-react";

interface ProfileHeaderProps {
  professional: Professional;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ professional }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 mx-auto md:mx-0">
        <img
          src={professional.profileImage}
          alt={professional.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold flex items-center">
              {professional.name}
              {professional.verified && (
                <CheckCircle className="h-4 w-4 text-blue-500 ml-2" />
              )}
            </h3>
            <p className="text-gray-600">{professional.specialty}</p>
          </div>
          
          <div className="flex items-center mt-2 md:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-yellow-500 mr-1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-medium">{professional.rating}</span>
            <span className="text-gray-500 text-sm ml-1">
              ({professional.reviewCount} avis)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
