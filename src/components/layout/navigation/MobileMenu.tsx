
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import NavigationLinks from "./NavigationLinks";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: {
    name: string;
    email?: string;
    profileImageUrl?: string;
  } | null;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  currentUser, 
  onLogout 
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
    onClose();
  };

  const handlePremiumClick = () => {
    navigate('/premium');
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 max-w-[85vw] sm:max-w-[350px]">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-semibold">ConnectProche</span>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto py-2 sm:py-4 px-2">
            <NavigationLinks 
              onItemClick={onClose}
              isMobile={true}
            />
          </div>
          
          <div className="p-4 border-t mt-auto">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2">
                  <Avatar>
                    <AvatarImage src={currentUser.profileImageUrl || ''} alt={currentUser.name} />
                    <AvatarFallback className="bg-health-blue text-white">
                      {currentUser.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{currentUser.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{currentUser.email}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={handleProfileClick}
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('profile.myProfile')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={handlePremiumClick}
                >
                  <Badge variant="outline" className="mr-2 bg-health-teal/10 text-health-teal border-health-teal/30">PRO</Badge>
                  Premium
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <AuthButtons />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
