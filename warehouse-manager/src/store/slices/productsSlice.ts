import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apiClient';
import { Product } from '@/types/product';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null; // Added selectedProduct
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null, // Initialize selectedProduct
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: {limit?: number, offset?: number}, { rejectWithValue }) => {
    try {
      const response = await apiClient.getProducts(params.limit, params.offset);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.getProductById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  'products/createProduct',
  async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await apiClient.createProduct(product);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (params: {id: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>}, { rejectWithValue }) => {
    try {
      const response = await apiClient.updateProduct(params.id, params.product);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.deleteProduct(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch product';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create product';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update product';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete product';
      });
  },
});

export const { addProduct, updateProduct, deleteProduct, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
