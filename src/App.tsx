
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Products from "@/pages/Products";
import Map from "@/pages/Map";
import Professionals from "@/pages/Professionals";
import Appointments from "@/pages/Appointments";
import Chat from "@/pages/Chat";
import Reviews from "@/pages/Reviews";
import Medications from "@/pages/Medications";
import HealthTracker from "@/pages/HealthTracker";
import MedicalTutorials from "@/pages/MedicalTutorials";
import Wellness from "@/pages/Wellness";
import Cart from "@/pages/Cart";
import Payment from "@/pages/Payment";
import OrderConfirmation from "@/pages/OrderConfirmation";
import Premium from "@/pages/Premium";
import Admin from "@/pages/Admin";

import { UserProvider } from "@/contexts/UserContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/map" element={<Map />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/health-tracker" element={<HealthTracker />} />
            <Route path="/medical-tutorials" element={<MedicalTutorials />} />
            <Route path="/tutorials" element={<Navigate to="/medical-tutorials" />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
