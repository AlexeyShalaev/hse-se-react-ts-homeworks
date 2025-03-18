import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/default';
import logger from '../config/logger';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        logger.error('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            logger.error(err.message);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
