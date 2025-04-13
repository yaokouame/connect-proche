
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationLogo from "./navigation/NavigationLogo";
import CartButton from "./navigation/CartButton";
import NotificationButton from "./navigation/NotificationButton";
import UserMenu from "./navigation/UserMenu";
import AuthButtons from "./navigation/AuthButtons";
import MobileMenu from "./navigation/MobileMenu";
import LanguageSelector from "./navigation/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const { currentUser, logout } = useUser();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
  }`;

  // Main navigation items for horizontal display
  const mainNavItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.appointments'), path: '/appointments' },
    { name: t('nav.medications'), path: '/medications' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.map'), path: '/map' },
    { name: t('nav.findProfessional'), path: '/professionals' },
  ];

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <NavigationLogo />
            
            <div className="hidden lg:flex items-center ml-6">
              <ul className="flex space-x-1">
                {mainNavItems.map((item) => (
                  <li key={item.path}>
                    <Button
                      variant="ghost"
                      className={`px-3 py-2 text-sm font-medium ${
                        location.pathname === item.path
                          ? 'text-health-blue bg-blue-50'
                          : 'text-gray-700 hover:text-health-blue hover:bg-blue-50/50'
                      }`}
                      onClick={() => navigate(item.path)}
                    >
                      {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <LanguageSelector />
            
            <CartButton />
            
            <NotificationButton />

            {currentUser ? (
              <UserMenu 
                user={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <AuthButtons />
            )}

            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        navItems={mainNavItems}
      />
      
      <div className="h-16 sm:h-16"></div>
    </>
  );
};

export default Navigation;
