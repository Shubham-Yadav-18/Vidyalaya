// HomePage.jsx
import React from 'react';

const HomePage = () => {
  return (
    <div>
      
      <main className="p-8">
        <section className="text-center mb-8">
          <h1 className="text-4xl mb-4">Welcome to EduTech</h1>
          <p className="text-lg mb-4">Learn new skills with our expert-taught courses</p>
          <a href="/courses" className="bg-blue-500 text-white px-4 py-2 rounded">Explore Courses</a>
        </section>
        {/* Add more sections like Featured Courses and Testimonials here */}
      </main>
      
    </div>
  );
};

export default HomePage;
