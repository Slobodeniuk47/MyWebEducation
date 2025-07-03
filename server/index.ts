import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'session-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);

// Глобальный обработчик ошибок
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
