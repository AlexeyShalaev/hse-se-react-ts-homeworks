import axios from 'axios';
import { Product, Category } from '@/types/product';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API calls
export const getProducts = async (limit?: number, offset?: number): Promise<Product[]> => {
  const params = { limit, offset };
  const response = await axiosClient.get('/products', { params });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const response = await axiosClient.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const response = await axiosClient.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axiosClient.delete(`/products/${id}`);
};

// Category API calls
export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get('/categories');
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await axiosClient.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const response = await axiosClient.post('/categories', category);
  return response.data;
};

export const updateCategory = async (id: string, category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const response = await axiosClient.put(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axiosClient.delete(`/categories/${id}`);
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
};
