import request from 'supertest';
import { app } from '../src/server';
import mongoose from 'mongoose';
import config from '../src/config/default';
import User from '../src/models/User';

beforeAll(async () => {
    await mongoose.connect(config.mongoURI);
    await User.deleteMany({}); // Clear users collection to avoid duplicate key errors
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth API', () => {
    it('should login a user', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'new_test_user@example.com',
            password: 'password123',
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Logged in successfully');
    });

    it('should logout a user', async () => {
        const res = await request(app).post('/api/auth/logout');
        expect(res.status).toBe(204);
        expect(res.body.message).toBeUndefined();
    });
});
