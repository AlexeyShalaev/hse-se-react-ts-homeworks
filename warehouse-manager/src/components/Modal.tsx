import React from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
}

const Modal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <img src={product.imageUrl || '/assets/no-image.png'} alt={product.name} className="modal-image" />
      <h2><strong>{product.name}</strong></h2>
      <p>{product.description}</p>
      <p>Категория: {product.category}</p>
      <p>Количество: {product.quantity} {product.unit}</p>
    </div>
  </div>
);

export default Modal;
