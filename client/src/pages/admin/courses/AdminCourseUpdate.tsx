import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosJSON } from '../../../api/axios';
import { Course } from '../../../types/course';

export default function AdminCourseUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    axiosJSON.get(`/courses/getById/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!course) return;
    setCourse({
      ...course,
      [name]: name === 'price' || name === 'sale' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosJSON.put(`/courses/updateById/${id}`, course);
      navigate('/admin/courses');
    } catch (err) {
      console.error(err);
    }
  };

  if (!course) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Редактировать курс</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={course.title} onChange={handleChange} required />
        <textarea name="description" value={course.description} onChange={handleChange} />
        <input type="text" name="duration" value={course.duration} onChange={handleChange} />
        <input type="number" name="price" value={course.price} onChange={handleChange} />
        <input type="number" name="sale" value={course.sale} onChange={handleChange} />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
