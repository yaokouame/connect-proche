
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface Conference {
  id: string;
  title: string;
  description: string;
  date: string;
  format: "online" | "inperson";
  location?: string;
  type: "conference" | "training";
  enrolled: boolean;
}

const ConferencesSection = () => {
  const { toast } = useToast();
  const { currentUser } = useUser();
  
  const [conferences, setConferences] = useState<Conference[]>([
    {
      id: "conf-1",
      title: "Urgences médicales : Les gestes qui sauvent",
      description: "Formation pratique sur les premiers secours et la gestion des situations d'urgence médicale.",
      date: "15/06/2023",
      format: "inperson",
      location: "Centre Hospitalier Saint-Louis, Paris",
      type: "training",
      enrolled: false
    },
    {
      id: "conf-2",
      title: "Conférence annuelle sur la santé mentale",
      description: "Échanges et présentations sur les avancées dans le domaine de la santé mentale.",
      date: "22/07/2023",
      format: "online",
      type: "conference",
      enrolled: false
    },
    {
      id: "conf-3",
      title: "Soins aux personnes âgées",
      description: "Formation sur les bonnes pratiques pour l'accompagnement des personnes âgées dépendantes.",
      date: "10/08/2023",
      format: "inperson",
      location: "Institut de Gérontologie, Lyon",
      type: "training",
      enrolled: true
    },
    {
      id: "conf-4",
      title: "Innovations en médecine préventive",
      description: "Les dernières avancées et recherches dans le domaine de la médecine préventive.",
      date: "05/09/2023",
      format: "online",
      type: "conference",
      enrolled: false
    }
  ]);

  const handleEnroll = (id: string) => {
    if (!currentUser) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous inscrire à cette formation.",
        variant: "destructive"
      });
      return;
    }

    setConferences(prevConferences => 
      prevConferences.map(conf => 
        conf.id === id 
          ? { ...conf, enrolled: !conf.enrolled } 
          : conf
      )
    );

    const conference = conferences.find(conf => conf.id === id);
    const action = conference?.enrolled ? "désinscrit" : "inscrit";
    
    toast({
      title: conference?.enrolled ? "Désinscription réussie" : "Inscription réussie",
      description: `Vous vous êtes ${action} ${conference?.enrolled ? "de" : "à"} "${conference?.title}".`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-health-blue">Formations et conférences</h2>
        <Button variant="outline" className="mt-2 sm:mt-0">
          <CalendarDays className="mr-2 h-4 w-4" />
          Voir le calendrier complet
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conferences.map(conference => (
          <Card key={conference.id} className={`${conference.enrolled ? 'border-health-teal border-2' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{conference.title}</CardTitle>
                  <CardDescription className="mt-1">{conference.description}</CardDescription>
                </div>
                <Badge variant={conference.type === "training" ? "default" : "outline"}>
                  {conference.type === "training" ? "Formation" : "Conférence"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{conference.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  {conference.format === "online" ? (
                    <>
                      <Video className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Formation en ligne</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{conference.location}</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleEnroll(conference.id)}
                variant={conference.enrolled ? "outline" : "default"}
                className="w-full"
              >
                {conference.enrolled ? "Se désinscrire" : "S'inscrire"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConferencesSection;
