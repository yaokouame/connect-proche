
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Info, Heart, BookOpen, CheckCircle } from "lucide-react";

const MedicalTutorials = () => {
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const tutorials = [
    {
      id: "hypertension",
      title: "Comprendre l'hypertension",
      description: "Apprenez à connaître et à gérer votre tension artérielle",
      icon: <Heart className="h-6 w-6 text-health-blue" />,
      content: (
        <>
          <h3 className="text-lg font-medium mb-2">Qu'est-ce que l'hypertension?</h3>
          <p className="mb-4">
            L'hypertension artérielle est une maladie chronique caractérisée par une pression artérielle trop élevée. 
            Elle est souvent appelée "tueur silencieux" car elle ne présente généralement pas de symptômes.
          </p>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Saviez-vous que...</AlertTitle>
            <AlertDescription>
              Une tension artérielle normale se situe autour de 120/80 mmHg. On parle d'hypertension lorsque les valeurs dépassent 
              régulièrement 140/90 mmHg.
            </AlertDescription>
          </Alert>
          <h3 className="text-lg font-medium mb-2">Comment la gérer?</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Réduisez votre consommation de sel</li>
            <li>Pratiquez une activité physique régulière</li>
            <li>Limitez votre consommation d'alcool</li>
            <li>Arrêtez de fumer</li>
            <li>Prenez vos médicaments tels que prescrits</li>
          </ul>
          <p>
            Un contrôle régulier de votre tension artérielle est essentiel pour prévenir les complications 
            comme les maladies cardiovasculaires, les AVC ou l'insuffisance rénale.
          </p>
        </>
      )
    },
    {
      id: "diabetes",
      title: "Vivre avec le diabète",
      description: "Conseils pour gérer votre diabète au quotidien",
      icon: <BookOpen className="h-6 w-6 text-health-teal" />,
      content: (
        <>
          <h3 className="text-lg font-medium mb-2">Types de diabète</h3>
          <p className="mb-4">
            Il existe principalement deux types de diabète : le type 1 (insulino-dépendant) et le type 2 (non insulino-dépendant). 
            Le diabète de type 2 est le plus courant et représente environ 90% des cas.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Symptômes à surveiller</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Soif excessive et bouche sèche</li>
            <li>Urination fréquente</li>
            <li>Fatigue et faiblesse</li>
            <li>Vision floue</li>
            <li>Perte de poids inexpliquée</li>
          </ul>
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Le contrôle régulier de votre glycémie est essentiel pour éviter les complications à long terme comme 
              les problèmes cardiaques, rénaux ou oculaires.
            </AlertDescription>
          </Alert>
          
          <h3 className="text-lg font-medium mb-2">Gérer votre alimentation</h3>
          <p>
            Adoptez une alimentation équilibrée, riche en fibres et pauvre en sucres raffinés. 
            Consultez un nutritionniste pour établir un plan alimentaire adapté à vos besoins.
          </p>
        </>
      )
    },
    {
      id: "mental-health",
      title: "Santé mentale et bien-être",
      description: "Prendre soin de votre santé mentale au quotidien",
      icon: <CheckCircle className="h-6 w-6 text-health-green" />,
      content: (
        <>
          <h3 className="text-lg font-medium mb-2">L'importance de la santé mentale</h3>
          <p className="mb-4">
            La santé mentale fait partie intégrante de notre bien-être global. Prendre soin de son esprit est tout aussi 
            important que prendre soin de son corps.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Signes d'alerte</h3>
          <p className="mb-4">
            Il est important de reconnaître les signes qui pourraient indiquer un problème de santé mentale :
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Changements d'humeur persistants</li>
            <li>Isolement social</li>
            <li>Troubles du sommeil ou de l'appétit</li>
            <li>Difficultés à se concentrer</li>
            <li>Pensées négatives récurrentes</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Conseils pratiques</h3>
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="meditation">
              <AccordionTrigger>La méditation</AccordionTrigger>
              <AccordionContent>
                Pratiquer la méditation pendant 10 à 15 minutes par jour peut réduire significativement le stress et l'anxiété.
                Des applications comme Petit Bambou ou Headspace peuvent vous guider dans cette pratique.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="physical-activity">
              <AccordionTrigger>L'activité physique</AccordionTrigger>
              <AccordionContent>
                L'exercice régulier libère des endorphines, les hormones du bien-être. Même une marche de 30 minutes 
                par jour peut avoir un impact positif sur votre humeur.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="social-connections">
              <AccordionTrigger>Les liens sociaux</AccordionTrigger>
              <AccordionContent>
                Maintenir des relations sociales de qualité est essentiel pour notre équilibre mental.
                N'hésitez pas à rejoindre des groupes d'activités ou à vous investir dans le bénévolat.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>N'oubliez pas</AlertTitle>
            <AlertDescription>
              Demander de l'aide n'est pas un signe de faiblesse, mais de courage. Si vous vous sentez dépassé, 
              parlez-en à un professionnel de la santé.
            </AlertDescription>
          </Alert>
        </>
      )
    }
  ];

  const handleTutorialClick = (id: string) => {
    setExpandedTutorial(expandedTutorial === id ? null : id);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-health-blue">Tutoriels médicaux</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des informations claires et fiables pour mieux comprendre votre santé 
            et celle de vos proches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {tutorial.icon}
                  <CardTitle>{tutorial.title}</CardTitle>
                </div>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {isMobile ? (
                  <Collapsible
                    open={expandedTutorial === tutorial.id}
                    onOpenChange={() => handleTutorialClick(tutorial.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {expandedTutorial === tutorial.id ? "Masquer" : "En savoir plus"}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      {tutorial.content}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  expandedTutorial === tutorial.id && tutorial.content
                )}
              </CardContent>
              <CardFooter>
                {!isMobile && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleTutorialClick(tutorial.id)}
                  >
                    {expandedTutorial === tutorial.id ? "Masquer" : "En savoir plus"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Besoin de plus d'informations?</h2>
          <p className="text-gray-600 mb-6">
            N'hésitez pas à consulter nos ressources complémentaires ou à contacter 
            un professionnel de santé pour obtenir des conseils personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Prendre rendez-vous</Button>
            <Button variant="outline">Contacter un spécialiste</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MedicalTutorials;
