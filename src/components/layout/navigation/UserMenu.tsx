
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, LogOut, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  user: {
    name: string;
    email?: string;
    profileImageUrl?: string;
  };
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 p-1">
          <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
            <AvatarImage src={user.profileImageUrl || ''} alt={user.name} />
            <AvatarFallback className="bg-health-blue text-white text-xs sm:text-sm">
              {user.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-xs sm:text-sm font-medium">{user.name}</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 sm:w-56">
        <DropdownMenuLabel>{t('profile.greeting', { name: user.name })}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="w-4 h-4 mr-2" />
          {t('profile.myProfile')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/premium')}>
          <Badge variant="outline" className="mr-2 bg-health-teal/10 text-health-teal border-health-teal/30">PRO</Badge>
          Premium
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
