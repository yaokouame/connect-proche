
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = "" }) => {
  return (
    <div className={`bg-gradient-to-r from-health-teal/80 to-health-blue/80 text-white p-3 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm md:text-base">ConnectProche Premium</h3>
          <p className="text-xs md:text-sm mt-1">Accès illimité aux professionnels de santé</p>
        </div>
        <a 
          href="/premium" 
          className="bg-white text-health-blue text-xs font-medium px-3 py-1 rounded flex items-center hover:bg-gray-100 transition-colors"
        >
          Essayer <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default AdBanner;
