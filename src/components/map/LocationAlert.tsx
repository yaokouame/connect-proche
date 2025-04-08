
import React from 'react';
import { Info } from 'lucide-react';

const LocationAlert: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 right-4 bg-white p-3 rounded-md shadow-md flex items-start">
      <Info className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm">
        Location services are disabled. Enable location for better results.
      </p>
    </div>
  );
};

export default LocationAlert;
