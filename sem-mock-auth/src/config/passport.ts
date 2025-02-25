import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const mockUser = {
  id: '1',
  username: 'user',
  password: bcrypt.hashSync('password', 10),
};

passport.use(
  new LocalStrategy(async (username: string, password: string | Buffer<ArrayBufferLike>, done) => {
    if (username !== mockUser.username) return done(null, false, { message: 'Invalid username' });

    const isValid = await bcrypt.compare(password, mockUser.password);
    return isValid ? done(null, mockUser) : done(null, false, { message: 'Invalid password' });
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
    },
    (jwtPayload: any, done: (arg0: null, arg1: any) => any) => {
      return done(null, jwtPayload);
    }
  )
);

export default passport;
