import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialCategories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories' },
  { id: '2', name: 'Furniture', description: 'Office and home furniture' },
  { id: '3', name: 'Food', description: 'Food and beverages' },
  { id: '4', name: 'Clothing', description: 'Apparel and accessories' },
];

const initialState: CategoriesState = {
  items: initialCategories,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
