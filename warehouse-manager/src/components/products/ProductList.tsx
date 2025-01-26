import React from 'react';
    import { Grid, Pagination, Box, Skeleton } from '@mui/material';
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
      const isLoading = products.length === 0;
      const skeletonCount = 6;

      return (
        <Box sx={{ py: 2 }}>
          <Grid container spacing={3}>
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Skeleton variant="rectangular" height={250} />
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  </Grid>
                ))
              : products.map((product) => (
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
