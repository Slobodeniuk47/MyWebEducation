// server/routes/userRoutes.ts
import { Router, RequestHandler } from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser, login } from '../api/controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', createUser as RequestHandler);
router.post('/login', login as RequestHandler);
router.get('/:id', authMiddleware, getUser as RequestHandler);
router.get('/', authMiddleware, getAllUsers as RequestHandler);
router.put('/:id', authMiddleware, updateUser as RequestHandler);
router.delete('/:id', authMiddleware, deleteUser as RequestHandler);

export default router;