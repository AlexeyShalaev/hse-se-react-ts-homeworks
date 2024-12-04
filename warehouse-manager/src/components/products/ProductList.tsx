import React from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onProductClick: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  page,
  totalPages,
  onPageChange,
  onProductClick,
}) => {
  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              onClick={onProductClick}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};