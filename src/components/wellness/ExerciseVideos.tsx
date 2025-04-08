
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getExerciseVideos } from "@/services/wellnessService";
import { ExerciseVideo } from "@/types/health";
import { useQuery } from "@tanstack/react-query";

const ExerciseVideos = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Fetch exercise videos with React Query
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['exerciseVideos'],
    queryFn: () => getExerciseVideos()
  });
  
  // Filter videos by category
  const filteredVideos = activeCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === activeCategory);
  
  // Categories for tabs
  const categories = [
    { value: "all", label: "All" },
    { value: "yoga", label: "Yoga" },
    { value: "meditation", label: "Meditation" },
    { value: "cardio", label: "Cardio" },
    { value: "strength", label: "Strength" }
  ];
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercices recommandés</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="w-full grid grid-cols-5 mb-4">
            {categories.map(category => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map(video => (
                <Card key={video.id} className="overflow-hidden">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{video.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                      <span>{video.duration} minutes</span>
                      <span className="capitalize">{video.difficulty}</span>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{video.description}</p>
                    <Button className="mt-4 w-full">Regarder</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                Aucune vidéo disponible dans cette catégorie.
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExerciseVideos;
