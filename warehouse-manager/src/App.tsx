import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import ProductGrid from './components/ProductGrid/ProductGrid'
import ProductModal from './components/ProductModal/ProductModal'
import {Product} from './types/Product'
import {products} from './data/mockProducts'
import './App.css'
import SearchBar from './components/Navbar/SearchBar'

const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="app">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className="content">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <main className="main-content">
          <SearchBar />
          <ProductGrid products={products} onSelectProduct={handleSelectProduct} />
        </main>
      </div>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  )
}

export default App
