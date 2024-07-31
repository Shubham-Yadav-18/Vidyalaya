// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesList);
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (!courseTitle || !courseDescription) {
      alert('Course title and description cannot be empty');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'courses'), {
        title: courseTitle,
        description: courseDescription,
      });
      console.log('Course added with ID: ', docRef.id);
      setCourseTitle('');
      setCourseDescription('');
      // Update the courses list after adding a new course
      setCourses([...courses, { id: docRef.id, title: courseTitle, description: courseDescription }]);
    } catch (e) {
      console.error('Error adding course: ', e);
    }
  };

  const handleAddChapter = async () => {
    if (!selectedCourseId || !chapterTitle || !chapterContent) {
      alert('Please select a course and ensure chapter title and content are not empty');
      return;
    }

    try {
      const chapterRef = await addDoc(collection(db, 'courses', selectedCourseId, 'chapters'), {
        title: chapterTitle,
        content: chapterContent,
      });
      console.log('Chapter added with ID: ', chapterRef.id);
      setChapterTitle('');
      setChapterContent('');
    } catch (e) {
      console.error('Error adding chapter: ', e);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Add New Course</h2>
        <input
          type="text"
          placeholder="Course Title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="border mb-2 p-2 w-full"
        />
        <textarea
          placeholder="Course Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="border mb-2 p-2 w-full"
        />
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!courseTitle || !courseDescription}
        >
          Add Course
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Add New Chapter</h2>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="border mb-2 p-2 w-full"
        >
          <option value="" disabled>Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Chapter Title"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          className="border mb-2 p-2 w-full"
        />
        <textarea
          placeholder="Chapter Content"
          value={chapterContent}
          onChange={(e) => setChapterContent(e.target.value)}
          className="border mb-2 p-2 w-full"
        />
        <button
          onClick={handleAddChapter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!selectedCourseId || !chapterTitle || !chapterContent}
        >
          Add Chapter
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
