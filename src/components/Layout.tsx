
import React from "react";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";
import EmergencyButton from "./emergency/EmergencyButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation header */}
      <Navigation />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Emergency SOS Button */}
      <EmergencyButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
