// server/infrastructure/dtos/courseDto.ts
export class CourseDto {
  title: string='';
  description?: string;
  duration?: string;
  price?: number;
  sale?: number;
  authorId?: number;
}