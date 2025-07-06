// core/entities/courseEntity.ts

export interface Course {
  id?: number;
  title: string;
  description?: string;
  duration?: string;
  price?: number;
  sale?: number;
  authorId?: number;
  createdAt?: string; // строка, т.к. с сервера приходит ISO-дата
}

