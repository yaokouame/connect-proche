
import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AwarenessBannerProps {
  className?: string;
  variant?: 'info' | 'warning';
  message?: string;
}

const AwarenessBanner: React.FC<AwarenessBannerProps> = ({ 
  className = "", 
  variant = 'info',
  message = "Lavez-vous régulièrement les mains pour prévenir la propagation des maladies" 
}) => {
  return (
    <div className={cn(
      'text-white p-3 rounded-lg shadow-md',
      variant === 'info' ? 'bg-health-blue/90' : 'bg-amber-600/90',
      className
    )}>
      <div className="flex items-center">
        {variant === 'info' ? (
          <Info className="h-5 w-5 mr-3 flex-shrink-0" />
        ) : (
          <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
        )}
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};

export default AwarenessBanner;
