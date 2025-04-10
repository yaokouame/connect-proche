
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { 
  Home, 
  User, 
  CalendarClock, 
  Map, 
  ShoppingBag, 
  LogOut, 
  Menu,
  MessageCircle,
  BookOpen,
  Settings,
  ShoppingCart
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import LanguageSelector from "../LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import GlobalVoiceSearch from "../voice/GlobalVoiceSearch";
import { useShoppingCart } from "@/hooks/useShoppingCart";

const Navigation: React.FC = () => {
  const { currentUser, logout } = useUser();
  const location = useLocation();
  const { t } = useLanguage();
  const { cartItemCount } = useShoppingCart();

  const handleLogout = () => {
    logout();
  };

  const isProfessional = currentUser?.role === "professional";

  const navItems = [
    {
      label: t("nav.home"),
      path: "/",
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      label: t("nav.profile"),
      path: "/profile",
      icon: <User className="h-5 w-5 mr-2" />,
      requiresAuth: true,
    },
    {
      label: t("nav.appointments"),
      path: "/appointments",
      icon: <CalendarClock className="h-5 w-5 mr-2" />,
      requiresAuth: true,
    },
    {
      label: t("nav.messaging"),
      path: "/chat",
      icon: <MessageCircle className="h-5 w-5 mr-2" />,
      requiresAuth: true,
    },
    {
      label: t("nav.map"),
      path: "/map",
      icon: <Map className="h-5 w-5 mr-2" />,
    },
    {
      label: t("nav.products"),
      path: "/products",
      icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    },
    {
      label: t("nav.tutorials"),
      path: "/tutorials",
      icon: <BookOpen className="h-5 w-5 mr-2" />,
    },
    {
      label: t("nav.admin"),
      path: "/admin",
      icon: <Settings className="h-5 w-5 mr-2" />,
      requiresAuth: true,
      requiresProfessional: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl md:text-2xl text-health-blue">ConnectProche</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => {
            if (item.requiresAuth && !currentUser) return null;
            if (item.requiresProfessional && !isProfessional) return null;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center text-sm font-medium transition-colors hover:text-health-teal ${
                  location.pathname === item.path
                    ? "text-health-blue"
                    : "text-gray-600"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Voice Search */}
          <GlobalVoiceSearch className="w-48" placeholder={t("common.search")} />
          
          <LanguageSelector className="w-32" />

          {/* Shopping Cart Button */}
          <Link to="/cart">
            <Button variant="outline" className="flex items-center text-gray-600 hover:text-health-teal relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              {t("nav.cart")}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-health-blue text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {currentUser ? (
            <Button 
              variant="ghost" 
              className="flex items-center text-gray-600 hover:text-health-teal"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {t("nav.logout")}
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">{t("nav.login")}</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">{t("nav.register")}</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Shopping Cart Icon for Mobile */}
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-health-blue text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          
          <GlobalVoiceSearch className="w-full max-w-[180px]" placeholder={t("common.search")} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <h2 className="text-xl font-semibold text-health-blue">ConnectProche</h2>
                  <div className="mt-4">
                    <LanguageSelector className="w-full" />
                  </div>
                </div>
                <nav className="flex flex-col space-y-1 mt-4 overflow-y-auto">
                  {navItems.map((item) => {
                    if (item.requiresAuth && !currentUser) return null;
                    if (item.requiresProfessional && !isProfessional) return null;
                    return (
                      <SheetClose asChild key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center p-3 rounded-md ${
                            location.pathname === item.path
                              ? "bg-health-blue/10 text-health-blue font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  
                  {/* Shopping Cart Link for Mobile Menu */}
                  <SheetClose asChild>
                    <Link 
                      to="/cart"
                      className="flex items-center p-3 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {t("nav.cart")} {cartItemCount > 0 && `(${cartItemCount})`}
                    </Link>
                  </SheetClose>
                </nav>
                <div className="mt-auto pb-6 pt-4 border-t">
                  {currentUser ? (
                    <SheetClose asChild>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        {t("nav.logout")}
                      </Button>
                    </SheetClose>
                  ) : (
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Link to="/login" className="w-full">
                          <Button variant="outline" className="w-full">{t("nav.login")}</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/register" className="w-full">
                          <Button variant="default" className="w-full">{t("nav.register")}</Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
