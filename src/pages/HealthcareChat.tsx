
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import LoginPrompt from "@/components/profile/LoginPrompt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneCall, Video, Send, Paperclip, ArrowLeft } from "lucide-react";
import { Contact } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

const HealthcareChat = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const { professionalId } = useParams();
  const [message, setMessage] = useState("");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Mock professional data - in a real app, this would come from an API based on the professionalId
  const professional: Contact = {
    id: professionalId || "prof-1",
    name: "Dr. Sophie Martin",
    role: "professional",
    avatar: "",
    lastMessage: "Bonjour, comment puis-je vous aider aujourd'hui ?",
    lastMessageTime: "10:30",
    unreadCount: 0,
    isOnline: true,
    specialty: "Médecin généraliste"
  };

  // Mock chat messages
  const [messages, setMessages] = useState([
    {
      id: "msg1",
      senderId: professional.id,
      text: "Bonjour, comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(new Date().getTime() - 60 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg2",
      senderId: currentUser?.id || "user",
      text: "Bonjour Docteur, j'ai quelques questions concernant mon traitement.",
      timestamp: new Date(new Date().getTime() - 55 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg3",
      senderId: professional.id,
      text: "Bien sûr, je suis là pour vous aider. Quelles sont vos questions ?",
      timestamp: new Date(new Date().getTime() - 50 * 60000).toISOString(),
      read: true
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: `msg${messages.length + 1}`,
      senderId: currentUser?.id || "user",
      text: message,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate a response from the professional after a short delay
    setTimeout(() => {
      const professionalResponse = {
        id: `msg${messages.length + 2}`,
        senderId: professional.id,
        text: "Je comprends votre préoccupation. Pouvez-vous me donner plus de détails sur vos symptômes actuels ?",
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages(prev => [...prev, professionalResponse]);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleStartCall = (type: "audio" | "video") => {
    setCallType(type);
    setIsCallModalOpen(true);
  };

  const handleCloseCallModal = () => {
    setIsCallModalOpen(false);
    setCallType(null);
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Call Modal content
  const CallModalContent = (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-24 h-24 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue text-4xl font-semibold mb-4">
        {professional.name.charAt(0)}
      </div>
      
      <h3 className="text-xl font-medium mb-1">{professional.name}</h3>
      <p className="text-gray-500 mb-6">{professional.specialty}</p>
      
      <div className="flex items-center mb-8">
        {callType === "audio" ? (
          <PhoneCall className="w-6 h-6 text-health-blue mr-2" />
        ) : (
          <Video className="w-6 h-6 text-health-blue mr-2" />
        )}
        <span className="text-lg">
          {callType === "audio" ? "Appel audio" : "Appel vidéo"}
        </span>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg mb-6 text-center">
        <p className="text-gray-600 mb-2">Service payant</p>
        <p className="text-lg font-medium">2,50 € / minute</p>
      </div>
      
      <div className="flex space-x-4">
        <Button variant="outline" onClick={handleCloseCallModal}>
          Annuler
        </Button>
        <Button onClick={handleCloseCallModal}>
          {callType === "audio" ? (
            <PhoneCall className="mr-2 h-4 w-4" />
          ) : (
            <Video className="mr-2 h-4 w-4" />
          )}
          Accepter et payer
        </Button>
      </div>
    </div>
  );

  if (!currentUser) {
    return (
      <Layout>
        <LoginPrompt />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg h-[calc(100vh-10rem)] flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={() => navigate('/chat')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue font-semibold">
                  {professional.name.charAt(0)}
                </div>
                {professional.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{professional.name}</h3>
                <p className="text-sm text-gray-500">{professional.specialty}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleStartCall("audio")}
                title="Appel audio"
              >
                <PhoneCall className="h-4 w-4 text-health-blue" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleStartCall("video")}
                title="Appel vidéo"
              >
                <Video className="h-4 w-4 text-health-blue" />
              </Button>
            </div>
          </div>
          
          {/* Chat messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.senderId === currentUser?.id || message.senderId === "user";
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isOwnMessage
                          ? "bg-health-blue text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p>{message.text}</p>
                      <div className={`text-xs mt-1 ${isOwnMessage ? "text-blue-100" : "text-gray-500"}`}>
                        {formatMessageTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          
          {/* Chat input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={message.trim() === ""} 
                size="icon"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call Modal */}
      {isCallModalOpen && (
        isDesktop ? (
          <Dialog open={true} onOpenChange={() => handleCloseCallModal()}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {callType === "audio" ? "Appel audio" : "Appel vidéo"} avec {professional.name}
                </DialogTitle>
              </DialogHeader>
              {CallModalContent}
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={true} onOpenChange={() => handleCloseCallModal()}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  {callType === "audio" ? "Appel audio" : "Appel vidéo"} avec {professional.name}
                </DrawerTitle>
              </DrawerHeader>
              {CallModalContent}
            </DrawerContent>
          </Drawer>
        )
      )}
    </Layout>
  );
};

export default HealthcareChat;
