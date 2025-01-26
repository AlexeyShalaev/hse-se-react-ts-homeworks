import React, { useState } from 'react';
    import { ThemeProvider, CssBaseline, Box } from '@mui/material';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { Navigation } from './components/layout/Navigation';
    import { theme } from './theme/theme';
    import { ProductsPage } from './pages/products/ProductsPage';
    import { ProductDetailsPage } from './pages/products/ProductDetailsPage';
    import { CategoriesPage } from './pages/categories/CategoriesPage';
    import { ProfilePage } from './pages/profile/ProfilePage';
    import { FilterDrawer } from './components/filters/FilterDrawer';
    import { useSelector } from 'react-redux';
    import { RootState } from './store/store';

    const App: React.FC = () => {
      const categories = useSelector((state: RootState) =>
        state.categories.items.map(cat => cat.name)
      );
      const [drawerOpen, setDrawerOpen] = useState(false);
      const filters = useSelector((state: RootState) => state.filters);

      const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
      };

      return (
        <Router>
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
        </Router>
      );
    };

    export default App;
