
import React from "react";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";
import EmergencyButton from "./emergency/EmergencyButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation header */}
      <Navigation />

      {/* Main content */}
      <main className="flex-1 w-full mx-auto py-6 sm:py-8 px-4 sm:px-6 max-w-7xl">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {children}
        </div>
      </main>
      
      {/* Emergency SOS Button */}
      <EmergencyButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
