import * as request from 'supertest';
import { app } from '../src/server';
import mongoose from 'mongoose';
import config from '../src/config/default';

beforeAll(async () => {
    await mongoose.connect(config.mongoURI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Products API', () => {
    let productId: string;

    it('should create a new product', async () => {
        const res = await request(app).post('/api/products').send({
            name: 'Test Product',
            description: 'A test product description',
            category: new mongoose.Types.ObjectId().toString(), // Генерируем ID категории
            stock: 100,
            price: 99.99,
        });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Product');
        productId = res.body.id;
        expect(productId).toBeDefined(); // Проверяем, что id присвоен
    });

    it('should get all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a product by ID', async () => {
        expect(productId).toBeDefined(); // Проверяем перед GET-запросом
        const res = await request(app).get(`/api/products/${productId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(productId);
    });

    it('should update a product', async () => {
        expect(productId).toBeDefined(); // Проверяем перед PUT-запросом
        const res = await request(app).put(`/api/products/${productId}`).send({
            name: 'Updated Product',
            description: 'An updated product description',
            category: new mongoose.Types.ObjectId().toString(), // Генерируем ID категории
            stock: 100,
            price: 99.99,
        });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Product');
    });

    it('should delete a product', async () => {
        expect(productId).toBeDefined(); // Проверяем перед DELETE-запросом
        const res = await request(app).delete(`/api/products/${productId}`);
        expect(res.status).toBe(200);
    });
});
