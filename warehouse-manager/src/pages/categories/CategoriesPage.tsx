import React, { useState } from 'react';
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
    } from '@mui/material';
    import EditIcon from '@mui/icons-material/Edit';
    import DeleteIcon from '@mui/icons-material/Delete';
    import AddIcon from '@mui/icons-material/Add';
    import { RootState } from '@/store/store';
    import { Category, addCategory, updateCategory, deleteCategory } from '@/store/slices/categoriesSlice';

    interface CategoryFormData {
      name: string;
      description: string;
    }

    export const CategoriesPage: React.FC = () => {
      const dispatch = useDispatch();
      const categories = useSelector((state: RootState) => state.categories.items);
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
      const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        description: '',
      });
      const [nameError, setNameError] = useState<string | null>(null);

      const handleOpenDialog = (category?: Category) => {
        if (category) {
          setSelectedCategory(category);
          setFormData({
            name: category.name,
            description: category.description || '',
          });
        } else {
          setSelectedCategory(null);
          setFormData({ name: '', description: '' });
        }
        setIsDialogOpen(true);
      };

      const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedCategory(null);
        setFormData({ name: '', description: '' });
        setNameError(null);
      };

      const handleSubmit = () => {
        if (!formData.name.trim()) {
          setNameError('Name is required');
          return;
        }
        if (selectedCategory) {
          dispatch(updateCategory({
            ...selectedCategory,
            name: formData.name,
            description: formData.description,
          }));
        } else {
          dispatch(addCategory({
            id: Date.now().toString(),
            name: formData.name,
            description: formData.description,
          }));
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

      const handleDelete = (id: string) => {
        dispatch(deleteCategory(id));
      };

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
            {categories.map((category) => (
              <ListItem
                key={category.id}
                sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}
              >
                <ListItemText
                  primary={category.name}
                  secondary={category.description}
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
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
