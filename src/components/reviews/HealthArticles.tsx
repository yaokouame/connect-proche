
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

const HealthArticles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Mock data for health articles
  const mockArticles: Article[] = [
    {
      id: "a1",
      title: "Les bienfaits de la marche quotidienne sur la santé cardiovasculaire",
      excerpt: "Une activité simple mais efficace pour réduire les risques cardiovasculaires et améliorer votre bien-être général.",
      content: `La marche est l'une des activités physiques les plus accessibles et bénéfiques pour notre santé, en particulier pour notre système cardiovasculaire. Des études récentes ont démontré qu'une simple marche de 30 minutes par jour peut réduire significativement les risques de maladies cardiaques.

En effet, la marche régulière permet d'améliorer la circulation sanguine, de réduire la pression artérielle et le taux de cholestérol. Elle aide également à maintenir un poids santé, ce qui réduit la charge sur le cœur.

Pour maximiser les bienfaits, essayez d'incorporer la marche dans votre routine quotidienne : prenez les escaliers au lieu de l'ascenseur, descendez du bus un arrêt plus tôt, ou faites une promenade après le déjeuner. L'important est d'être régulier plutôt que d'en faire beaucoup ponctuellement.

N'oubliez pas de consulter votre médecin avant de commencer tout nouveau programme d'exercice, surtout si vous avez des antécédents de problèmes cardiaques.`,
      author: "Dr. Sophie Martin",
      authorTitle: "Cardiologue",
      date: "2023-09-18",
      category: "prévention",
      readTime: "5 min",
      imageUrl: "placeholder.svg"
    },
    {
      id: "a2",
      title: "Comment reconnaître les signes d'une dépression saisonnière",
      excerpt: "Le trouble affectif saisonnier touche de nombreuses personnes. Apprenez à identifier les symptômes et à y faire face.",
      content: `La dépression saisonnière, également connue sous le nom de trouble affectif saisonnier (TAS), est un type de dépression qui survient généralement à la même période chaque année, souvent pendant les mois d'automne et d'hiver lorsque les jours raccourcissent.

Les symptômes les plus courants incluent une fatigue persistante, une augmentation de l'appétit (particulièrement pour les glucides), un gain de poids, une tendance à dormir plus longtemps, des difficultés à se concentrer et un sentiment général de tristesse ou de désespoir.

Il est important de ne pas confondre une simple baisse de moral temporaire avec une véritable dépression saisonnière. Si ces symptômes persistent pendant plusieurs semaines et affectent votre qualité de vie, il est recommandé de consulter un professionnel de santé.

Les traitements peuvent inclure la luminothérapie (exposition à une lumière artificielle qui simule la lumière naturelle), des thérapies comportementales, et dans certains cas, des médicaments. Des changements de mode de vie comme passer plus de temps à l'extérieur pendant les heures de jour, faire de l'exercice régulièrement et maintenir des liens sociaux peuvent également aider à atténuer les symptômes.`,
      author: "Dr. Thomas Dupont",
      authorTitle: "Psychiatre",
      date: "2023-09-15",
      category: "santé mentale",
      readTime: "8 min",
      imageUrl: "placeholder.svg"
    },
    {
      id: "a3",
      title: "Alimentation et fertilité : ce que vous devez savoir",
      excerpt: "Découvrez comment votre régime alimentaire peut influencer votre fertilité et les changements qui pourraient améliorer vos chances de conception.",
      content: `L'alimentation joue un rôle crucial dans notre santé reproductive. Des recherches ont montré que certains nutriments peuvent aider à optimiser la fertilité tant chez les hommes que chez les femmes.

Pour les femmes, des aliments riches en acide folique (légumes à feuilles vertes, agrumes), en fer (viandes maigres, légumineuses) et en antioxydants (baies, noix) peuvent aider à réguler l'ovulation et à améliorer la qualité des ovules. Les acides gras oméga-3, présents dans les poissons gras comme le saumon, sont également bénéfiques pour la santé reproductive.

Les hommes peuvent améliorer la qualité et la mobilité de leurs spermatozoïdes en consommant des aliments riches en zinc (huîtres, graines de citrouille), en sélénium (noix du Brésil), et en vitamines C et E (agrumes, amandes). Les antioxydants aident également à protéger les spermatozoïdes contre les dommages.

Il est tout aussi important de savoir ce qu'il faut éviter. L'alcool, la caféine excessive, les aliments ultra-transformés et les sucres raffinés peuvent tous avoir un impact négatif sur la fertilité. Le maintien d'un poids santé est également crucial, car l'obésité et la maigreur extrême peuvent perturber l'équilibre hormonal.

Bien sûr, l'alimentation n'est qu'un aspect de la fertilité, et ces changements alimentaires doivent faire partie d'une approche globale qui inclut la gestion du stress, l'exercice modéré et le suivi médical approprié.`,
      author: "Dr. Claire Lefevre",
      authorTitle: "Gynécologue",
      date: "2023-09-10",
      category: "nutrition",
      readTime: "6 min",
      imageUrl: "placeholder.svg"
    },
    {
      id: "a4",
      title: "Comprendre et gérer l'hypertension artérielle",
      excerpt: "L'hypertension est souvent appelée le « tueur silencieux ». Apprenez à contrôler votre tension et à réduire les risques associés.",
      content: `L'hypertension artérielle, caractérisée par une pression excessive du sang contre les parois des artères, touche près d'un adulte sur trois dans le monde. Elle est souvent asymptomatique, d'où son surnom de "tueur silencieux", mais ses conséquences peuvent être graves : maladies cardiaques, accidents vasculaires cérébraux, ou insuffisance rénale.

Le diagnostic repose sur la mesure de la tension artérielle. Une lecture régulièrement supérieure à 140/90 mmHg indique généralement une hypertension. Il est recommandé de faire vérifier sa tension au moins une fois par an, plus fréquemment si vous avez des facteurs de risque.

La bonne nouvelle est que l'hypertension peut souvent être contrôlée par des changements de mode de vie. Réduire la consommation de sel (à moins de 5g par jour), maintenir un poids santé, faire de l'exercice régulièrement (au moins 150 minutes par semaine), limiter l'alcool et arrêter de fumer sont des mesures efficaces pour faire baisser la tension.

Pour certaines personnes, ces modifications ne suffisent pas et un traitement médicamenteux devient nécessaire. Il existe plusieurs classes de médicaments antihypertenseurs, chacune agissant différemment. Le choix du médicament dépend de plusieurs facteurs, dont l'âge, l'ethnie et les conditions médicales coexistantes.

Il est crucial de prendre ses médicaments comme prescrit et de maintenir les changements de mode de vie, même après que la tension se soit normalisée. Des contrôles réguliers chez le médecin sont également essentiels pour ajuster le traitement si nécessaire.`,
      author: "Dr. Michel Berger",
      authorTitle: "Cardiologue",
      date: "2023-09-05",
      category: "chroniques",
      readTime: "7 min",
      imageUrl: "placeholder.svg"
    }
  ];

  const categories = Array.from(new Set(mockArticles.map(article => article.category)));

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategBadgeColor = (category: string) => {
    const categories: Record<string, string> = {
      "prévention": "bg-green-500",
      "santé mentale": "bg-blue-500",
      "nutrition": "bg-yellow-500",
      "chroniques": "bg-purple-500"
    };
    return categories[category] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {!selectedArticle ? (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Articles et Conseils Santé</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Catégories</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        className={`cursor-pointer ${
                          selectedCategory === null ? 'bg-health-blue' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        onClick={() => setSelectedCategory(null)}
                      >
                        Toutes
                      </Badge>
                      
                      {categories.map(category => (
                        <Badge
                          key={category}
                          className={`cursor-pointer ${
                            selectedCategory === category ? getCategBadgeColor(category) : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map(article => (
                  <Card 
                    key={article.id}
                    className="cursor-pointer hover:shadow-md transition-all"
                    onClick={() => handleSelectArticle(article)}
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="object-cover w-full h-full"
                      />
                      <Badge className={`absolute top-2 left-2 ${getCategBadgeColor(article.category)}`}>
                        {article.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{article.readTime} de lecture</span>
                      <Button variant="ghost" size="sm" className="text-health-blue hover:text-health-blue/90">
                        Lire plus <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 mb-4 -ml-2"
            onClick={() => setSelectedArticle(null)}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Retour aux articles
          </Button>
          
          <div className="max-w-3xl mx-auto">
            <Badge className={`mb-4 ${getCategBadgeColor(selectedArticle.category)}`}>
              {selectedArticle.category}
            </Badge>
            
            <h1 className="text-3xl font-bold mb-6">{selectedArticle.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{selectedArticle.author}</span>
                <span className="text-xs">({selectedArticle.authorTitle})</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(selectedArticle.date)}</span>
              </div>
            </div>
            
            <div className="aspect-video bg-muted mb-8 rounded-lg overflow-hidden">
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.title} 
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="border-t mt-8 pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <p className="font-semibold">À propos de l'auteur</p>
                <p className="text-sm text-muted-foreground">{selectedArticle.author}, {selectedArticle.authorTitle}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Partager</Button>
                <Button size="sm" className="bg-health-blue hover:bg-health-blue/90">Enregistrer</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthArticles;
