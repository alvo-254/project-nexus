import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener('scroll', () => {
    setIsScrolled(window.scrollY > 20);
  });

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold gradient-text">JobHunt</span>
              <p className="text-xs text-gray-500 font-medium">Find Your Dream Job</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-blue-50"
            >
              Browse Jobs
            </Link>
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-blue-50"
            >
              Companies
            </Link>
            <button className="btn-secondary text-sm">
              Sign In
            </button>
            <button className="btn-primary text-sm">
              Post a Job
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;