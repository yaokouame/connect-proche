
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlane } from "lucide-react";

interface ChatInputProps {
  contactId: string;
}

const ChatInput = ({ contactId }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // In a real app, this would send the message to the backend
    console.log("Sending message to", contactId, ":", message);
    
    // Clear the input after sending
    setMessage("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex items-end gap-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Écrivez votre message..."
        className="min-h-[60px] resize-none"
      />
      <Button 
        onClick={handleSendMessage} 
        disabled={message.trim() === ""} 
        size="icon" 
        className="h-[60px] flex-shrink-0"
      >
        <PaperPlane className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
