
import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";
import EmergencyButton from "./emergency/EmergencyButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Pages qui ne devraient pas avoir de navigation ou de footer
  const fullscreenPages = [
    "/login",
    "/register",
  ];
  
  const isFullscreenPage = fullscreenPages.includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isFullscreenPage && <Navigation />}
      
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <div className="mx-auto">
          {children}
        </div>
      </main>
      
      {!isFullscreenPage && <EmergencyButton />}
      {!isFullscreenPage && <Footer />}
    </div>
  );
};

export default Layout;
