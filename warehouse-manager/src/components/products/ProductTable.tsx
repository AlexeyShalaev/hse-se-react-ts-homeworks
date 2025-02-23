import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Box,
  Skeleton,
} from '@mui/material';
import { Product } from '@/types/product';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const StyledTableContainer = styled(TableContainer)({
  overflowX: 'auto',
});

const StyledImage = styled('img')({
  maxWidth: '50px',
  maxHeight: '50px',
  borderRadius: '4px',
});

interface ProductTableProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onProductClick,
}) => {
  const isLoading = products.length === 0;
  const skeletonRows = 5;
  const categories = useSelector((state: RootState) => state.categories.items);

  const getCategoryById = (categoryId: string): string | undefined => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : undefined;
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="products table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from({ length: skeletonRows }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="circular" width={40} height={40} />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            : products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  onClick={() => onProductClick(product)}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <StyledImage
                        src={product.imageUrl || '/placeholder.png'}
                        alt={product.name}
                      />
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{getCategoryById(product.category) || 'Unknown'}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
