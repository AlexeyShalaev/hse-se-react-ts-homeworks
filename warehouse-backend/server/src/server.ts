import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/default';
import requestLogger from './middleware/requestLogger';
import errorHandler from './middleware/errorHandler';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import connectDB from './utils/db';
import logger from './config/logger';
import { setupSwagger } from './config/swagger';
import authRoutes from './routes/authRoutes';
import { authenticateJWT } from './middleware/authMiddleware';
import cookieParser from 'cookie-parser';

// Инициализация Express
const app = express();
const PORT = config.port;

// Подключение к MongoDB
connectDB().then(() => {
    logger.info('Connected to MongoDB');
}).catch(err => {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
});

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials
}));
app.use(helmet());
app.use(requestLogger);

// Swagger UI
setupSwagger(app);

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/products', authenticateJWT, productRoutes);
app.use('/api/categories', authenticateJWT, categoryRoutes);

// Глобальный обработчик ошибок
app.use(errorHandler);

// Запуск сервера
if (config.nodeEnv !== 'test') {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

export { app };
