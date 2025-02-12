import * as request from 'supertest';
import { app } from '../src/server';
import mongoose from 'mongoose';
import config from '../src/config/default';

beforeAll(async () => {
    await mongoose.connect(config.mongoURI);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Categories API', () => {
    let categoryId: string;

    it('should create a new category', async () => {
        const res = await request(app).post('/api/categories').send({
            name: 'Test Category',
        });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Category');
        categoryId = res.body.id;
        expect(categoryId).toBeDefined(); // Проверяем, что id присвоен
    });

    it('should get all categories', async () => {
        const res = await request(app).get('/api/categories');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a category by ID', async () => {
        expect(categoryId).toBeDefined();
        const res = await request(app).get(`/api/categories/${categoryId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(categoryId);
    });

    it('should update a category', async () => {
        expect(categoryId).toBeDefined();
        const res = await request(app).put(`/api/categories/${categoryId}`).send({
            name: 'Updated Category',
        });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Category');
    });

    it('should delete a category', async () => {
        expect(categoryId).toBeDefined();
        const res = await request(app).delete(`/api/categories/${categoryId}`);
        expect(res.status).toBe(200);
    });
});
