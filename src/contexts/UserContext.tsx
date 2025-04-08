
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, UserRole, PatientProfile, ProfessionalProfile } from "../types/user";
import { useToast } from "@/components/ui/use-toast";

interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>, password: string, role: UserRole) => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a saved user in localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      let user: User;
      
      if (email.includes("pro")) {
        user = {
          id: "pro-123",
          name: "Dr. Jean Michel",
          email,
          role: "professional",
          location: {
            city: "Abidjan",
            region: "Cocody",
            address: "Rue des Jardins 123"
          }
        } as ProfessionalProfile;
      } else {
        user = {
          id: "patient-456",
          name: "Marie Dupont",
          email,
          role: "patient",
          location: {
            city: "Abidjan",
            region: "Plateau",
            address: "Avenue de la République 45"
          }
        } as PatientProfile;
      }
      
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.name}!`,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: "Veuillez vérifier vos identifiants et réessayer.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Déconnexion réussie",
      description: "Vous êtes maintenant déconnecté.",
    });
  };

  const register = async (userData: Partial<User>, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Mock API call - in a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user
      const newUser: User = {
        id: `${role}-${Date.now()}`,
        name: userData.name || "",
        email: userData.email || "",
        role: role,
        location: userData.location,
        ...(role === "professional" && { 
          specialty: (userData as any).specialty,
          license: (userData as any).license
        }),
      };
      
      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès!",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, isLoading, login, logout, register, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
