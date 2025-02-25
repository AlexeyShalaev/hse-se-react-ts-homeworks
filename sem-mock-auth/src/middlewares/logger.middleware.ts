import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.info(`[${req.method}] ${req.path}`);
  next();
}

export default logger;
