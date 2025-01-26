import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: mockProducts,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
