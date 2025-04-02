
export interface Contact {
  id: string;
  name: string;
  role: "patient" | "professional" | "pharmacy";
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  specialty?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: "image" | "document";
  url: string;
  name: string;
  size?: number;
}

export interface Call {
  id: string;
  type: "audio" | "video";
  status: "incoming" | "outgoing" | "ongoing" | "ended" | "missed";
  contactId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
}
