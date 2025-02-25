import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../services/auth.service';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       400:
 *         description: Неверные учетные данные
 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: any, user: { id: string; username: string; }) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
  })(req, res, next);
});

export default router;
