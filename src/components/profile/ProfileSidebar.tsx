
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Clock, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { User as UserType } from "@/types/user";

interface ProfileSidebarProps {
  currentUser: UserType;
}

const ProfileSidebar = ({ currentUser }: ProfileSidebarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-6 py-8 bg-white rounded-lg border">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={currentUser?.profileImageUrl} alt={currentUser?.name} />
          <AvatarFallback className="text-xl bg-health-blue text-white">
            {getInitials(currentUser.name)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
        <p className="text-gray-500 mb-2">{currentUser?.email}</p>
        <p className="text-sm px-3 py-1 bg-health-teal/10 text-health-teal rounded-full">
          {currentUser?.role === "patient" ? "Patient" : "Professionnel de santé"}
        </p>
      </div>
      
      <nav className="space-y-1">
        <Link to="/profile" className="flex items-center px-4 py-2 bg-health-blue/10 text-health-blue rounded-md">
          <User className="mr-2 h-5 w-5" />
          <span>Informations personnelles</span>
        </Link>
        <Link to="/appointments" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Clock className="mr-2 h-5 w-5" />
          <span>Mes rendez-vous</span>
        </Link>
        {currentUser?.role === "patient" && (
          <Link to="/medical-records" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <FileText className="mr-2 h-5 w-5" />
            <span>Dossier médical</span>
          </Link>
        )}
        <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Settings className="mr-2 h-5 w-5" />
          <span>Paramètres</span>
        </Link>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
