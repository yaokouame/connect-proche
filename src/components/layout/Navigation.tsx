import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ShoppingCart, 
  Bell, 
  User, 
  Menu, 
  X, 
  LogOut,
  Home,
  Calendar,
  Map,
  Pill,
  Store,
  Users,
  Info,
  ChevronDown,
  MessageSquare
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import LanguageSelector from "@/components/LanguageSelector";

const Navigation = () => {
  const { currentUser, logout } = useUser();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const navItems = [
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getCartItems = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cart.length || 0);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItemCount(0);
      }
    };

    getCartItems();
    
    window.addEventListener('storage', getCartItems);
    window.addEventListener('cartUpdated', getCartItems);
    
    return () => {
      window.removeEventListener('storage', getCartItems);
      window.removeEventListener('cartUpdated', getCartItems);
    };
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
          <Link to="/" className="flex items-center">
            <span className="text-xl sm:text-2xl font-semibold text-health-blue">
              ConnectProche
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center ${
                  location.pathname === item.path
                    ? 'text-health-blue bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <LanguageSelector />
            
            <Link to="/cart" className="relative p-1 sm:p-2">
              <ShoppingCart className={`w-4 h-4 sm:w-5 sm:h-5 ${location.pathname === '/cart' ? 'text-health-blue' : 'text-gray-700'}`} />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1 py-0.5 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center bg-health-teal text-[8px] sm:text-[10px]">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              <Badge className="absolute -top-1 -right-1 px-1 py-0.5 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center bg-health-teal text-[8px] sm:text-[10px]">
                3
              </Badge>
            </Button>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 p-1">
                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                      <AvatarImage src={currentUser.profileImageUrl || ''} alt={currentUser.name} />
                      <AvatarFallback className="bg-health-blue text-white text-xs sm:text-sm">
                        {currentUser.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-xs sm:text-sm font-medium">{currentUser.name}</span>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 sm:w-56">
                  <DropdownMenuLabel>{t('profile.greeting', { name: currentUser.name })}</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    {t('profile.myProfile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/premium')}>
                    <Badge variant="outline" className="mr-2 bg-health-teal/10 text-health-teal border-health-teal/30">PRO</Badge>
                    Premium
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="p-0 max-w-[85vw] sm:max-w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-semibold">ConnectProche</span>
                      <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-auto py-2 sm:py-4">
                    <div className="space-y-1 px-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-md ${
                            location.pathname === item.path
                              ? 'bg-blue-50 text-health-blue'
                              : 'text-gray-900 hover:bg-gray-100'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    </div>
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
                          onClick={() => {
                            navigate('/profile');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          {t('profile.myProfile')}
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            navigate('/premium');
                            setIsMobileMenuOpen(false);
                          }}
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
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full text-xs sm:text-sm">
                            {t('nav.login')}
                          </Button>
                        </Link>
                        <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full bg-health-blue hover:bg-health-blue/90 text-xs sm:text-sm">
                            {t('nav.register')}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      
      <div className="h-12 sm:h-16"></div>
    </>
  );
};

export default Navigation;
