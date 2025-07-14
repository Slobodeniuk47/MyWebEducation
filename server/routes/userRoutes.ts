// server/routes/userRoutes.ts
import { Router } from 'express';
// import { createUser, getUser, getAllUsers, updateUser, deleteUser, login } from '../api/controllers/userController';
import * as userController from '../api/controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateGoogleLoginMiddleware } from '../middleware/validateGoogleLoginMiddleware';

const userRouter = Router();

userRouter.post('/googleLogin', validateGoogleLoginMiddleware, userController.googleLogin);
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.login);
userRouter.get('/getById/:id', authMiddleware, userController.getUser);
userRouter.get('/getAll', authMiddleware, userController.getAllUsers);
userRouter.post('/create', authMiddleware, userController.createUser);
userRouter.put('/updateById/:id', authMiddleware, userController.updateUser);
userRouter.delete('/deleteById/:id', authMiddleware, userController.deleteUser);

export default userRouter;
