import request from 'supertest';
import { app } from '../src/server';
import mongoose from 'mongoose';
import config from '../src/config/default';
import User from '../src/models/User';

let token: string;
let categoryId: string;

beforeAll(async () => {
    await mongoose.connect(config.mongoURI);
    await User.deleteMany({});
   
    const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
    }).set('X-Forwarded-For', '127.0.0.1'); // Set IP address
    token = res.headers['set-cookie'].find(cookie => cookie.startsWith('accessToken')).split(';')[0].split('=')[1];
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Categories API', () => {
    it('should create a new category', async () => {
        const res = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .set('X-Forwarded-For', '127.0.0.1') // Set IP address
            .send({
                name: 'Test Category',
                groups: ['user', 'admin'], // Add groups field
            });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Category');
        categoryId = res.body.id;
        expect(categoryId).toBeDefined();
    });

    it('should get all categories', async () => {
        const res = await request(app)
            .get('/api/categories')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a category by ID', async () => {
        expect(categoryId).toBeDefined();
        const res = await request(app)
            .get(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(categoryId);
    });

    it('should update a category', async () => {
        expect(categoryId).toBeDefined();
        const res = await request(app)
            .put(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Category',
                groups: ['user', 'admin'], // Add groups field
            });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Category');
    });

    it('should delete a category', async () => {
        expect(categoryId).toBeDefined();
        const res = await request(app)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
