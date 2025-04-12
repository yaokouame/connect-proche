
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
import LanguageSelector from "@/components/LanguageSelector";
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

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavigationLogo />

          <div className="hidden lg:flex items-center space-x-1">
            {/* Desktop menu will be shown automatically by NavigationLinks */}
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
      />
      
      <div className="h-12 sm:h-16"></div>
    </>
  );
};

export default Navigation;
