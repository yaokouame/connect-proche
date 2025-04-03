
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
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
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance for each app render to prevent sharing between renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
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
              <Route path="/reviews" element={<Reviews />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
