
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const AuthButtons: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <Link to="/login">
        <Button variant="ghost" size="sm" className="text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2">
          {t('nav.login')}
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm" className="bg-health-blue hover:bg-health-blue/90 text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2">
          {t('nav.register')}
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
