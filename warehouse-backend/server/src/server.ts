import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import config from './config/default';
import requestLogger from './middleware/requestLogger';
import errorHandler from './middleware/errorHandler';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import connectDB from './utils/db';
import logger from './config/logger';
import { setupSwagger } from './config/swagger';

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
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestLogger);

// Swagger UI
setupSwagger(app);

// Маршруты
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Глобальный обработчик ошибок
app.use(errorHandler);

// Запуск сервера
if (config.nodeEnv !== 'test') {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

export { app };
