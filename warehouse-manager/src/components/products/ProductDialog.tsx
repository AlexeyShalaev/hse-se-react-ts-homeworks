import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/types/product';
import { createProductAsync, updateProductAsync } from '@/store/slices/productsSlice';
import { RootState } from '@/store/store';

interface ProductDialogProps {
  product?: Product | null;
  open: boolean;
  onClose: () => void;
}

interface ProductFormData {
  name: string;
  stock: number;
  unit: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  product,
  open,
  onClose,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.items);
  const [formData, setFormData] = useState<ProductFormData>(
    product
      ? {
          name: product.name,
          stock: product.stock,
          //unit: product.unit,
          description: product.description,
          //imageUrl: product.imageUrl || '',
          category: product.category,
          price: product.price,
        }
      : {
          name: '',
          stock: 0,
          //unit: 'pcs',
          description: '',
          //imageUrl: '',
          category: '',
          price: 0,
        }
  );
  const [nameError, setNameError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setNameError('Name is required');
      return;
    }
    if (product) {
      await dispatch(updateProductAsync({id: product.id, product: {...formData}}));
    } else {
      await dispatch(createProductAsync({...formData}));
    }
    onClose();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: name === 'stock' || name === 'price' ? parseFloat(value) : value });
    if (name === 'name') {
      setNameError(value.trim() ? null : 'Name is required');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {product ? 'Edit Product' : 'Add Product'}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Product Name"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!nameError}
          helperText={nameError}
          required
        />
        <TextField
          margin="dense"
          label="Stock"
          fullWidth
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Price"
          fullWidth
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="unit-select-label">Unit</InputLabel>
          <Select
            labelId="unit-select-label"
            id="unit-select"
            name="unit"
            value={formData.unit}
            label="Unit"
            onChange={handleChange}
          >
            <MenuItem value="pcs">pcs</MenuItem>
            <MenuItem value="boxes">boxes</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Image URL"
          fullWidth
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            name="category"
            value={formData.category}
            label="Category"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {product ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
