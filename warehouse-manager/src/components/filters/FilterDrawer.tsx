import React from 'react';
    import {
      Drawer,
      TextField,
      FormControlLabel,
      Checkbox,
      Autocomplete,
      Button,
      Box,
      IconButton,
      styled,
    } from '@mui/material';
    import CloseIcon from '@mui/icons-material/Close';
    import { ProductFilter } from '@/types/product';
    import { useDispatch } from 'react-redux';
    import { updateFilters, resetFilters } from '@/store/slices/filtersSlice';
    import { useNavigate } from 'react-router-dom';

    const DrawerWidth = 280;

    const StyledDrawer = styled(Drawer)(({ theme }) => ({
      width: DrawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: DrawerWidth,
        boxSizing: 'border-box',
        padding: theme.spacing(2),
      },
    }));

    interface FilterDrawerProps {
      open: boolean;
      categories: string[];
      filters: ProductFilter;
      onClose: () => void;
      onReset: () => void;
    }

    export const FilterDrawer: React.FC<FilterDrawerProps> = ({
      open,
      categories,
      filters,
      onClose,
      onReset,
    }) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFilters({ ...filters, search: event.target.value }));
      };

      const handleNonZeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFilters({ ...filters, showNonZero: event.target.checked }));
      };

      const handleCategoryChange = (_: any, value: string | null) => {
        dispatch(updateFilters({ ...filters, category: value }));
      };

      const handleApply = () => {
        navigate('/');
        onClose();
      };

      const handleReset = () => {
        dispatch(resetFilters());
        onReset();
        onClose();
      };

      return (
        <StyledDrawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={onClose}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            label="Search products"
            value={filters.search}
            onChange={handleSearchChange}
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={filters.showNonZero}
                onChange={handleNonZeroChange}
              />
            }
            label="Show non-zero quantity only"
          />

          <Autocomplete
            options={categories}
            value={filters.category}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField {...params} label="Category" margin="normal" />
            )}
          />

          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
              fullWidth
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              fullWidth
            >
              Reset
            </Button>
          </Box>
        </StyledDrawer>
      );
    };
