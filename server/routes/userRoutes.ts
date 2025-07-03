// server/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser, login } from '../api/controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.post('/login', login);
userRouter.get('/:id', authMiddleware, getUser);
userRouter.get('/', authMiddleware, getAllUsers);
userRouter.put('/:id', authMiddleware, updateUser);
userRouter.delete('/:id', authMiddleware, deleteUser);

export default userRouter;
