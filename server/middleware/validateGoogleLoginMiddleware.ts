import { Request, Response, NextFunction } from 'express';

const allowedProviders = ['google']; // сюда можно добавить других провайдеров, например 'facebook', 'apple' и т.д.

export const validateGoogleLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, provider } = req.body;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Отсутствует или некорректный token' });
  }

  if (!provider || typeof provider !== 'string') {
    return res.status(400).json({ error: 'Отсутствует или некорректный provider' });
  }

  if (!allowedProviders.includes(provider.toLowerCase())) {
    return res.status(400).json({ error: `Провайдер '${provider}' не поддерживается` });
  }

  next();
};