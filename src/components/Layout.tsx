
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
  MessageCircle
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    {
      label: "Accueil",
      path: "/",
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      label: "Profil",
      path: "/profile",
      icon: <User className="h-5 w-5 mr-2" />,
      requiresAuth: true,
    },
    {
      label: "Rendez-vous",
      path: "/appointments",
      icon: <CalendarClock className="h-5 w-5 mr-2" />,
      requiresAuth: true,
    },
    {
      label: "Messagerie",
      path: "/chat",
      icon: <MessageCircle className="h-5 w-5 mr-2" />,
      requiresAuth: true,
    },
    {
      label: "Carte",
      path: "/map",
      icon: <Map className="h-5 w-5 mr-2" />,
    },
    {
      label: "Produits",
      path: "/products",
      icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation header */}
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
            {currentUser ? (
              <Button 
                variant="ghost" 
                className="flex items-center text-gray-600 hover:text-health-teal"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button>Inscription</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <h2 className="text-lg font-semibold text-health-blue">ConnectProche</h2>
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
                        Déconnexion
                      </Button>
                    </SheetClose>
                  ) : (
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Link to="/login">
                          <Button variant="outline" className="w-full">Connexion</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/register">
                          <Button className="w-full">Inscription</Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-health-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ConnectProche</h3>
              <p className="text-gray-300">
                Votre plateforme de santé connectée pour prendre soin de vous et de vos proches.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="text-gray-300 hover:text-white">
                    Trouver un professionnel
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-white">
                    Pharmacie en ligne
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-gray-300">
                <p>12 rue de la Santé</p>
                <p>75001 Paris, France</p>
                <p className="mt-2">contact@connectproche.fr</p>
                <p>+33 1 23 45 67 89</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} ConnectProche. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
