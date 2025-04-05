
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Search, Pills, Check, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: "high" | "medium" | "low" | "none";
  description: string;
  recommendation: string;
}

const MedicationInteractions = () => {
  const { toast } = useToast();
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [recentChecks, setRecentChecks] = useState<{drug1: string, drug2: string}[]>([]);

  // Mock interaction data
  const mockInteractions: Record<string, DrugInteraction> = {
    "amoxicillineparacetamol": {
      id: "int-1",
      drug1: "Amoxicilline",
      drug2: "Paracétamol",
      severity: "low",
      description: "Interaction mineure. Les deux médicaments peuvent généralement être pris ensemble.",
      recommendation: "Aucune précaution particulière n'est nécessaire."
    },
    "amoxicillineibuprofen": {
      id: "int-2",
      drug1: "Amoxicilline",
      drug2: "Ibuprofène",
      severity: "low",
      description: "Interaction mineure. Peut légèrement augmenter le risque d'effets secondaires gastro-intestinaux.",
      recommendation: "Prendre l'ibuprofène avec de la nourriture pour réduire les irritations gastriques."
    },
    "paracetamolwarfarin": {
      id: "int-3",
      drug1: "Paracétamol",
      drug2: "Warfarine",
      severity: "medium",
      description: "Le paracétamol peut augmenter l'effet anticoagulant de la warfarine en cas d'utilisation prolongée ou à forte dose.",
      recommendation: "Surveiller l'INR plus fréquemment si le paracétamol est utilisé régulièrement ou à forte dose."
    },
    "ibuprofenaspirin": {
      id: "int-4",
      drug1: "Ibuprofène",
      drug2: "Aspirine",
      severity: "high",
      description: "L'ibuprofène peut réduire les effets cardioprotecteurs de l'aspirine à faible dose et augmenter le risque de saignement gastro-intestinal.",
      recommendation: "Éviter cette combinaison si possible. Si nécessaire, prendre l'aspirine au moins 30 minutes avant l'ibuprofène ou 8 heures après."
    },
    "aspirinwarfarin": {
      id: "int-5",
      drug1: "Aspirine",
      drug2: "Warfarine",
      severity: "high",
      description: "Augmentation significative du risque de saignement lorsque ces deux médicaments sont combinés.",
      recommendation: "Cette combinaison doit généralement être évitée. Consulter un médecin avant toute prise conjointe."
    }
  };

  const checkInteractions = () => {
    if (!drug1 || !drug2) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez saisir deux médicaments pour vérifier les interactions.",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Normalize drug names for lookup
      const normalizedDrug1 = drug1.trim().toLowerCase().replace(/\s+/g, '');
      const normalizedDrug2 = drug2.trim().toLowerCase().replace(/\s+/g, '');
      
      // Try both combinations (drug1+drug2 and drug2+drug1)
      const key1 = normalizedDrug1 + normalizedDrug2;
      const key2 = normalizedDrug2 + normalizedDrug1;
      
      let foundInteraction = mockInteractions[key1] || mockInteractions[key2];
      
      if (foundInteraction) {
        setInteractions([foundInteraction, ...interactions]);
        
        // Show toast based on severity
        const severityMessages = {
          high: "Interaction grave détectée!",
          medium: "Interaction modérée détectée",
          low: "Interaction mineure détectée",
          none: "Aucune interaction significative"
        };
        
        toast({
          title: severityMessages[foundInteraction.severity],
          description: foundInteraction.description.substring(0, 60) + "...",
          variant: foundInteraction.severity === "high" ? "destructive" : "default"
        });
      } else {
        // Create a "no interaction" result
        const noInteraction: DrugInteraction = {
          id: `int-${Date.now()}`,
          drug1: drug1,
          drug2: drug2,
          severity: "none",
          description: "Aucune interaction significative connue entre ces médicaments.",
          recommendation: "Ces médicaments peuvent généralement être pris ensemble sans précaution particulière."
        };
        
        setInteractions([noInteraction, ...interactions]);
        
        toast({
          title: "Aucune interaction détectée",
          description: "Ces médicaments ne présentent pas d'interactions connues.",
        });
      }
      
      // Add to recent checks
      setRecentChecks([
        { drug1: drug1, drug2: drug2 },
        ...recentChecks.slice(0, 4) // Keep only the 5 most recent
      ]);
      
      // Reset form
      setDrug1("");
      setDrug2("");
      setIsChecking(false);
    }, 1500);
  };

  const loadRecentCheck = (drug1: string, drug2: string) => {
    setDrug1(drug1);
    setDrug2(drug2);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-health-blue" />
            Vérification des interactions médicamenteuses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="drug1" className="block text-sm font-medium mb-1">
                  Premier médicament
                </label>
                <Input
                  id="drug1"
                  placeholder="Ex: Amoxicilline"
                  value={drug1}
                  onChange={(e) => setDrug1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="drug2" className="block text-sm font-medium mb-1">
                  Second médicament
                </label>
                <Input
                  id="drug2"
                  placeholder="Ex: Paracétamol"
                  value={drug2}
                  onChange={(e) => setDrug2(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={checkInteractions} 
                disabled={isChecking || !drug1 || !drug2}
                className="w-full max-w-xs"
              >
                {isChecking ? (
                  "Vérification en cours..."
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" /> Vérifier l'interaction
                  </>
                )}
              </Button>
            </div>
            
            {recentChecks.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Recherches récentes</h3>
                <div className="flex flex-wrap gap-2">
                  {recentChecks.map((check, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loadRecentCheck(check.drug1, check.drug2)}
                      className="text-xs"
                    >
                      {check.drug1} + {check.drug2}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Résultats des vérifications</h3>
              
              {interactions.length > 0 ? (
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <InteractionResult key={interaction.id} interaction={interaction} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md">
                  <Pills className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-2">Aucune vérification effectuée</p>
                  <p className="text-sm text-gray-400">Saisissez deux médicaments pour vérifier leurs interactions</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-3">À propos des interactions médicamenteuses</h3>
          <p className="text-gray-700 mb-4">
            Les interactions médicamenteuses peuvent modifier l'effet d'un médicament, augmenter le risque d'effets indésirables ou diminuer son efficacité. Il est essentiel de vérifier les potentielles interactions avant de prendre plusieurs médicaments simultanément.
          </p>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Cet outil fournit des informations générales et ne remplace pas l'avis d'un professionnel de santé. Consultez toujours votre médecin ou pharmacien avant de combiner des médicaments.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

interface InteractionResultProps {
  interaction: DrugInteraction;
}

const InteractionResult = ({ interaction }: InteractionResultProps) => {
  const severityColors = {
    high: "bg-red-50 border-red-500",
    medium: "bg-orange-50 border-orange-500",
    low: "bg-yellow-50 border-yellow-500",
    none: "bg-green-50 border-green-500"
  };
  
  const severityIcons = {
    high: <AlertTriangle className="h-5 w-5 text-red-500" />,
    medium: <AlertTriangle className="h-5 w-5 text-orange-500" />,
    low: <Info className="h-5 w-5 text-yellow-500" />,
    none: <Check className="h-5 w-5 text-green-500" />
  };
  
  const severityLabels = {
    high: "Interaction grave",
    medium: "Interaction modérée",
    low: "Interaction mineure",
    none: "Aucune interaction significative"
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${severityColors[interaction.severity]}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {severityIcons[interaction.severity]}
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-medium">
              {interaction.drug1} + {interaction.drug2}
            </h4>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              interaction.severity === "high" ? "bg-red-100 text-red-800" :
              interaction.severity === "medium" ? "bg-orange-100 text-orange-800" :
              interaction.severity === "low" ? "bg-yellow-100 text-yellow-800" :
              "bg-green-100 text-green-800"
            }`}>
              {severityLabels[interaction.severity]}
            </span>
          </div>
          
          <p className="text-sm mt-1">
            {interaction.description}
          </p>
          
          {interaction.severity !== "none" && (
            <div className="mt-2">
              <p className="text-sm font-medium">Recommandation:</p>
              <p className="text-sm">{interaction.recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationInteractions;
