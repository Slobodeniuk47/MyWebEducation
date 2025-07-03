// server/routes/authRoutes.ts
import { Router, Request, Response } from 'express';
import passport from 'passport';
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';

// Инициализация стратегии Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      // Здесь можно найти или создать пользователя в БД по profile.id
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

const router = Router();

// Запрос авторизации Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Коллбэк после успешной авторизации Google
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    // Локально кастим тип req.user, т.к. TypeScript не знает, что там есть user
    const user = req.user as Profile | undefined;

    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.emails?.[0].value,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token });
  }
);

export default router;
