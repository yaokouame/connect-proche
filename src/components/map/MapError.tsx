
import React from 'react';

interface MapErrorProps {
  error: string;
  className?: string;
}

const MapError: React.FC<MapErrorProps> = ({ error, className = "" }) => {
  return (
    <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
        <p className="text-sm mt-2">Please check your internet connection or try again later.</p>
      </div>
    </div>
  );
};

export default MapError;
