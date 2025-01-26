import React, { useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux';
    import {
      Box,
      Button,
      Typography,
      Dialog,
      IconButton,
      styled,
    } from '@mui/material';
    import ArrowBackIcon from '@mui/icons-material/ArrowBack';
    import { RootState } from '@/store/store';
    import { deleteProduct } from '@/store/slices/productsSlice';
    import { ProductDialog } from '@/components/products/ProductDialog';

    const BackButton = styled(IconButton)(({ theme }) => ({
      marginRight: theme.spacing(1),
    }));

    export const ProductDetailsPage: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      const product = useSelector((state: RootState) =>
        state.products.items.find(item => item.id === id)
      );

      if (!product) {
        return (
          <Box sx={{ p: 3 }}>
            <Typography>Product not found</Typography>
            <Button onClick={() => navigate('/')}>Back to Products</Button>
          </Box>
        );
      }

      const handleDelete = () => {
        dispatch(deleteProduct(product.id));
        navigate('/');
      };

      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BackButton onClick={() => navigate('/')}>
                <ArrowBackIcon />
              </BackButton>
              <Typography variant="h4">{product.name}</Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditDialogOpen(true)}
                sx={{ mr: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <img
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Box>

          <Typography variant="h6" gutterBottom>Details</Typography>
          <Typography variant="body1" gutterBottom>Category: {product.category}</Typography>
          <Typography variant="body1" gutterBottom>Quantity: {product.quantity} {product.unit}</Typography>
          <Typography variant="body1" gutterBottom>Description: {product.description}</Typography>

          <ProductDialog
            product={product}
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
          />
        </Box>
      );
    };
