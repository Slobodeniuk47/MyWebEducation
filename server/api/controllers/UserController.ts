import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../infrastructure/services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { GoogleExternalLoginDto } from '../../infrastructure/dtos/googleExternalLoginDto';

const userService = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Поле email обязательно' });

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, roles } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email и пароль обязательны' });

    const existing = await userService.getUserByEmail(email);
    if (existing)
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });

    const user = await userService.createUser({ email, password, name, roles });

    const token = jwt.sign(
      { id: user?.id, email: user?.email },
      process.env.JWT_SECRET ?? 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email и пароль обязательны' });

    const user = await userService.getUserByEmail(email);
    if (!user?.password) return res.status(401).json({ error: 'Неверный email или пароль' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Неверный email или пароль' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req: Request<{}, {}, GoogleExternalLoginDto>, res: Response, next: NextFunction) => {
  try {
    const { token, provider } = req.body;
    if (!token || !provider) {
      return res.status(400).json({ error: 'Token и provider обязательны' });
    }

    const user = await userService.googleExternalLogin({ token, provider });

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token: jwtToken, user });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Некорректный ID' });

    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Некорректный ID' });

    const user = await userService.updateUser(id, req.body);
    if (!user)
      return res.status(404).json({ error: 'Пользователь не найден или нечего обновлять' });

    res.json(user);
  } catch (error: any) {
    if (error.message?.startsWith('Unknown roles:')) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Некорректный ID' });

    const success = await userService.deleteUser(id);
    if (!success) return res.status(404).json({ error: 'Пользователь не найден' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
