
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import VoiceRecognition from "@/components/voice/VoiceRecognition";

interface ChatInputProps {
  contactId: string;
}

const ChatInput = ({ contactId }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
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

  const handleVoiceResult = (text: string) => {
    setMessage((prev) => prev + text);
  };
  
  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-end gap-2 ${isRecording ? 'border-2 border-red-300 rounded-md p-1' : ''}`}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isRecording ? "Parlez maintenant..." : "Écrivez votre message..."}
          className="min-h-[60px] resize-none"
        />
        <div className="flex flex-col gap-2">
          <VoiceRecognition 
            onResult={handleVoiceResult} 
            onListening={setIsRecording}
            className="h-[28px]"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={message.trim() === ""} 
            size="icon" 
            className="h-[28px] flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isRecording && (
        <div className="text-xs text-red-500 animate-pulse">
          Reconnaissance vocale active - Parlez clairement
        </div>
      )}
    </div>
  );
};

export default ChatInput;
