
import React from "react";
import { Bandage, Heart, BookOpen, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface TutorialItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const tutorials: TutorialItem[] = [
  {
    id: "first-aid",
    title: "Premiers secours d'urgence",
    description: "Gestes essentiels pour porter assistance à une personne en détresse",
    icon: <Bandage className="h-6 w-6 text-health-red" />,
    content: (
      <>
        <h3 className="text-lg font-medium mb-2">Les bases des premiers secours</h3>
        <p className="mb-4">
          Connaître les gestes de premiers secours peut sauver des vies. Voici les étapes fondamentales à suivre 
          en cas d'urgence médicale.
        </p>
        
        <h3 className="text-lg font-medium mb-2">Évaluer la situation</h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>Assurez-vous que la zone est sûre pour vous et la victime</li>
          <li>Vérifiez l'état de conscience de la personne</li>
          <li>Appelez ou faites appeler les secours (15, 18 ou 112)</li>
          <li>Effectuez les gestes appropriés en attendant les secours</li>
        </ol>
        
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Ne déplacez jamais une personne blessée, sauf si sa vie est en danger immédiat (incendie, explosion, etc.).
          </AlertDescription>
        </Alert>
        
        <h3 className="text-lg font-medium mb-2">Position latérale de sécurité (PLS)</h3>
        <p className="mb-4">
          Si la personne est inconsciente mais respire normalement, placez-la en position latérale de sécurité :
        </p>
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="pls-steps">
            <AccordionTrigger>Comment placer en PLS</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Placez-vous à genoux à côté de la victime</li>
                <li>Placez le bras de la victime le plus proche de vous à angle droit</li>
                <li>Ramenez son autre main contre sa joue opposée</li>
                <li>Pliez sa jambe la plus éloignée</li>
                <li>Faites-la rouler doucement vers vous</li>
                <li>Stabilisez sa position en ajustant la jambe et le bras</li>
                <li>Vérifiez régulièrement sa respiration jusqu'à l'arrivée des secours</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cpr-steps">
            <AccordionTrigger>Réanimation cardio-pulmonaire (RCP)</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Si la personne ne respire pas, commencez immédiatement la RCP :</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Placez la personne sur le dos sur une surface ferme</li>
                <li>Placez vos mains au centre de sa poitrine</li>
                <li>Comprimez fermement à une profondeur d'environ 5-6 cm</li>
                <li>Effectuez 30 compressions à un rythme de 100-120 par minute</li>
                <li>Donnez 2 insufflations si vous êtes formé, sinon poursuivez les compressions</li>
                <li>Continuez jusqu'à l'arrivée des secours ou la reprise de la respiration</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bleeding">
            <AccordionTrigger>Arrêter une hémorragie</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Appuyez fermement sur la plaie avec un linge propre ou vos mains (utilisez des gants si disponibles)</li>
                <li>Maintenez une pression continue jusqu'à l'arrêt du saignement</li>
                <li>Si le saignement persiste, ajoutez des compresses sans retirer les premières</li>
                <li>Surélevez le membre blessé si possible</li>
                <li>Ne posez pas de garrot sauf en cas d'hémorragie massive incontrôlable</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Alert className="mb-4 border-health-red bg-health-red/5">
          <Info className="h-4 w-4 text-health-red" />
          <AlertTitle className="text-health-red">Numéros d'urgence</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1">
              <li>SAMU : 15</li>
              <li>Pompiers : 18</li>
              <li>Numéro d'urgence européen : 112</li>
            </ul>
          </AlertDescription>
        </Alert>
      </>
    )
  },
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
