// ChapterPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ChapterPage = () => {
  const { courseId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const chapterDoc = await getDoc(doc(db, 'courses', courseId, 'chapters', chapterId));
        if (chapterDoc.exists()) {
          setChapter(chapterDoc.data());
        } else {
          console.log('No such chapter!');
        }
      } catch (error) {
        console.error('Error fetching chapter: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [courseId, chapterId]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!chapter) {
    return <div className="p-8">Chapter not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">{chapter.title}</h1>
      <div className="mb-8">{chapter.content}</div>
      <div className="flex justify-between">
        <button className="bg-gray-500 text-white px-4 py-2 rounded">Previous Chapter</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Next Chapter</button>
      </div>
    </div>
  );
};

export default ChapterPage;
