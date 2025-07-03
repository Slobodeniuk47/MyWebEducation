// server/api/controllers/courseController.ts
import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../../infrastructure/services/courseService';

const courseService = new CourseService();

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Простая валидация без DTO
    if (!req.body.title) {
      return res.status(400).json({ error: 'Поле title обязательно' });
    }
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const course = await courseService.updateCourse(id, req.body);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден или нет данных для обновления' });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const success = await courseService.deleteCourse(id);
    if (!success) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};