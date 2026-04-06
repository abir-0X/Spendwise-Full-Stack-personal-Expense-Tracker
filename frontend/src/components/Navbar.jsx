import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const baseClasses = "px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm tracking-wide";
    return location.pathname === path 
      ? `${baseClasses} bg-white/20 text-white shadow-sm backdrop-blur-md`
      : `${baseClasses} text-white/80 hover:bg-white/10 hover:text-white`;
  };

  return (
    <nav className="m-4 rounded-2xl bg-gradient-to-r from-blue-700/90 to-indigo-800/90 backdrop-blur-xl shadow-lg border border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            {/* Simple logo indicator */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
              SpendWise
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <Link to="/" className={getLinkClasses('/')}>Dashboard</Link>
            <Link to="/expenses" className={getLinkClasses('/expenses')}>Expenses</Link>
          </div>

          <div className="hidden md:flex space-x-3">
            <Link to="/login" className="px-5 py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors duration-200">
              Log in
            </Link>
            <Link to="/signup" className="px-5 py-2 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow-md hover:bg-gray-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
