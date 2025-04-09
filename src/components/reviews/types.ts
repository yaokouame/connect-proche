
import { ReactNode } from "react";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  doctorId?: string;
  productId?: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OrderInfo {
  orderNumber: string;
  orderDate: string;
  from: string;
}

export interface EntityCardProps {
  entity: Doctor | Product;
  isSelected: boolean;
  onSelect: (entity: Doctor | Product) => void;
  type: "doctor" | "product";
}

export interface ReviewListProps {
  reviews: Review[];
  noReviewsMessage: ReactNode;
  onAddReview: () => void;
}
