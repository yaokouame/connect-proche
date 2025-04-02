
import React, { useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types/chat";

interface ChatMessagesProps {
  contactId: string;
}

const ChatMessages = ({ contactId }: ChatMessagesProps) => {
  const { currentUser } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock messages - in a real app, these would be fetched based on the contact
  const mockMessages: Message[] = [
    {
      id: "msg1",
      senderId: "contact-1",
      text: "Bonjour, comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(new Date().getTime() - 60 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg2",
      senderId: currentUser?.id || "",
      text: "Bonjour, j'ai une question concernant mon ordonnance récente.",
      timestamp: new Date(new Date().getTime() - 55 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg3",
      senderId: "contact-1",
      text: "Bien sûr, quelle est votre question ?",
      timestamp: new Date(new Date().getTime() - 50 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg4",
      senderId: currentUser?.id || "",
      text: "Je me demande si je peux prendre ce médicament avec mon traitement actuel.",
      timestamp: new Date(new Date().getTime() - 45 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg5",
      senderId: "contact-1",
      text: "C'est une bonne question. Pour être sûr, pourriez-vous me rappeler quel est votre traitement actuel ?",
      timestamp: new Date(new Date().getTime() - 40 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg6",
      senderId: currentUser?.id || "",
      text: "Je prends actuellement du Lisinopril pour ma tension.",
      timestamp: new Date(new Date().getTime() - 35 * 60000).toISOString(),
      read: true
    },
    {
      id: "msg7",
      senderId: "contact-1",
      text: "Merci pour cette information. Dans ce cas, il serait préférable que nous en discutions plus en détail. Souhaitez-vous programmer un appel téléphonique ou vidéo ?",
      timestamp: new Date(new Date().getTime() - 10 * 60000).toISOString(),
      read: false
    }
  ];
  
  // Filter messages by contact
  const messages = mockMessages.filter(message => 
    message.senderId === contactId || message.senderId === currentUser?.id);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Format timestamp
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === currentUser?.id;
          
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
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
