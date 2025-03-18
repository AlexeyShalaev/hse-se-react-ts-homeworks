import { Router } from 'express';
import { login, logout } from '../controllers/authController';
import { validateRequest } from '../middleware/validateMiddleware';
import { loginSchema } from '../utils/validate';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for user authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', validateRequest(loginSchema), login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       204:
 *         description: No content
 */
router.post('/logout', logout);

export default router;
