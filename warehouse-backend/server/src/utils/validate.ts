import * as Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    category: Joi.string().hex().length(24).required(), // ID категории
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
});

export const categorySchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    groups: Joi.array().items(Joi.string()).required(), // Add groups validation
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
