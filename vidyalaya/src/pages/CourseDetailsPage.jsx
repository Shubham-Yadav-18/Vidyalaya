// CourseDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        if (courseDoc.exists()) {
          setCourse(courseDoc.data());
        } else {
          console.log('No such course!');
        }

        const chaptersSnapshot = await getDocs(collection(db, 'courses', courseId, 'chapters'));
        const chaptersList = chaptersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChapters(chaptersList);
      } catch (error) {
        console.error('Error fetching course details: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {course ? (
        <>
          <h1 className="text-3xl mb-4">{course.title}</h1>
          <p className="mb-8">{course.description}</p>

          <h2 className="text-2xl mb-4">Chapters</h2>
          <div className="mb-8">
            {chapters.length > 0 ? (
              <ul className="list-disc ml-5">
                {chapters.map(chapter => (
                  <li key={chapter.id}>
                    <a href={`/course/${courseId}/chapter/${chapter.id}`} className="text-blue-500">
                      {chapter.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No chapters available for this course.</p>
            )}
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded">Enroll in Course</button>
        </>
      ) : (
        <div>No course found.</div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
