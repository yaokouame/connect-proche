
import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Home, 
  Calendar, 
  Map, 
  Pill, 
  Store, 
  Users, 
  Info,
  MessageSquare,
  BookOpen,
  Heart
} from "lucide-react";
import NavigationMenuGroup from "./NavigationMenuGroup";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface NavigationLinksProps {
  className?: string;
  onItemClick?: () => void;
  isMobile?: boolean;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ 
  className = "",
  onItemClick,
  isMobile = false
}) => {
  const { t } = useLanguage();
  const location = useLocation();

  // Organize items by group
  const menuGroups = {
    main: [
      { 
        name: t('nav.home'), 
        path: '/', 
        icon: <Home className="w-5 h-5" /> 
      }
    ],
    healthcare: [
      { 
        name: t('nav.appointments'), 
        path: '/appointments', 
        icon: <Calendar className="w-5 h-5" /> 
      },
      { 
        name: t('nav.medications'), 
        path: '/medications', 
        icon: <Pill className="w-5 h-5" /> 
      },
      { 
        name: t('nav.findProfessional'), 
        path: '/professionals', 
        icon: <Users className="w-5 h-5" /> 
      }
    ],
    services: [
      { 
        name: t('nav.map'), 
        path: '/map', 
        icon: <Map className="w-5 h-5" /> 
      },
      { 
        name: t('nav.products'), 
        path: '/products', 
        icon: <Store className="w-5 h-5" /> 
      },
      { 
        name: t('nav.chat'), 
        path: '/chat', 
        icon: <MessageSquare className="w-5 h-5" /> 
      }
    ],
    resources: [
      { 
        name: t('nav.wellness'), 
        path: '/wellness', 
        icon: <Heart className="w-5 h-5" /> 
      },
      { 
        name: t('nav.tutorials'), 
        path: '/medical-tutorials', 
        icon: <BookOpen className="w-5 h-5" /> 
      }
    ]
  };

  return (
    <div className={className}>
      <NavigationMenuGroup 
        title={t('nav.main')} 
        items={menuGroups.main} 
        onItemClick={onItemClick}
        isMobile={isMobile}
      />
      <NavigationMenuGroup 
        title={t('nav.healthcare')} 
        items={menuGroups.healthcare} 
        onItemClick={onItemClick}
        isMobile={isMobile}
      />
      <NavigationMenuGroup 
        title={t('nav.services')} 
        items={menuGroups.services} 
        onItemClick={onItemClick}
        isMobile={isMobile}
      />
      <NavigationMenuGroup 
        title={t('nav.resources')} 
        items={menuGroups.resources} 
        onItemClick={onItemClick}
        isMobile={isMobile}
      />
    </div>
  );
};

export default NavigationLinks;
