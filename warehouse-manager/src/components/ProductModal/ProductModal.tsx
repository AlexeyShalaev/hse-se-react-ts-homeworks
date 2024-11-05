import React from 'react'
import {Product} from '../../types/Product'
import './ProductModal.css'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({product, onClose}) => {
  return (
    <dialog className="product-modal" open>
      <article>
        <div className="product-modal-header">
          <h2
            style={{
              margin: 0,
            }}
          >
            {product.name}
          </h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="product-image">{product.imageUrl ? <img src={product.imageUrl} alt={product.name} /> : <div className="no-image">📦</div>}</div>
          <div className="product-info">
            <p className="description">{product.description || 'No description available'}</p>
            <div className="details">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Stock:</strong> {product.quantity} {product.unit}
              </p>
            </div>
          </div>
        </div>
      </article>
    </dialog>
  )
}

export default ProductModal
