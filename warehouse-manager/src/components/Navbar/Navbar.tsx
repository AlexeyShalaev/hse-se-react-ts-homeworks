import React from 'react'
import SearchBar from './SearchBar'
import NavIcon from './NavIcon'
import './Navbar.css'

interface NavbarProps {
  onToggleSidebar: () => void
}

const Navbar: React.FC<NavbarProps> = ({onToggleSidebar}) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button id="toggleSidebar" onClick={onToggleSidebar}>
            ☰
          </button>
          <span className="site-name">WareHub</span>
        </div>

        <div className="nav-icons">
          <NavIcon icon="📦" title="Products" />
          <NavIcon icon="🏭" title="Warehouses" />
          <NavIcon icon="📊" title="Analytics" />
          <NavIcon icon="ℹ️" title="About" />
          <NavIcon icon="👤" title="Profile" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
