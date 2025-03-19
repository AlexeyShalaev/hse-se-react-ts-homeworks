import { Request, Response } from 'express';
import Category from '../models/Category';
import logger from '../config/logger';
import { AuthenticatedRequest } from '../middleware/authMiddleware'; // Import custom type

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = new Category(req.body);
        await category.save();
        logger.info(`Category created: ${category.name}`);
        res.status(201).json(category);
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

export const getCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        logger.info(`Categories fetched: ${categories.length}`);
        res.json(categories);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

const checkUserAccess = async (userGroup: string, categoryId: string) => {
    const category = await Category.findById(categoryId);
    if (!category) return false;
    return category.groups.includes(userGroup) || userGroup === 'admin';
};

export const getCategoryById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const hasAccess = await checkUserAccess(req.user.group, req.params.id);
        if (!hasAccess) return res.status(403).json({ message: 'Access denied' });

        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        logger.info(`Category fetched: ${category.name}`);
        res.json(category);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const hasAccess = await checkUserAccess(req.user.group, req.params.id);
        if (!hasAccess) return res.status(403).json({ message: 'Access denied' });

        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        logger.info(`Category updated: ${category.name}`);
        res.json(category);
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

export const deleteCategory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const hasAccess = await checkUserAccess(req.user.group, req.params.id);
        if (!hasAccess) return res.status(403).json({ message: 'Access denied' });

        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        logger.info(`Category deleted: ${category.name}`);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
