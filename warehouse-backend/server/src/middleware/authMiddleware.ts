import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/default';
import logger from '../config/logger';

export interface AuthenticatedRequest extends Request { // Define custom type
    user?: any;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const ip = req.ip;

    if (!token) {
        logger.error('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            logger.error(err.message);
            return res.sendStatus(403);
        }
        const decodedUser = user as jwt.JwtPayload; // Cast user to JwtPayload
        if (decodedUser.ip !== ip) {
            logger.error('IP address mismatch');
            return res.sendStatus(403);
        }
        req.user = decodedUser;
        next();
    });
};
