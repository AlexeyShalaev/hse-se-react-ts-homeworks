import * as swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Warehouse Management API',
            version: '1.0.0',
            description: 'API for managing products and categories',
        },
        servers: [{ url: 'http://localhost:5000' }],
    },
    apis: ['./src/routes/*.ts'], // Путь к файлам с аннотациями API
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger Docs available at http://localhost:5000/api/docs');
};
