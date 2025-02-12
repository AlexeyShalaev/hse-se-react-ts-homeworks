import * as morgan from 'morgan';
import logger from '../config/logger';

// Создаём middleware для логирования запросов в stdout
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: { write: (message: string) => logger.info(message.trim()) },
});

export default requestLogger;
