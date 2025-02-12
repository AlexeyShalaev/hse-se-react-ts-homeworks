import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
