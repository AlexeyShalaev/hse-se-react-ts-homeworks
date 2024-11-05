import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div className="filter-section">
          <input
            type="search"
            id="searchFilter"
            className="compact-search"
            placeholder="Quick search..."
          />
        </div>
        
        <div className="filter-section">
          <select id="categoryFilter" className="compact-select">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Tools">Tools</option>
            <option value="Storage">Storage</option>
          </select>
        </div>
        
        <div className="filter-section">
          <label className="stock-filter">
            <input type="checkbox" id="inStock" />
            <span>In Stock Only</span>
          </label>
        </div>

        <div className="filter-section">
          <label htmlFor="priceRange">Price Range:</label>
          <div className="price-range">
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="compact-input"
              min="0"
              max="1000"
            />
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="compact-input"
              min="0"
              max="1000"
            />
          </div>
        </div>

        <div className="filter-section">
          <label htmlFor="brandFilter">Brand:</label>
          <select id="brandFilter" className="compact-select">
            <option value="">All Brands</option>
            <option value="BrandA">Brand A</option>
            <option value="BrandB">Brand B</option>
            <option value="BrandC">Brand C</option>
          </select>
        </div>

        <div className="filter-section">
          <label htmlFor="warehouseFilter">Warehouse:</label>
          <select id="warehouseFilter" className="compact-select">
            <option value="">All Warehouses</option>
            <option value="Warehouse1">Warehouse 1</option>
            <option value="Warehouse2">Warehouse 2</option>
            <option value="Warehouse3">Warehouse 3</option>
          </select>
        </div>

        <div className="filter-section">
          <label htmlFor="quantityFilter">Quantity:</label>
          <input type="number" id="quantityFilter" className="compact-input" min="1" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;