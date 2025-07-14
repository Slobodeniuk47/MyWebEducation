// core/entities/courseEntity.ts

export interface CourseEntity {
  id?: number;
  title: string;
  description?: string;
  duration?: string;
  price?: number;
  sale?: number;       // скидка в процентах: 0–100
  authorId?: number;   // id пользователя, который создал курс
  createdAt?: Date;    //автоустанавливается PostgreSQL через DEFAULT CURRENT_TIMESTAMP.
}
