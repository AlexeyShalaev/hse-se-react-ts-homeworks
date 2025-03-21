import request from 'supertest';
import { app } from '../src/server';
import mongoose from 'mongoose';
import config from '../src/config/default';
import User from '../src/models/User';
import Category from '../src/models/Category';


let token: string;
let productId: string;
let categoryId: string;

beforeAll(async () => {
    await mongoose.connect(config.mongoURI);
    await User.deleteMany({});

    // Create Category
    const category = new Category({ name: 'Test Category for Products', groups: ['user', 'admin'] });
    await category.save();
    categoryId = category.id;
    
    const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
    }).set('X-Forwarded-For', '127.0.0.1'); // Set IP address
    token = res.headers['set-cookie'].find(cookie => cookie.startsWith('accessToken')).split(';')[0].split('=')[1];
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Products API', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .set('X-Forwarded-For', '127.0.0.1') // Set IP address
            .send({
                name: 'Test Product',
                description: 'A test product',
                category: categoryId.toString(),
                stock: 100,
                price: 99.99,
            });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Product');
        productId = res.body.id;
        expect(productId).toBeDefined();
    });

    it('should get all products', async () => {
        const res = await request(app)
            .get('/api/products')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a product by ID', async () => {
        expect(productId).toBeDefined();
        const res = await request(app)
            .get(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(productId);
    });

    it('should update a product', async () => {
        expect(productId).toBeDefined();
        const res = await request(app)
            .put(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Product',
                description: 'An updated product description',
                category: categoryId.toString(),
                stock: 50,
                price: 49.99,
            });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Product');
    });

    it('should delete a product', async () => {
        expect(productId).toBeDefined();
        const res = await request(app)
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
