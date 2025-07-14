// server/infrastructure/services/courseService.ts
import { pool } from '../../core/db'; // твой экземпляр подключения к db
import { CourseEntity } from '../../core/entities/courseEntity';

export class CourseService {
  async createCourse(course: CourseEntity): Promise<CourseEntity> {
    const result = await pool.query(
      `INSERT INTO courses (title, description, duration, price, sale, author_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        course.title,
        course.description || null,
        course.duration || null,
        course.price || null,
        course.sale || null,
        course.authorId || null,
      ]
    );
    return result.rows[0];
  }

  async getCourseById(id: number): Promise<CourseEntity | null> {
    const result = await pool.query(`SELECT * FROM courses WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  async getAllCourses(): Promise<CourseEntity[]> {
    const result = await pool.query(`SELECT * FROM courses`);
    return result.rows;
  }

  async updateCourse(id: number, course: Partial<CourseEntity>): Promise<CourseEntity | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (course.title) {
      fields.push(`title = $${idx++}`);
      values.push(course.title);
    }
    if (course.description !== undefined) {
      fields.push(`description = $${idx++}`);
      values.push(course.description);
    }
    if (course.duration !== undefined) {
      fields.push(`duration = $${idx++}`);
      values.push(course.duration);
    }
    if (course.price !== undefined) {
      fields.push(`price = $${idx++}`);
      values.push(course.price);
    }
    if (course.sale !== undefined) {
      fields.push(`sale = $${idx++}`);
      values.push(course.sale);
    }
    if (course.authorId !== undefined) {
      fields.push(`author_id = $${idx++}`);
      values.push(course.authorId);
    }

    if (fields.length === 0) return null; // Нечего обновлять

    values.push(id);
    const query = `UPDATE courses SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async deleteCourse(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM courses WHERE id = $1`, [id]);
    return (result?.rowCount ?? 0) > 0;
  }
}