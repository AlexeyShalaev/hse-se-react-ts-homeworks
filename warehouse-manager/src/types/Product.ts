export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export type ProductFilter = {
  search: string;
  showNonZero: boolean;
  category: string | null;
};
