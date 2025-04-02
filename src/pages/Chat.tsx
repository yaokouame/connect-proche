
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import CallModal from "@/components/chat/CallModal";
import { useUser } from "@/contexts/UserContext";
import LoginPrompt from "@/components/profile/LoginPrompt";
import { Contact } from "@/types/chat";

const ChatPage = () => {
  const { currentUser } = useUser();
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

  const handleStartCall = (type: "audio" | "video") => {
    if (!selectedContact) return;
    
    setCallType(type);
    setIsCallModalOpen(true);
  };

  const handleCloseCallModal = () => {
    setIsCallModalOpen(false);
    setCallType(null);
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
      <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)]">
        <h1 className="text-3xl font-bold mb-6 text-health-dark">Messagerie</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full max-h-[calc(100vh-16rem)] bg-white rounded-lg shadow">
          {/* Contacts sidebar */}
          <div className="md:col-span-1 border-r border-gray-200">
            <ChatSidebar 
              contacts={mockContacts} 
              selectedContact={selectedContact} 
              onSelectContact={setSelectedContact}
            />
          </div>
          
          {/* Chat area */}
          <div className="md:col-span-2 flex flex-col h-full">
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue font-semibold">
                        {selectedContact.name.charAt(0)}
                      </div>
                      {selectedContact.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{selectedContact.name}</h3>
                      <p className="text-sm text-gray-500">{selectedContact.specialty}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleStartCall("audio")}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title="Appel audio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-health-blue">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleStartCall("video")}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title="Appel vidéo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-health-blue">
                        <path d="m22 8-6 4 6 4V8Z"></path>
                        <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Chat messages */}
                <ChatMessages contactId={selectedContact.id} />
                
                {/* Chat input */}
                <div className="border-t border-gray-200 p-4">
                  <ChatInput contactId={selectedContact.id} />
                </div>
              </>
            ) : (
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
            )}
          </div>
        </div>
        
        {/* Call Modal */}
        {isCallModalOpen && selectedContact && callType && (
          <CallModal 
            contact={selectedContact} 
            callType={callType} 
            onClose={handleCloseCallModal} 
          />
        )}
      </div>
    </Layout>
  );
};

export default ChatPage;
