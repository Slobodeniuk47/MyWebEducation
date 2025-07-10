import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosJSON } from '../../../api/axios';
import { Course } from '../../../types/course';

export default function AdminCourseCreate() {
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    duration: '',
    price: 0,
    sale: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'sale' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosJSON.post('/courses/create', course);
      navigate('/admin/courses');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Создать курс</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={course.title} onChange={handleChange} placeholder="Название" required />
        <textarea name="description" value={course.description} onChange={handleChange} placeholder="Описание" />
        <input type="text" name="duration" value={course.duration} onChange={handleChange} placeholder="Длительность" />
        <input type="number" name="price" value={course.price} onChange={handleChange} placeholder="Цена" />
        <input type="number" name="sale" value={course.sale} onChange={handleChange} placeholder="Скидка (%)" />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}
