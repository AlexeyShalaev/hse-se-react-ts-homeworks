import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Product } from '@/types/product';

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  product,
  open,
  onClose,
}) => {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <img
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        </Box>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Category: {product.category}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Quantity: {product.quantity} {product.unit}
        </Typography>
        <Typography variant="body1">
          {product.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};