// server/routes/userRoutes.ts
import { Router } from 'express';
// import { createUser, getUser, getAllUsers, updateUser, deleteUser, login } from '../api/controllers/userController';
import * as userController from '../api/controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.get('/getById/:id', authMiddleware, userController.getUser);
userRouter.get('/getAll', authMiddleware, userController.getAllUsers);
userRouter.put('/updateById/:id', authMiddleware, userController.updateUser);
userRouter.delete('/deleteById/:id', authMiddleware, userController.deleteUser);

export default userRouter;
