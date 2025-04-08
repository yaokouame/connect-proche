
import React from "react";
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
import Admin from "@/pages/Admin";
import Chat from "@/pages/Chat";
import Cart from "@/pages/Cart";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import CheckoutCancel from "@/pages/CheckoutCancel";

// Import providers
import { UserProvider } from "@/contexts/UserContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

import VoiceGuidance from "./components/voice/VoiceGuidance";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/products" element={<Products />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/cancel" element={<CheckoutCancel />} />
            </Routes>
            <VoiceGuidance />
            <Toaster />
          </BrowserRouter>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
