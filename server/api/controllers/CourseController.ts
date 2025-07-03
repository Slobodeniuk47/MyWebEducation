// server/api/controllers/courseController.ts
import express from 'express';
import { CourseService } from '../../infrastructure/services/courseService';

const courseService = new CourseService();

export const createCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: 'Поле title обязательно' });
    }
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Некорректный ID' });
    }
    const course = await courseService.updateCourse(id, req.body);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден или нет данных для обновления' });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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