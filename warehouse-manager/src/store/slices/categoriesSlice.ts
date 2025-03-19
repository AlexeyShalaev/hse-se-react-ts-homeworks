import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apiClient';
import { Category } from '@/types/product';

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
  groups: string[];
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
  groups: [],
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.getCategories();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategoryAsync = createAsyncThunk(
  'categories/createCategory',
  async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await apiClient.createCategory(category);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'categories/updateCategory',
  async (params: {id: string, category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>}, { rejectWithValue }) => {
    try {
      const response = await apiClient.updateCategory(params.id, params.category);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.deleteCategory(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create category';
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update category';
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete category';
      });
  },
});

export default categoriesSlice.reducer;
