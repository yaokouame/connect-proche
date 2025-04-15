
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export const useTutorialExpansion = () => {
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleTutorialClick = (id: string) => {
    setExpandedTutorial(expandedTutorial === id ? null : id);
  };

  return {
    expandedTutorial,
    isMobile,
    handleTutorialClick
  };
};
