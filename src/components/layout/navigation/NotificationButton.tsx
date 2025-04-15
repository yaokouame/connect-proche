
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock notifications for demonstration
const mockNotifications = [
  {
    id: "notif-1",
    title: "New appointment reminder",
    message: "Appointment with Dr. Martin tomorrow at 10:00 AM",
    time: "10 min ago",
    isRead: false,
  },
  {
    id: "notif-2",
    title: "Medication reminder",
    message: "Time to take your daily medication",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: "notif-3",
    title: "Prescription renewed",
    message: "Your prescription has been renewed and is ready for pickup",
    time: "Yesterday",
    isRead: true,
  },
];

const NotificationButton: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { t } = useLanguage();
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 py-0.5 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center bg-health-teal text-[8px] sm:text-[10px]">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>{t("notifications.title") || "Notifications"}</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-blue-600 hover:text-blue-800"
              onClick={markAllAsRead}
            >
              {t("notifications.markAllRead") || "Mark all as read"}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500">
            {t("notifications.empty") || "No notifications"}
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id} 
              className={`cursor-pointer p-3 ${!notification.isRead ? 'bg-blue-50' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-sm">{notification.title}</div>
                  <div className="text-xs text-gray-500">{notification.time}</div>
                </div>
                <div className="text-xs text-gray-600">{notification.message}</div>
              </div>
            </DropdownMenuItem>
          ))
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center py-2 text-blue-600 hover:text-blue-800">
          {t("notifications.viewAll") || "View all notifications"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;
