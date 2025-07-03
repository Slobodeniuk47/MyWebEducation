// server/routes/courseRoutes.ts
import { Router, RequestHandler } from 'express';
import { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } from '../api/controllers/courseController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createCourse as RequestHandler);
router.get('/:id', getCourse as RequestHandler);
router.get('/', getAllCourses as RequestHandler);
router.put('/:id', authMiddleware, updateCourse as RequestHandler);
router.delete('/:id', authMiddleware, deleteCourse as RequestHandler);

export default router;