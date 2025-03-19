import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { theme } from './theme/theme';
import { ProductsPage } from './pages/products/ProductsPage';
import { ProductDetailsPage } from './pages/products/ProductDetailsPage';
import { CategoriesPage } from './pages/categories/CategoriesPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { FilterDrawer } from './components/filters/FilterDrawer';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { LoginPage } from './pages/auth/LoginPage';

const App: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={accessToken ? <MainApp /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const MainApp: React.FC = () => {
  const categories = useSelector((state: RootState) =>
    state.categories.items.map(cat => cat.name)
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filters = useSelector((state: RootState) => state.filters);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Navigation onMenuClick={handleDrawerToggle} />
        <FilterDrawer
          open={drawerOpen}
          categories={categories}
          filters={filters}
          onFiltersChange={() => {}}
          onClose={() => setDrawerOpen(false)}
          onReset={() => {}}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
