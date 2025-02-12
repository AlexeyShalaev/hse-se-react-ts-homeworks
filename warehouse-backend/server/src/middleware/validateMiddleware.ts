import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import logger from '../config/logger';

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            logger.error(error.message);
            return res.status(400).json({ error: error.details.map((d) => d.message) });
        }
        next();
    };
};
