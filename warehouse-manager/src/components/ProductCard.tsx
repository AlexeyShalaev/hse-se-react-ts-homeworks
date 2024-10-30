import React, { useState } from 'react';
import Modal from './Modal';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="card" onClick={handleOpenModal} role="button" style={{ cursor: 'pointer' }}>
      <img
        src={product.imageUrl || '/assets/no-image.png'}
        alt={product.name}
        className="card-image"
      />
      <div className="card-content">
        <h3 className="card-title"><strong>{product.name}</strong></h3>
        <p className="card-description">
          {product.description.length > 100
            ? product.description.slice(0, 100) + '...'
            : product.description}
        </p>
        <p className="card-category">Категория: {product.category}</p>
        <p className="card-quantity">Количество: {product.quantity} {product.unit}</p>
      </div>
      {isModalOpen && <Modal product={product} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductCard;
