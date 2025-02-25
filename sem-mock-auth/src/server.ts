import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import { errorMiddleware } from './middlewares/exception.middleware';
import { logMiddleware } from './middlewares/logger.middleware';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import './config/passport';

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(logMiddleware);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'Auth API', version: '1.0.0', description: 'Simple Auth API' },
    servers: [{ url: 'http://localhost:5000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [__dirname + '/routes/*.ts'],
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRoutes);
app.use('/', profileRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
