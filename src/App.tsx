
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import Products from "./pages/Products";
import Appointments from "./pages/Appointments";
import Chat from "./pages/Chat";
import MedicalTutorials from "./pages/MedicalTutorials";
import HealthTracker from "./pages/HealthTracker";
import Wellness from "./pages/Wellness";
import Reviews from "./pages/Reviews";
import Medications from "./pages/Medications";
import Professionals from "./pages/Professionals";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance for each app render to prevent sharing between renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/map" element={<Map />} />
                <Route path="/products" element={<Products />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/tutorials" element={<MedicalTutorials />} />
                <Route path="/health-tracker" element={<HealthTracker />} />
                <Route path="/wellness" element={<Wellness />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/medications" element={<Medications />} />
                <Route path="/professionals" element={<Professionals />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
