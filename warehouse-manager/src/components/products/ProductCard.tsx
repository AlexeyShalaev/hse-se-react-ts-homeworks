import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  styled,
} from '@mui/material';
import { Product } from '@/types/product';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const ProductDescription = styled(Typography)({
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Tooltip title={product.description}>
      <StyledCard onClick={() => onClick(product)}>
        <CardMedia
          component="img"
          height="250"
          image={product.imageUrl || '/placeholder.png'}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {product.quantity} {product.unit}
          </Typography>
          <ProductDescription variant="body2" color="text.secondary">
            {product.description}
          </ProductDescription>
        </CardContent>
      </StyledCard>
    </Tooltip>
  );
};