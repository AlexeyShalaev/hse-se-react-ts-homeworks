import express from 'express';
import userRouter from './routes/users/getUsers';
import { initMongo } from './utils/mongo/connect';
import cors from 'cors';
import { Server } from 'socket.io';
import { assignMessagesToSocket } from './socket/messages';

const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);

// Инициализация и сохранение клиента в app.locals
initMongo()
    .then((client) => {
        app.locals.mongoClient = client;
        return app.listen(port, () => {
            console.log('Server started on port 3000');
        });
    })
    .then(expressServer =>{
        const socket = new Server(expressServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', "DELETE", "PATCH"],
            }
        });

        assignMessagesToSocket(socket);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Graceful shutdown
process.on('SIGINT', async () => {
    const { mongoClient } = app.locals;
    await mongoClient.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});