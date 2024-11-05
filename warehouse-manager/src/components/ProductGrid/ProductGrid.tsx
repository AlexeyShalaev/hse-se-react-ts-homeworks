import React from 'react';
import { Product } from '../../types/Product';
import ProductCard from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelectProduct }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
};

export default ProductGrid;