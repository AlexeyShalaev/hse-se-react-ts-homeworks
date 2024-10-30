import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import './App.css';

const App: React.FC = () => (
  <div className="app">
    <Navbar />
    <main className="main-layout">
      <Sidebar />
      <ProductList />
    </main>
  </div>
);

export default App;
