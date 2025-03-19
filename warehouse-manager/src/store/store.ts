import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer, { fetchProducts } from './slices/productsSlice';
import categoriesReducer, { fetchCategories } from './slices/categoriesSlice';
import userReducer from './slices/userSlice';
import filtersReducer from './slices/filtersSlice';
import viewModeReducer from './slices/viewModeSlice';
import authReducer from './slices/authSlice';

const productsPersistConfig = {
  key: 'products',
  storage,
};

const categoriesPersistConfig = {
  key: 'categories',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

const filtersPersistConfig = {
  key: 'filters',
  storage,
};

const viewModePersistConfig = {
  key: 'viewMode',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    products: persistReducer(productsPersistConfig, productsReducer),
    categories: persistReducer(categoriesPersistConfig, categoriesReducer),
    user: persistReducer(userPersistConfig, userReducer),
    filters: persistReducer(filtersPersistConfig, filtersReducer),
    viewMode: persistReducer(viewModePersistConfig, viewModeReducer),
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
