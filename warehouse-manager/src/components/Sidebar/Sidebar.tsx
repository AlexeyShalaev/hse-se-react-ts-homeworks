import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
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
      </div>
    </aside>
  );
};

export default Sidebar;