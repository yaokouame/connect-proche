
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReviewFormProps {
  entityId: string;
  entityName: string;
  entityType: "doctor" | "product";
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

const ReviewForm = ({ entityId, entityName, entityType, onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert(t('reviews.ratingRequired'));
      return;
    }
    onSubmit(rating, comment);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {entityType === "doctor" 
            ? `${t('reviews.giveReview')} ${entityName}` 
            : `Donner votre avis sur ${entityName}`}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('reviews.yourRating')}</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">{t('reviews.yourComment')}</label>
            <Textarea
              id="comment"
              placeholder={entityType === "doctor" 
                ? t('reviews.shareDoctorExperience')
                : "Partagez votre expérience avec ce produit..."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button type="submit">
            {t('reviews.publish')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReviewForm;
