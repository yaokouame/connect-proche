
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConferencesSection from "@/components/tutorials/ConferencesSection";
import TutorialHeader from "@/components/tutorials/TutorialHeader";
import TutorialContent from "@/components/tutorials/TutorialContent";
import CallToAction from "@/components/tutorials/CallToAction";
import VoiceGuidance from "@/components/voice/VoiceGuidance";

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState<string>("tutorials");
  const [enableVoiceHelp, setEnableVoiceHelp] = useState<boolean>(false);

  const speakIntroduction = () => {
    if ('speechSynthesis' in window) {
      const text = "Bienvenue sur le centre d'apprentissage médical. Vous pouvez explorer les tutoriels de santé ou consulter les formations disponibles. Utilisez les onglets pour naviguer entre ces sections. N'hésitez pas à activer l'assistance vocale pour plus d'aide.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
      setEnableVoiceHelp(true);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <TutorialHeader onSpeakIntro={speakIntroduction} />

        <Tabs defaultValue="tutorials" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tutorials">Tutoriels</TabsTrigger>
            <TabsTrigger value="conferences">Formations et conférences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tutorials">
            <TutorialContent enableVoiceHelp={enableVoiceHelp} />
          </TabsContent>
          
          <TabsContent value="conferences">
            <ConferencesSection />
          </TabsContent>
        </Tabs>

        <CallToAction />
      </div>
      
      <VoiceGuidance />
    </Layout>
  );
};

export default Tutorials;
