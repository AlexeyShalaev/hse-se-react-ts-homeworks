import './style.css';
import { products } from './data/mockProducts';
import { createProductCard } from './components/ProductCard';
import { createSidebar } from './components/Sidebar';
import { createNavbar } from './components/Navbar';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container-fluid">
    <div id="navbar-container"></div>
    <div id="sidebar-container"></div>
    <main class="main-content">
      <div class="product-grid" id="product-grid"></div>
    </main>
  </div>
`;

// Initialize components
const navbarContainer = document.getElementById('navbar-container')!;
const sidebarContainer = document.getElementById('sidebar-container')!;
const productGrid = document.getElementById('product-grid')!;

navbarContainer.appendChild(createNavbar());
sidebarContainer.appendChild(createSidebar());

// Render products
products.forEach(product => {
  productGrid.appendChild(createProductCard(product));
});

// Toggle sidebar
document.getElementById('toggleSidebar')?.addEventListener('click', () => {
  document.querySelector('.sidebar')?.classList.toggle('collapsed');
});