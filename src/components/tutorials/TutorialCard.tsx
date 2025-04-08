
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TutorialCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  isExpanded: boolean;
  isMobile: boolean;
  onToggleExpand: (id: string) => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  id,
  title,
  description,
  icon,
  content,
  isExpanded,
  isMobile,
  onToggleExpand
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isMobile ? (
          <Collapsible
            open={isExpanded}
            onOpenChange={() => onToggleExpand(id)}
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full">
                {isExpanded ? "Masquer" : "En savoir plus"}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              {content}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          isExpanded && content
        )}
      </CardContent>
      <CardFooter>
        {!isMobile && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onToggleExpand(id)}
          >
            {isExpanded ? "Masquer" : "En savoir plus"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TutorialCard;
