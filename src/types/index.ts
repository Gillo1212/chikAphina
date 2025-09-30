export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  isEcoFriendly: boolean;
  isRecycled: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
  materials: string[];
  sustainability: {
    carbonFootprint: number;
    recycledContent: number;
    certifications: string[];
  };
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  favoriteProducts: string[];
  loyaltyPoints: number;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  estimatedDelivery: Date;
}