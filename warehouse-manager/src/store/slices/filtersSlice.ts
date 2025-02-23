import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductFilter } from '@/types/product';

const initialState: ProductFilter = {
  search: '',
  showNonZero: false,
  category: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<ProductFilter>) => {
      state.search = action.payload.search;
      state.showNonZero = action.payload.showNonZero;
      state.category = action.payload.category;
    },
    resetFilters: (state) => {
      state.search = '';
      state.showNonZero = false;
      state.category = null;
    },
  },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
