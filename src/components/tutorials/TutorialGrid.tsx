
import React from "react";
import TutorialCard from "./TutorialCard";
import { TutorialItem } from "@/data/tutorialData";

interface TutorialGridProps {
  tutorials: TutorialItem[];
  expandedTutorial: string | null;
  isMobile: boolean;
  onToggleExpand: (id: string) => void;
}

const TutorialGrid: React.FC<TutorialGridProps> = ({
  tutorials,
  expandedTutorial,
  isMobile,
  onToggleExpand
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial) => (
        <TutorialCard
          key={tutorial.id}
          id={tutorial.id}
          title={tutorial.title}
          description={tutorial.description}
          icon={tutorial.icon}
          content={tutorial.content}
          isExpanded={expandedTutorial === tutorial.id}
          isMobile={isMobile}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
};

export default TutorialGrid;
