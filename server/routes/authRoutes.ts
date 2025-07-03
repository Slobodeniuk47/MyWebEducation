// server/routes/authRoutes.ts
import { Router, RequestHandler } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:5000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Найти или создать пользователя в базе
  // Например: userService.getUserByGoogleId(profile.id)
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req: Request, res: Response) => {
  const token = jwt.sign({ id: req.user?.id, email: req.user?.emails[0].value }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

export default router;