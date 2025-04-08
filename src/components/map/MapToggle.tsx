
import React from 'react';
import { Button } from "@/components/ui/button";
import { Map as MapIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface MapToggleProps {
  showMap: boolean;
  setShowMap: (show: boolean) => void;
}

const MapToggle = ({ showMap, setShowMap }: MapToggleProps) => {
  const { t } = useLanguage();
  
  if (showMap) return null;
  
  return (
    <div className="mt-12 text-center">
      <Button 
        onClick={() => setShowMap(true)}
        className="flex items-center mx-auto"
      >
        <MapIcon className="h-4 w-4 mr-2" />
        {t('map.showMap')}
      </Button>
    </div>
  );
};

export default MapToggle;
