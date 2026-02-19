
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 's1',
    name: 'Artisan Dark Chocolate',
    price: 8.50,
    category: 'Snacks',
    description: '70% cacao hand-crafted chocolate with a hint of sea salt.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92ca97fe6f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's2',
    name: 'Truffle Potato Crisps',
    price: 6.00,
    category: 'Snacks',
    description: 'Crispy kettle-cooked chips seasoned with black summer truffle.',
    image: 'https://images.unsplash.com/photo-1566478431375-7385be9b2dca?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd1',
    name: 'Mineral Sparking Water',
    price: 4.50,
    category: 'Drinks',
    description: 'Refreshing sparkling water from local springs.',
    image: 'https://images.unsplash.com/photo-1548964856-ac522549e810?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd2',
    name: 'Luxury Rose Prosecco',
    price: 42.00,
    category: 'Drinks',
    description: '200ml bottle of chilled Italian Rose Prosecco.',
    image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'a1',
    name: 'Silk Sleep Mask',
    price: 25.00,
    category: 'Amenities',
    description: 'Pure mulberry silk mask for a deep, restful sleep.',
    image: 'https://images.unsplash.com/photo-1628102422204-749e7943cc97?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'a2',
    name: 'Bamboo Toothbrush Kit',
    price: 12.00,
    category: 'Amenities',
    description: 'Eco-friendly kit including charcoal paste and bamboo brush.',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'v1',
    name: 'Local Skyline Fragrance',
    price: 55.00,
    category: 'Souvenirs',
    description: 'Signature scent capturing the essence of the city.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'v2',
    name: 'Hand-woven Cotton Throw',
    price: 85.00,
    category: 'Souvenirs',
    description: 'Soft, luxurious throw blanket made by local artisans.',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=400'
  }
];

export const CATEGORIES = ['All', 'Snacks', 'Drinks', 'Amenities', 'Souvenirs'] as const;
