// server/routes/courseRoutes.ts
import { Router, RequestHandler } from 'express';
import { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } from '../api/controllers/courseController';
import { authMiddleware } from '../middleware/authMiddleware';

const courseRouter = Router();

courseRouter.post('/', authMiddleware, createCourse);
courseRouter.get('/:id', getCourse);
courseRouter.get('/', getAllCourses);
courseRouter.put('/:id', authMiddleware, updateCourse);
courseRouter.delete('/:id', authMiddleware, deleteCourse);

export default courseRouter;