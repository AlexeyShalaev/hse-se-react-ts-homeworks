import { Request, Response } from 'express';
import axios from 'axios';
import { Post } from '../types/post';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await axios.get<Post>(`${BASE_URL}/posts/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};