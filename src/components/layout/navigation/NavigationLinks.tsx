
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Home, 
  Calendar, 
  Map, 
  Pill, 
  Store, 
  Users, 
  Info,
  MessageSquare
} from "lucide-react";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface NavigationLinksProps {
  className?: string;
  onItemClick?: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ 
  className = "",
  onItemClick 
}) => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems: NavItem[] = [
    { 
      name: t('nav.home'), 
      path: '/', 
      icon: <Home className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.appointments'), 
      path: '/appointments', 
      icon: <Calendar className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.medications'), 
      path: '/medications', 
      icon: <Pill className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.map'), 
      path: '/map', 
      icon: <Map className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.products'), 
      path: '/products', 
      icon: <Store className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.findProfessional'), 
      path: '/professionals', 
      icon: <Users className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.chat'), 
      path: '/chat', 
      icon: <MessageSquare className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.wellness'), 
      path: '/wellness', 
      icon: <Info className="w-5 h-5 mr-2" /> 
    },
    { 
      name: t('nav.tutorials'), 
      path: '/tutorials', 
      icon: <Info className="w-5 h-5 mr-2" /> 
    }
  ];

  return (
    <div className={className}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center ${
            location.pathname === item.path
              ? "text-health-blue bg-blue-50"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={onItemClick}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavigationLinks;
