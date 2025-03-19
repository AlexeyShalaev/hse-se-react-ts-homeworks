import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  description: string;
  category: string;
  stock: number;
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
          description: product.description,
          category: product.category,
          stock: product.stock,
          price: product.price,
        }
      : {
          name: '',
          description: '',
          category: '',
          stock: 0,
          price: 0,
        }
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setNameError('Name is required');
      return;
    }
    if (!formData.description.trim()) {
      setDescriptionError('Description is required');
      return;
    }
    if (product) {
      await dispatch(updateProductAsync({ id: product.id, product: { ...formData } }));
    } else {
      await dispatch(createProductAsync({ ...formData }));
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
    if (name === 'description') {
      setDescriptionError(value.trim() ? null : 'Description is required');
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
          label="Description"
          fullWidth
          multiline
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!descriptionError}
          helperText={descriptionError}
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
          required
        />
        <TextField
          margin="dense"
          label="Price"
          fullWidth
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
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
            required
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
