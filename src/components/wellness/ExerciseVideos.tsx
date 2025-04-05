
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getExerciseVideos } from "@/services/wellnessService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseVideo } from "@/types/health";
import { Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideoDialogProps {
  video: ExerciseVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ video, isOpen, onClose }) => {
  if (!video) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>
            {video.difficulty} · {video.duration} minutes
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
          {/* In a real application, this would be a video player */}
          <div className="text-center">
            <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Le lecteur vidéo s'afficherait ici</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-gray-600">{video.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ExerciseVideos: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<ExerciseVideo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['exerciseVideos', activeCategory],
    queryFn: () => getExerciseVideos(activeCategory === 'all' ? undefined : activeCategory),
  });
  
  const handleOpenVideo = (video: ExerciseVideo) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  };
  
  const getDifficultyColor = (difficulty: ExerciseVideo['difficulty']): string => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDifficultyLabel = (difficulty: ExerciseVideo['difficulty']): string => {
    switch (difficulty) {
      case 'beginner':
        return 'Débutant';
      case 'intermediate':
        return 'Intermédiaire';
      case 'advanced':
        return 'Avancé';
      default:
        return difficulty;
    }
  };

  return (
    <div>
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="yoga">Yoga</TabsTrigger>
          <TabsTrigger value="meditation">Méditation</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="strength">Musculation</TabsTrigger>
          <TabsTrigger value="flexibility">Étirements</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeCategory}>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-t-md"></div>
                  <CardHeader>
                    <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div 
                    className="aspect-video bg-gray-100 relative cursor-pointer group"
                    onClick={() => handleOpenVideo(video)}
                  >
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                        <Play className="h-8 w-8 text-health-blue" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {video.duration} minutes
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0 flex justify-between">
                    <Badge variant="outline" className={getDifficultyColor(video.difficulty)}>
                      {getDifficultyLabel(video.difficulty)}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenVideo(video)}>
                      Voir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <VideoDialog 
        video={selectedVideo} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
};

export default ExerciseVideos;
