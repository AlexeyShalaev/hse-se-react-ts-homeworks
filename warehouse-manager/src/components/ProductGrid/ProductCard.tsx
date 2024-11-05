import React from 'react';
import { Product } from '../../types/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <article className="product-card" onClick={() => onSelect(product)}>
      <div className="image-container">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="no-image">📦</div>
        )}
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <span className="product-category">{product.category}</span>
        <div className="product-quantity">
          {product.quantity} {product.unit} in stock
        </div>
      </div>
    </article>
  );
};

export default ProductCard;