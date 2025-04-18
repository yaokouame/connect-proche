
import { Address } from './userTypes';
import { Prescription } from './prescriptionTypes';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  inStock: boolean;
  requiresPrescription: boolean;
  insuranceCoverage?: {
    eligible: boolean;
    coveragePercentage?: number;
    requiresVoucher?: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  prescription?: Prescription;
}

export type OrderStatusType = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'delayed';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatusType;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderDate: string;
  deliveryDate?: string;
  prescriptionId?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
}
