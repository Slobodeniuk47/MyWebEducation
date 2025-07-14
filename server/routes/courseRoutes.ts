// server/routes/courseRoutes.ts
import { Router, RequestHandler } from 'express';
import { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } from '../api/controllers/courseController';
import { authMiddleware } from '../middleware/authMiddleware';

const courseRouter = Router();

courseRouter.post('/create/', authMiddleware, createCourse);
courseRouter.get('/getById/:id', getCourse);
courseRouter.get('/getAll', getAllCourses);
courseRouter.put('/updateById/:id', authMiddleware, updateCourse);
courseRouter.delete('/deleteById/:id', authMiddleware, deleteCourse);

export default courseRouter;