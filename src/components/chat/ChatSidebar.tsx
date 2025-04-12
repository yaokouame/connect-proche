
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Contact } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ChatSidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

const ChatSidebar = ({ contacts, selectedContact, onSelectContact }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Input
          placeholder="Rechercher un contact..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="overflow-y-auto flex-1">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedContact?.id === contact.id ? "bg-health-blue/5" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h4 className="font-medium truncate">{contact.name}</h4>
                    <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                    {contact.unreadCount > 0 && (
                      <span className="ml-2 bg-health-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{contact.specialty}</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-health-blue hover:bg-health-blue/90 ml-2"
                  onClick={() => onSelectContact(contact)}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            Aucun contact trouvé
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
