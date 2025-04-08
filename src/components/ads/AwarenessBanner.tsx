
import React, { useEffect, useState } from 'react';
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
  message = "CMU, NOTRE ASSURANCE SANTÉ EN CÔTE D'IVOIRE - SE FAIRE ENRÔLER" 
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const messageLength = message.length;
  
  useEffect(() => {
    const scrollSpeed = 50; // Lower is faster
    const animationFrame = setInterval(() => {
      setScrollPosition((prevPosition) => {
        // Reset position when text has scrolled completely
        if (prevPosition <= -messageLength) {
          return window.innerWidth;
        }
        return prevPosition - 1;
      });
    }, scrollSpeed);
    
    return () => clearInterval(animationFrame);
  }, [messageLength]);
  
  return (
    <div className={cn(
      'text-white p-3 rounded-lg shadow-md overflow-hidden',
      variant === 'info' ? 'bg-health-blue/90' : 'bg-amber-600/90',
      className
    )}>
      <div className="flex items-center relative whitespace-nowrap">
        {variant === 'info' ? (
          <Info className="h-5 w-5 mr-3 flex-shrink-0" />
        ) : (
          <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
        )}
        <div className="overflow-hidden w-full">
          <p 
            className="text-sm md:text-base whitespace-nowrap"
            style={{ 
              transform: `translateX(${scrollPosition}px)`,
              display: 'inline-block',
              minWidth: '100%',
              paddingRight: '50px' // Space after text before it repeats
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AwarenessBanner;
