
import React from 'react';

interface MapLoadingProps {
  className?: string;
}

const MapLoading: React.FC<MapLoadingProps> = ({ className = "" }) => {
  return (
    <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
      <div className="text-center p-4">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading map...</p>
      </div>
    </div>
  );
};

export default MapLoading;
