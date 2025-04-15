
import React from "react";
import { tutorials } from "@/data/tutorialData";
import TutorialGrid from "./TutorialGrid";
import { useTutorialExpansion } from "@/hooks/useTutorialExpansion";

interface TutorialContentProps {
  enableVoiceHelp?: boolean;
}

const TutorialContent: React.FC<TutorialContentProps> = ({ enableVoiceHelp = false }) => {
  const { expandedTutorial, isMobile, handleTutorialClick } = useTutorialExpansion();

  return (
    <TutorialGrid
      tutorials={tutorials}
      expandedTutorial={expandedTutorial}
      isMobile={isMobile}
      onToggleExpand={handleTutorialClick}
    />
  );
};

export default TutorialContent;
