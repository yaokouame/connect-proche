
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WellnessRecommendation } from "@/types/health";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Salad } from "lucide-react";

interface WellnessRecommendationsProps {
  recommendations: WellnessRecommendation[];
  isLoading: boolean;
}

const WellnessRecommendations: React.FC<WellnessRecommendationsProps> = ({
  recommendations,
  isLoading
}) => {
  const getCategoryIcon = (category: WellnessRecommendation['category']) => {
    switch (category) {
      case 'nutrition':
        return <Salad className="h-5 w-5" />;
      case 'physical':
        return <ArrowRight className="h-5 w-5" />;
      case 'mental':
        return <Heart className="h-5 w-5" />;
      default:
        return <ArrowRight className="h-5 w-5" />;
    }
  };
  
  const getCategoryColor = (category: WellnessRecommendation['category']): string => {
    switch (category) {
      case 'nutrition':
        return 'text-green-500 bg-green-50';
      case 'physical':
        return 'text-blue-500 bg-blue-50';
      case 'mental':
        return 'text-purple-500 bg-purple-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };
  
  const getCategoryName = (category: WellnessRecommendation['category']): string => {
    switch (category) {
      case 'nutrition':
        return 'Nutrition';
      case 'physical':
        return 'Activité physique';
      case 'mental':
        return 'Santé mentale';
      default:
        return category;
    }
  };
  
  if (isLoading) {
    return (
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Conseils personnalisés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-24 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Conseils personnalisés</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation) => (
          <Card key={recommendation.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                <div className={`p-2 rounded-full ${getCategoryColor(recommendation.category)}`}>
                  {getCategoryIcon(recommendation.category)}
                </div>
              </div>
              <CardDescription>{getCategoryName(recommendation.category)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{recommendation.description}</p>
              
              {recommendation.imageUrl && (
                <img 
                  src={recommendation.imageUrl}
                  alt={recommendation.title}
                  className="w-full h-32 object-cover rounded-md mt-3"
                />
              )}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-start">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WellnessRecommendations;
