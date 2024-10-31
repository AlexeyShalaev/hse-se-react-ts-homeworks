export function createProductCard(product: Product): HTMLElement {
  const article = document.createElement('article');
  article.className = 'product-card';
  
  const content = `
    <div class="image-container">
      ${product.imageUrl 
        ? `<img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100%; height: auto;">` 
        : '<div class="no-image">📦</div>'}
    </div>
    <div class="product-details">
      <h3>${product.name}</h3>
      <span class="product-category">${product.category}</span>
      <div class="product-quantity">
        ${product.quantity} ${product.unit} in stock
      </div>
    </div>
  `;
  
  article.innerHTML = content;
  
  article.addEventListener('click', () => {
    showProductModal(product);
  });
  
  return article;
}

function showProductModal(product: Product) {
  const modal = document.createElement('dialog');
  modal.className = 'product-modal';
  
  const content = `
    <article>
      <header>
        <h2>${product.name}</h2>
        <button class="close-button" onclick="this.closest('dialog').close()">×</button>
      </header>
      <div class="modal-content">
        <div class="product-image">
          ${product.imageUrl 
            ? `<img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100%;">` 
            : '<div class="no-image">📦</div>'}
        </div>
        <div class="product-info">
          <p class="description">${product.description || 'No description available'}</p>
          <div class="details">
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Stock:</strong> ${product.quantity} ${product.unit}</p>
          </div>
        </div>
      </div>
    </article>
  `;
  
  modal.innerHTML = content;
  document.body.appendChild(modal);
  modal.showModal();
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}