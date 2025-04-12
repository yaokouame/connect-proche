
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NotificationButton: React.FC = () => {
  return (
    <Button variant="ghost" size="icon" className="relative hidden sm:flex">
      <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      <Badge className="absolute -top-1 -right-1 px-1 py-0.5 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center bg-health-teal text-[8px] sm:text-[10px]">
        3
      </Badge>
    </Button>
  );
};

export default NotificationButton;
