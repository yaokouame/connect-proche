
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavItem } from "./NavigationLinks";

interface NavigationMenuGroupProps {
  title: string;
  items: NavItem[];
  onItemClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

const NavigationMenuGroup: React.FC<NavigationMenuGroupProps> = ({
  title,
  items,
  onItemClick,
  className = "",
  isMobile = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <div className={cn("mb-1", className)}>
        <Button
          variant="ghost"
          className="w-full justify-between px-2 py-1.5 text-sm font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        {isOpen && (
          <div className="pl-4 py-1 space-y-1">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                onClick={onItemClick}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-1 p-2">
              {items.map((item) => (
                <li key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 flex items-center"
                      onClick={onItemClick}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuGroup;
