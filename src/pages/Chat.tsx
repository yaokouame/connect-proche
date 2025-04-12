
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import CallModal from "@/components/chat/CallModal";
import OnlineProfessionals from "@/components/chat/OnlineProfessionals";
import { useUser } from "@/contexts/UserContext";
import LoginPrompt from "@/components/profile/LoginPrompt";
import { Contact } from "@/types/chat";
import { ProfessionalProfile } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ChatPage = () => {
  const { currentUser } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);

  // Mock contacts data - in a real app, this would come from an API
  const mockContacts: Contact[] = [
    {
      id: "contact-1",
      name: "Dr. Sophie Martin",
      role: "professional",
      avatar: "",
      lastMessage: "Bonjour, comment puis-je vous aider aujourd'hui ?",
      lastMessageTime: "10:30",
      unreadCount: 2,
      isOnline: true,
      specialty: "Médecin généraliste"
    },
    {
      id: "contact-2",
      name: "Dr. Thomas Dubois",
      role: "professional",
      avatar: "",
      lastMessage: "Merci pour le rendez-vous d'hier.",
      lastMessageTime: "Hier",
      unreadCount: 0,
      isOnline: false,
      specialty: "Cardiologue"
    },
    {
      id: "contact-3",
      name: "Pharmacie Centrale",
      role: "professional",
      avatar: "",
      lastMessage: "Votre ordonnance est prête à être récupérée.",
      lastMessageTime: "Hier",
      unreadCount: 1,
      isOnline: true,
      specialty: "Pharmacie"
    }
  ];

  // Mock online professionals data - in a real app, this would come from an API
  const mockProfessionals: ProfessionalProfile[] = [
    {
      id: "prof-1",
      name: "Dr. Sophie Martin",
      email: "sophie.martin@example.com",
      role: "professional",
      specialty: "Médecin généraliste",
      verified: true,
      isOnline: true,
    },
    {
      id: "prof-2",
      name: "Dr. Thomas Dubois",
      email: "thomas.dubois@example.com",
      role: "professional",
      specialty: "Cardiologue",
      verified: true,
      isOnline: true,
    },
    {
      id: "prof-3",
      name: "Dr. Claire Petit",
      email: "claire.petit@example.com",
      role: "professional",
      specialty: "Pédiatre",
      verified: true,
      isOnline: false,
    },
    {
      id: "prof-4",
      name: "Dr. Pierre Lambert",
      email: "pierre.lambert@example.com",
      role: "professional",
      specialty: "Dermatologue",
      verified: false,
      isOnline: true,
    },
    {
      id: "prof-5",
      name: "Pharmacie Centrale",
      email: "pharmacie.centrale@example.com",
      role: "professional",
      specialty: "Pharmacie",
      verified: true,
      isOnline: true,
    }
  ];

  const handleStartCall = (type: "audio" | "video") => {
    if (!selectedContact) return;
    
    setCallType(type);
    setIsCallModalOpen(true);
  };

  const handleCloseCallModal = () => {
    setIsCallModalOpen(false);
    setCallType(null);
  };

  const handleSelectProfessional = (professional: ProfessionalProfile) => {
    // Navigate to the dedicated chat page with this professional
    navigate(`/chat/${professional.id}`);
  };

  const handleSelectContact = (contact: Contact) => {
    // Navigate to the dedicated chat page with this contact
    navigate(`/chat/${contact.id}`);
  };

  if (!currentUser) {
    return (
      <Layout>
        <LoginPrompt />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-health-dark">{t('chat.title') || "Messagerie"}</h1>
        
        {/* Online Professionals Section */}
        <OnlineProfessionals 
          professionals={mockProfessionals} 
          onSelectProfessional={handleSelectProfessional} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-16rem)] bg-white rounded-lg shadow">
          {/* Chat sidebar */}
          <div className="md:col-span-1 border-r border-gray-200">
            <ChatSidebar 
              contacts={mockContacts} 
              selectedContact={selectedContact} 
              onSelectContact={handleSelectContact}
            />
          </div>
          
          {/* Chat area */}
          <div className="md:col-span-2 flex flex-col h-full">
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
                <path d="M17 7.82v6.36c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8.18"></path>
                <path d="m19 3-5.5 5.5"></path>
                <path d="M16 3h3v3"></path>
                <path d="M5.42 12.61a2.1 2.1 0 1 1 2.97 2.97L5 18 3 16l2.42-3.39z"></path>
              </svg>
              <p className="text-lg font-medium">Sélectionnez un contact pour commencer</p>
              <p className="text-sm">Connectez-vous avec vos professionnels de santé</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
