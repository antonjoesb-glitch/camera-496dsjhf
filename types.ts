
export type Category = 'All' | 'Snacks' | 'Drinks' | 'Amenities' | 'Souvenirs';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SearchRecommendation {
  id: string;
  reason: string;
}
