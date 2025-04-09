
import { Doctor, Product, Review } from "./types";

export const mockDoctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Kouadio Koffi",
    specialty: "Cardiologie",
    location: "Abidjan - Cocody",
    rating: 4.8,
    reviewCount: 23
  },
  {
    id: "d2",
    name: "Dr. Assa Marie",
    specialty: "Pédiatrie",
    location: "Abidjan - Plateau",
    rating: 4.5,
    reviewCount: 17
  },
  {
    id: "d3",
    name: "Dr. Koné Issouf",
    specialty: "Dermatologie",
    location: "Abidjan - Marcory",
    rating: 4.2,
    reviewCount: 14
  },
  {
    id: "d4",
    name: "Dr. Aké Florence",
    specialty: "Psychiatrie",
    location: "Abidjan - Yopougon",
    rating: 4.7,
    reviewCount: 19
  }
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Paracétamol 500mg",
    category: "Médicaments",
    price: 2500,
    imageUrl: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 12
  },
  {
    id: "p2",
    name: "Tensiomètre électronique",
    category: "Équipements",
    price: 18500,
    imageUrl: "/placeholder.svg",
    rating: 4.3,
    reviewCount: 8
  },
  {
    id: "p3",
    name: "Vitamine C 1000mg",
    category: "Compléments",
    price: 4200,
    imageUrl: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 14
  }
];

export const mockReviews: Record<string, Review[]> = {
  "d1": [
    {
      id: "r1",
      doctorId: "d1",
      userName: "Traore P.",
      rating: 5,
      comment: "Excellent médecin, très à l'écoute et professionnel.",
      date: "2023-06-15"
    },
    {
      id: "r2",
      doctorId: "d1",
      userName: "Bamba L.",
      rating: 4,
      comment: "Bon suivi médical, mais parfois long pour obtenir un rendez-vous.",
      date: "2023-08-22"
    }
  ],
  "d2": [
    {
      id: "r3",
      doctorId: "d2",
      userName: "Konan D.",
      rating: 5,
      comment: "Géniale avec les enfants, ma fille adore ses visites!",
      date: "2023-07-05"
    }
  ],
  "d3": [
    {
      id: "r4",
      doctorId: "d3",
      userName: "Kouassi T.",
      rating: 4,
      comment: "Diagnostic précis et traitement efficace.",
      date: "2023-09-10"
    }
  ],
  "d4": [
    {
      id: "r5",
      doctorId: "d4",
      userName: "Koffi B.",
      rating: 5,
      comment: "Excellente thérapeute, je la recommande vivement.",
      date: "2023-08-03"
    }
  ],
  "p1": [
    {
      id: "pr1",
      productId: "p1",
      userName: "Koné S.",
      rating: 5,
      comment: "Médicament efficace et prix abordable.",
      date: "2023-10-05"
    }
  ],
  "p2": [
    {
      id: "pr2",
      productId: "p2",
      userName: "Bamba F.",
      rating: 4,
      comment: "Bon produit, mais l'écran pourrait être plus grand.",
      date: "2023-09-18"
    }
  ]
};
