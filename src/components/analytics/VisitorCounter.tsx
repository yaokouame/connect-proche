
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ className = "" }) => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  
  useEffect(() => {
    // Simulate loading visitor count from localStorage
    const storedCount = localStorage.getItem('map_visitor_count');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Increment count for this visit
    const newCount = initialCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem('map_visitor_count', newCount.toString());
    
    // In a real application, you would make an API call to record the visit
    // and get the actual count from the server
  }, []);
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex items-center ${className}`}>
      <Users className="h-4 w-4 text-health-blue mr-2" />
      <div className="text-xs text-gray-600">
        <span className="font-semibold text-health-blue">{visitorCount}</span> visiteurs
      </div>
    </div>
  );
};

export default VisitorCounter;
