import axios from 'axios';
import { Product, Category } from '@/types/product';
import { store } from './store'; // Import the store

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Allow setting cookies
});

apiClient.interceptors.request.use((config) => {
  // const accessToken = Cookies.get('accessToken'); // Remove this line
  const accessToken = store.getState().auth.accessToken; // Get access token from state
  console.log('accessToken', accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Product API calls
export const getProducts = async (limit?: number, offset?: number): Promise<Product[]> => {
  const params = { limit, offset };
  const response = await apiClient.get('/products', { params });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const response = await apiClient.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const response = await apiClient.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

// Category API calls
export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await apiClient.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const response = await apiClient.post('/categories', category);
  return response.data;
};

export const updateCategory = async (id: string, category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const response = await apiClient.put(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};

// Auth API calls
export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response;
};

export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response;
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  login,
  logout,
};
