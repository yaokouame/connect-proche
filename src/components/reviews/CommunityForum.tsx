
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Heart, Clock, Filter, ArrowUp, Send } from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  replies: number;
}

interface ForumReply {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  isExpert?: boolean;
}

const CommunityForum = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newReply, setNewReply] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("general");
  const { toast } = useToast();

  // Mock data for forum posts
  const mockPosts: ForumPost[] = [
    {
      id: "p1",
      title: "Quels sont les meilleurs remèdes contre les allergies saisonnières?",
      content: "Je souffre d'allergies saisonnières chaque printemps. Avez-vous des conseils pour soulager les symptômes naturellement?",
      author: "Marie D.",
      date: "2023-09-15",
      category: "allergies",
      likes: 12,
      replies: 8
    },
    {
      id: "p2",
      title: "Douleur lombaire chronique - quelles solutions?",
      content: "Je souffre de douleurs lombaires depuis plusieurs mois. J'ai essayé différentes approches mais sans résultat durable. Des conseils?",
      author: "Thomas B.",
      date: "2023-09-10",
      category: "douleurs",
      likes: 8,
      replies: 6
    },
    {
      id: "p3",
      title: "Recommandations pour un bon suivi de grossesse",
      content: "Enceinte de 3 mois, je cherche des conseils pour bien suivre ma grossesse et préparer l'arrivée de bébé.",
      author: "Sophie L.",
      date: "2023-09-05",
      category: "grossesse",
      likes: 15,
      replies: 10
    },
    {
      id: "p4",
      title: "Sport et récupération pour seniors",
      content: "À 65 ans, j'ai repris une activité physique régulière. Quelles sont vos recommandations pour une bonne récupération?",
      author: "Jean M.",
      date: "2023-08-28",
      category: "sport",
      likes: 7,
      replies: 5
    }
  ];

  // Mock data for forum replies
  const mockReplies: Record<string, ForumReply[]> = {
    "p1": [
      {
        id: "r1",
        postId: "p1",
        author: "Dr. Laurent P.",
        content: "Pour les allergies saisonnières, je recommande d'éviter l'exposition aux allergènes autant que possible, de se rincer le nez avec une solution saline et d'essayer des antihistaminiques en vente libre. Consultez un allergologue pour des solutions plus personnalisées.",
        date: "2023-09-16",
        likes: 8,
        isExpert: true
      },
      {
        id: "r2",
        postId: "p1",
        author: "Claire T.",
        content: "J'ai trouvé que le miel local aide beaucoup! En consommer régulièrement avant la saison des allergies peut réduire la sensibilité aux pollens locaux.",
        date: "2023-09-17",
        likes: 5
      }
    ],
    "p2": [
      {
        id: "r3",
        postId: "p2",
        author: "Pierre D.",
        content: "Pour mes douleurs lombaires, j'ai eu d'excellents résultats avec la kinésithérapie et des exercices de renforcement du core. La natation m'a également beaucoup aidé.",
        date: "2023-09-11",
        likes: 4
      }
    ]
  };

  const filteredPosts = mockPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryBadgeColor = (category: string) => {
    const categories: Record<string, string> = {
      "allergies": "bg-yellow-500",
      "douleurs": "bg-red-500",
      "grossesse": "bg-pink-500",
      "sport": "bg-green-500",
      "general": "bg-blue-500"
    };
    return categories[category] || "bg-gray-500";
  };

  const handleSelectPost = (post: ForumPost) => {
    setSelectedPost(post);
  };

  const handleSubmitReply = () => {
    if (!newReply.trim()) {
      toast({
        title: "Erreur",
        description: "Votre réponse ne peut pas être vide.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Réponse publiée",
      description: "Votre réponse a été ajoutée au forum."
    });
    
    setNewReply("");
  };

  const handleSubmitNewPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Question publiée",
      description: "Votre question a été publiée sur le forum."
    });
    
    setShowNewPostForm(false);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostCategory("general");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Forum Communautaire</h2>
          <p className="text-muted-foreground">Posez vos questions et partagez vos expériences</p>
        </div>
        <Button 
          onClick={() => setShowNewPostForm(true)}
          className="bg-health-blue hover:bg-health-blue/90"
        >
          Poser une question
        </Button>
      </div>

      {showNewPostForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Titre</label>
              <Input
                id="title"
                placeholder="Sujet de votre question"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
              <select
                id="category"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value)}
              >
                <option value="general">Général</option>
                <option value="allergies">Allergies</option>
                <option value="douleurs">Douleurs</option>
                <option value="grossesse">Grossesse</option>
                <option value="sport">Sport et bien-être</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Votre question</label>
              <Textarea
                id="content"
                placeholder="Décrivez votre question en détail..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitNewPost}>
              Publier la question
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Input
                    placeholder="Rechercher dans le forum..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Filter className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              {filteredPosts.map(post => (
                <Card 
                  key={post.id}
                  className={`cursor-pointer hover:border-health-blue transition-colors ${
                    selectedPost?.id === post.id ? 'border-health-blue bg-health-blue/5' : ''
                  }`}
                  onClick={() => handleSelectPost(post)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-2 mb-2">
                      <Badge className={getCategoryBadgeColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    <h3 className="font-medium line-clamp-2">{post.title}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <div>{post.author}</div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> {post.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {formatDate(post.date)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedPost ? (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-3">
                      <Badge className={getCategoryBadgeColor(selectedPost.category)}>
                        {selectedPost.category}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
                    <p className="mb-4">{selectedPost.content}</p>
                    <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
                      <div>Par {selectedPost.author}</div>
                      <div>{formatDate(selectedPost.date)}</div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="font-semibold text-lg mt-6">Réponses ({selectedPost.replies})</h3>
                
                {mockReplies[selectedPost.id]?.map((reply, index) => (
                  <Card key={reply.id} className={reply.isExpert ? "border-health-teal" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reply.author}</span>
                          {reply.isExpert && (
                            <Badge className="bg-health-teal">Expert</Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(reply.date)}
                        </div>
                      </div>
                      <p className="text-sm mb-3">{reply.content}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{reply.likes}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Votre réponse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Partagez votre réponse ou votre expérience..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      rows={3}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={handleSubmitReply}
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Répondre
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-center text-muted-foreground">
                <div>
                  <p>Sélectionnez une discussion pour voir les détails</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;
