import React from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
}

const products: Product[] = productsData;

const ProductList: React.FC = () => (
  <div className="product-list">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;
