// server/api/controllers/userController.ts
import express from 'express';
import { UserService } from '../../infrastructure/services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserPayload } from '../../types/express';

const userService = new UserService();

export const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ error: 'Поле email обязательно' });
    }
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }
    const user = await userService.getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const user = await userService.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден или нет данных для обновления' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const success = await userService.deleteUser(id);
    if (!success) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};