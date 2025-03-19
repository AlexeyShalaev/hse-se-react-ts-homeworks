import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { RootState, useAppDispatch } from '@/store/store';
import { Category, fetchCategories, createCategoryAsync, updateCategoryAsync, deleteCategoryAsync } from '@/store/slices/categoriesSlice';

interface CategoryFormData {
  name: string;
  groups: string[]; // Add groups field
}

export const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.categories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    groups: [], // Initialize groups
  });
  const [nameError, setNameError] = useState<string | null>(null);

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        groups: category.groups || [], // Set groups
      });
    } else {
      setSelectedCategory(null);
      setFormData({ name: '', groups: [] }); // Reset groups
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
    setFormData({ name: '', groups: [] }); // Reset groups
    setNameError(null);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setNameError('Name is required');
      return;
    }
    if (selectedCategory) {
      await dispatch(updateCategoryAsync({id: selectedCategory.id, category: {...formData}}));
    } else {
      await dispatch(createCategoryAsync({...formData}));
    }
    handleCloseDialog();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'name') {
      setNameError(value.trim() ? null : 'Name is required');
    }
  };

  const handleGroupsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, groups: value.split(',').map(group => group.trim()) });
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteCategoryAsync(id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      <CircularProgress />
    </Box>;
  }

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      <Typography variant="h6" color="error">Error: {error}</Typography>
    </Box>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Categories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Category
        </Button>
      </Box>

      <List>
        {items.map((category) => (
          <ListItem
            key={category.id}
            sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}
          >
            <ListItemText
              primary={category.name}
              secondary={`Groups: ${category.groups.join(', ')}`} // Display groups
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleOpenDialog(category)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleDelete(category.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!nameError}
            helperText={nameError}
            required
            name="name"
          />
          <TextField
            margin="dense"
            label="Groups (comma separated)"
            fullWidth
            value={formData.groups.join(', ')}
            onChange={handleGroupsChange}
            name="groups"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCategory ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
