export function createNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  
  const content = `
    <div class="navbar-content">
      <div class="navbar-left">
        <button id="toggleSidebar">☰</button>
        <div class="logo">
          <strong>WareHub</strong>
        </div>
      </div>
      
      <div class="search-container">
        <input 
          type="search" 
          class="search-input" 
          placeholder="Search products..." 
          aria-label="Search products"
        />
      </div>
      
      <div class="nav-icons">
        <a href="#" class="nav-icon" title="Analytics">
          <i>📊</i>
          <span>Analytics</span>
        </a>
        <a href="#" class="nav-icon" title="Orders">
          <i>📦</i>
          <span>Orders</span>
        </a>
        <a href="#" class="nav-icon" title="Profile">
          <i>👤</i>
          <span>Profile</span>
        </a>
      </div>
    </div>
  `;
  
  nav.innerHTML = content;
  return nav;
}