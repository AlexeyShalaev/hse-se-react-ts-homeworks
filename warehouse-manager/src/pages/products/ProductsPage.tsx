import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux';
    import { Box, Button, Typography, IconButton, Pagination } from '@mui/material';
    import AddIcon from '@mui/icons-material/Add';
    import ViewListIcon from '@mui/icons-material/ViewList';
    import ViewModuleIcon from '@mui/icons-material/ViewModule';
    import { RootState } from '@/store/store';
    import { ProductList } from '@/components/products/ProductList';
    import { ProductTable } from '@/components/products/ProductTable';
    import { ProductDialog } from '@/components/products/ProductDialog';
    import { FilterDrawer } from '@/components/filters/FilterDrawer';
    import { Product, ProductFilter } from '@/types/product';
    import { filterProducts, paginateProducts } from '@/utils/productUtils';
    import { resetFilters } from '@/store/slices/filtersSlice';
    import { setViewMode } from '@/store/slices/viewModeSlice';

    const ITEMS_PER_PAGE = 6;

    export const ProductsPage: React.FC = () => {
      const navigate = useNavigate();
      const [page, setPage] = useState(1);
      const [drawerOpen, setDrawerOpen] = useState(false);
      const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
      const dispatch = useDispatch();

      const products = useSelector((state: RootState) => state.products.items);
      const categories = useSelector((state: RootState) =>
        state.categories.items.map(cat => cat.name)
      );
      const filters = useSelector((state: RootState) => state.filters);
      const viewMode = useSelector((state: RootState) => state.viewMode.mode);

      const handleProductClick = (product: Product) => {
        navigate(`/products/${product.id}`);
      };

      const filteredProducts = filterProducts(products, filters);
      const paginatedProducts = paginateProducts(
        filteredProducts,
        page,
        ITEMS_PER_PAGE
      );

      const handleResetFilters = () => {
        dispatch(resetFilters());
        setPage(1);
      };

      const handleViewModeChange = () => {
        dispatch(setViewMode(viewMode === 'card' ? 'table' : 'card'));
      };

      return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Products</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleViewModeChange}>
                {viewMode === 'card' ? <ViewListIcon /> : <ViewModuleIcon />}
              </IconButton>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddDialogOpen(true)}
              >
                Add Product
              </Button>
            </Box>
          </Box>

          <FilterDrawer
            open={drawerOpen}
            categories={categories}
            filters={filters}
            onFiltersChange={() => {}}
            onClose={() => setDrawerOpen(false)}
            onReset={handleResetFilters}
          />

          {filteredProducts.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <Typography variant="h6" color="textSecondary">
                No products found matching your criteria.
              </Typography>
            </Box>
          ) : viewMode === 'card' ? (
            <ProductList
              products={paginatedProducts}
              page={page}
              totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
              onPageChange={setPage}
              onProductClick={handleProductClick}
            />
          ) : (
            <>
              <ProductTable
                products={paginatedProducts}
                onProductClick={handleProductClick}
              />
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </>
          )}

          <ProductDialog
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
          />
        </Box>
      );
    };
