
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisitorCounterProps {
  className?: string;
  variant?: 'map' | 'home';
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ 
  className = "",
  variant = 'map'
}) => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  
  useEffect(() => {
    // Get the appropriate key based on variant
    const storageKey = variant === 'map' ? 'map_visitor_count' : 'home_visitor_count';
    
    // Load visitor count from localStorage
    const storedCount = localStorage.getItem(storageKey);
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Increment count for this visit
    const newCount = initialCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem(storageKey, newCount.toString());
    
    // In a real application, you would make an API call to record the visit
    // and get the actual count from the server
  }, [variant]);
  
  return (
    <div className={cn(
      variant === 'home' 
        ? 'bg-white/90 border border-health-blue/20 rounded-lg p-3 shadow-md flex items-center'
        : 'bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex items-center',
      className
    )}>
      <Users className={cn(
        "mr-2", 
        variant === 'home' ? "h-5 w-5 text-health-teal" : "h-4 w-4 text-health-blue"
      )} />
      <div className={cn(
        variant === 'home' ? "text-sm text-gray-800" : "text-xs text-gray-600"
      )}>
        <span className={cn(
          "font-semibold",
          variant === 'home' ? "text-health-teal" : "text-health-blue"
        )}>
          {visitorCount.toLocaleString()}
        </span> {variant === 'home' ? 'personnes ont visité ce site' : 'visiteurs'}
      </div>
    </div>
  );
};

export default VisitorCounter;
