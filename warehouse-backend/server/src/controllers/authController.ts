import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import User from '../models/User';
import config from '../config/default';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        // Register the user if not found
        const hashedPassword = bcrypt.hashSync(password, 10);
        user = new User({ email, password: hashedPassword });
        await user.save();
    } else if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ id: user._id, email: user.email, group: user.group }, config.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.json({ message: 'Logged in successfully' });
};

export const logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.sendStatus(204);
    }
    const user = await User.findOne({ refreshToken });
    if (user) {
        user.refreshToken = null;
        await user.save();
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
