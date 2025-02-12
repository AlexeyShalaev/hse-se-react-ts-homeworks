import { Request, Response } from 'express';
import Product from '../models/Product';
import logger from '../config/logger';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        logger.info(`Product created: ${product.name}`);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const products = await Product.find()
            .skip(Number(offset))
            .limit(Number(limit));
        logger.info(`Products fetched: ${products.length}`);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        logger.info(`Product fetched: ${product.name}`);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        logger.info(`Product updated: ${product.name}`);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        logger.info(`Product deleted: ${product.name}`);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
