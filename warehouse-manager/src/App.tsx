import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box, styled } from '@mui/material';
import { Navigation } from './components/layout/Navigation';
import { FilterDrawer } from './components/filters/FilterDrawer';
import { ProductList } from './components/products/ProductList';
import { ProductDialog } from './components/products/ProductDialog';
import { theme } from './theme/theme';
import { Product, ProductFilter } from './types/product';
import { mockProducts } from './data/mockProducts';
import { filterProducts, paginateProducts } from './utils/productUtils';

interface MainContentProps {
  isDrawerOpen: boolean;
}

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDrawerOpen',
})<MainContentProps>(({ theme, isDrawerOpen }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: 64, // AppBar height
  marginLeft: isDrawerOpen ? 280 : 0,
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const ITEMS_PER_PAGE = 6;

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilter>({
    search: '',
    showNonZero: false,
    category: null,
  });

  const categories = [...new Set(mockProducts.map(product => product.category))];

  const filteredProducts = useMemo(() => 
    filterProducts(mockProducts, filters),
    [filters]
  );

  const paginatedProducts = useMemo(() => 
    paginateProducts(filteredProducts, page, ITEMS_PER_PAGE),
    [filteredProducts, page]
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleDialogClose = () => {
    setSelectedProduct(null);
  };

  const handleFiltersChange = (newFilters: ProductFilter) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Navigation onMenuClick={() => setDrawerOpen(!drawerOpen)} />
        <FilterDrawer
          open={drawerOpen}
          categories={categories}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClose={() => setDrawerOpen(false)}
          onReset={() => {
            setFilters({
              search: '',
              showNonZero: false,
              category: null,
            });
            setPage(1);
          }}
        />
        <MainContent isDrawerOpen={drawerOpen}>
          <ProductList
            products={paginatedProducts}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onProductClick={handleProductClick}
          />
        </MainContent>
        <ProductDialog
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={handleDialogClose}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;