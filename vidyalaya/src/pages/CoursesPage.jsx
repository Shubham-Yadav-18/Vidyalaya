// CoursesPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course.id} className="border p-4 rounded shadow">
            <h3 className="text-xl mb-2">{course.title}</h3>
            <p className="mb-2">{course.description}</p>
            <a href={`/course/${course.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">View Course</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
