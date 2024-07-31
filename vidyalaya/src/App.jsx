// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ChapterPage from './pages/ChapterPage';
// import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
// import LoginPage from './pages/LoginPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:courseId" element={<CourseDetailsPage />}/>
        <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/*  />
        
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
