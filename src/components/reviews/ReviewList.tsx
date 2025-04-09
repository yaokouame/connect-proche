
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Review, ReviewListProps } from "./types";
import { renderStars } from "./utils";

const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <Card key={review.id}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">{review.userName}</div>
          <div className="text-sm text-muted-foreground">
            {new Date(review.date).toLocaleDateString('fr-CI')}
          </div>
        </div>
        <div className="flex mb-3">
          {renderStars(review.rating)}
        </div>
        <p className="text-sm">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

const ReviewList = ({ reviews, noReviewsMessage, onAddReview }: ReviewListProps) => {
  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          <p>{noReviewsMessage}</p>
          <Button 
            onClick={onAddReview} 
            variant="outline" 
            className="mt-2"
          >
            Soyez le premier à donner votre avis
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
