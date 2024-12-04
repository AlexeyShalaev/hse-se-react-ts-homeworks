import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="search-container">
      <input 
        type="search" 
        className="search-input" 
        placeholder="Search products..." 
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;