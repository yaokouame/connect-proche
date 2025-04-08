
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getExerciseVideos } from "@/services/wellnessService";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  embedUrl: string;
  category: "yoga" | "cardio" | "strength" | "flexibility";
}

const ExerciseVideos = () => {
  const [activeCategory, setActiveCategory] = useState<"yoga" | "cardio" | "strength" | "flexibility">("yoga");
  
  // In a real app, this would come from an API call
  const videos = getExerciseVideos();
  
  const filteredVideos = videos.filter(video => video.category === activeCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PlayCircle className="mr-2 h-5 w-5 text-health-blue" />
          Vidéos d'exercices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="yoga">Yoga</TabsTrigger>
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
            <TabsTrigger value="strength">Force</TabsTrigger>
            <TabsTrigger value="flexibility">Souplesse</TabsTrigger>
          </TabsList>
          
          {["yoga", "cardio", "strength", "flexibility"].map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface VideoCardProps {
  video: VideoItem;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <AspectRatio ratio={16/9}>
          {isPlaying ? (
            <iframe 
              src={video.embedUrl} 
              title={video.title}
              className="w-full h-full"
              allowFullScreen
            />
          ) : (
            <div 
              className="bg-cover bg-center w-full h-full flex items-center justify-center cursor-pointer"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-16 h-16 bg-health-blue rounded-full flex items-center justify-center text-white">
                <PlayCircle className="h-10 w-10" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                {video.duration}
              </div>
            </div>
          )}
        </AspectRatio>
        
        <button 
          className={`absolute top-2 right-2 p-1 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-500'}`}
          onClick={handleFavoriteToggle}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "white" : "none"} />
        </button>
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-medium text-sm">{video.title}</h3>
      </CardContent>
    </Card>
  );
};

export default ExerciseVideos;
