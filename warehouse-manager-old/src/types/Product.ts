export interface Product {
  id: number;
  name: string;
  description?: string;
  category: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
}