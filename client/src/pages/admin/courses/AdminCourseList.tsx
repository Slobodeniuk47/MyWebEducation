import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosJSON } from '../../../api/axios';
import { Course } from '../../../types/course';
import ConfirmModal from '../../../components/ConfirmModal';

export default function AdminCoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  useEffect(() => {
    axiosJSON.get('/courses/getAll')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async () => {
    if (!selectedCourseId) return;
    try {
      await axiosJSON.delete(`/courses/deleteById/${selectedCourseId}`);
      setCourses(prev => prev.filter(course => course.id !== selectedCourseId));
      setSelectedCourseId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Курсы</h2>
      <Link to="/admin/course/create">➕ Создать курс</Link>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <strong>{course.title}</strong> — {course.price}₴ ({course.sale}% скидка)
            <Link to={`/admin/course/update/${course.id}`}> ✏️</Link>
            <button onClick={() => setSelectedCourseId(course.id!)}>🗑️</button>
          </li>
        ))}
      </ul>
      {selectedCourseId && (
  <ConfirmModal
    message={`Видалити курс з ID ${selectedCourseId}?`}
    onConfirm={handleDelete}
    onCancel={() => setSelectedCourseId(null)}
  />
)}
    </div>
  );
}
