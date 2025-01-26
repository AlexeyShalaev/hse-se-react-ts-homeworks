export interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  description: string;
  imageUrl?: string;
  category: string;
}

export type ProductFilter = {
  search: string;
  showNonZero: boolean;
  category: string | null;
};
