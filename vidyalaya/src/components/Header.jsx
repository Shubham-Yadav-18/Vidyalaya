import React from 'react'

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
        <nav className="flex justify-between">
         <a href="/"> <div>EduTech</div></a>
          <div>
            <a href="/courses" className="mr-4">Courses</a>
            <a href="/about" className="mr-4">About</a>
            <a href="/contact" className="mr-4">Contact</a>
            <a href="/admin" className="mr-4">AdminDashboard</a>
            <a href="/login">Login</a>
          </div>
        </nav>
      </header>
  )
}

export default Header
