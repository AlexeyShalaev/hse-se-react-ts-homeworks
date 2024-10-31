export function createSidebar(): HTMLElement {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  
  const content = `
    <div class="sidebar-content">
      <div class="filter-section">
        <input type="search" 
               id="searchFilter" 
               class="compact-search" 
               placeholder="Quick search..." />
      </div>
      
      <div class="filter-section">
        <select id="categoryFilter" class="compact-select">
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Tools">Tools</option>
          <option value="Storage">Storage</option>
        </select>
      </div>
      
      <div class="filter-section">
        <label class="stock-filter">
          <input type="checkbox" id="inStock" />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  `;
  
  aside.innerHTML = content;
  return aside;
}