
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Appointments from "@/pages/Appointments";
import MapView from "@/pages/Map";
import Products from "@/pages/Products";
import Tutorials from "@/pages/Tutorials";
import MedicalTutorials from "@/pages/MedicalTutorials"; // Add this import
import Admin from "@/pages/Admin";
import Chat from "@/pages/Chat";
import HealthcareChat from "@/pages/HealthcareChat";
import Cart from "@/pages/Cart";
import Payment from "@/pages/Payment";
import OrderConfirmation from "@/pages/OrderConfirmation";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import CheckoutCancel from "@/pages/CheckoutCancel";
import Professionals from "@/pages/Professionals";
import Medications from "@/pages/Medications";
import Wellness from "@/pages/Wellness";
import Premium from "@/pages/Premium";

// Import providers
import { UserProvider } from "@/contexts/UserContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Import hooks
import { useSupabaseInit } from "@/hooks/useSupabaseInit";

import VoiceGuidance from "./components/voice/VoiceGuidance";
import { DatabaseConnectionAlert } from "./components/database/DatabaseConnectionAlert";

function AppContent() {
  // Initialize Supabase data
  const { isInitialized, isInitializing, error, retryInitialization } = useSupabaseInit();
  
  useEffect(() => {
    if (isInitialized) {
      console.log("Supabase initialized successfully");
    }
    if (error) {
      console.error("Supabase initialization error:", error);
    }
  }, [isInitialized, error]);
  
  return (
    <BrowserRouter>
      {/* Show database connection alert if there's an error */}
      <div className="container mx-auto px-4 py-2">
        <DatabaseConnectionAlert onRetry={retryInitialization} />
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/products" element={<Products />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/medical-tutorials" element={<MedicalTutorials />} /> {/* Add this route */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:professionalId" element={<HealthcareChat />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
      <VoiceGuidance />
      <Toaster />
    </BrowserRouter>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
