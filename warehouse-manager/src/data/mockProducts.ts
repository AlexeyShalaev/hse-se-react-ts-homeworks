import { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Laptop Dell XPS 13',
    description: 'Powerful laptop with 16GB RAM, 512GB SSD, and Intel i7 processor. Perfect for both work and entertainment.',
    category: 'Electronics',
    quantity: 15,
    unit: 'pieces'
  },
  {
    id: 2,
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    category: 'Furniture',
    quantity: 25,
    unit: 'pieces',
    imageUrl: '/images/chair.jpg'
  },
  {
    id: 3,
    name: 'Printer Paper A4',
    description: 'High-quality white printer paper, 80g/m²',
    category: 'Office Supplies',
    quantity: 100,
    unit: 'packs'
  }
];