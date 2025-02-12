import * as winston from 'winston';

// Определяем формат логирования
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
);

// Создаём Winston-логгер с выводом только в stdout
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [new winston.transports.Console()],
});

export default logger;
