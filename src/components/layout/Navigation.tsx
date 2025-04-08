
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
  BookOpen
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

const Navigation: React.FC = () => {
  const { currentUser, logout } = useUser();
  const location = useLocation();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
  };

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
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-health-blue">ConnectProche</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            if (item.requiresAuth && !currentUser) return null;
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
          
          {/* Voice Search */}
          <GlobalVoiceSearch className="mx-4" placeholder={t("common.search")} />
          
          <LanguageSelector className="w-32" />
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
                <Button>{t("nav.register")}</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <GlobalVoiceSearch className="w-full max-w-[180px]" placeholder={t("common.search")} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <h2 className="text-lg font-semibold text-health-blue">ConnectProche</h2>
                  <div className="mt-2">
                    <LanguageSelector className="w-full" />
                  </div>
                </div>
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => {
                    if (item.requiresAuth && !currentUser) return null;
                    return (
                      <SheetClose asChild key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center p-2 rounded-md ${
                            location.pathname === item.path
                              ? "bg-health-teal/10 text-health-blue"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
                <div className="mt-auto pb-6">
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
                        <Link to="/login">
                          <Button variant="outline" className="w-full">{t("nav.login")}</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/register">
                          <Button className="w-full">{t("nav.register")}</Button>
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
