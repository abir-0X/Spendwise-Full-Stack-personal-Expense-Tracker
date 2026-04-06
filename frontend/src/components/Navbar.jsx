import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    navigate('/login');
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('File size exceeds 1MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put('/api/auth/profile-photo', { profile_photo: dataUrl }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const updatedUser = { ...user, profile_photo: response.data.profile_photo };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setDropdownOpen(false);
        } catch (err) {
          console.error('Error uploading photo', err);
          alert(err.response?.data?.message || 'Failed to upload photo. File might be too large.');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const getLinkClasses = (path) => {
    const baseClasses = "px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm tracking-wide";
    return location.pathname === path 
      ? `${baseClasses} bg-white/20 text-white shadow-sm backdrop-blur-md`
      : `${baseClasses} text-white/80 hover:bg-white/10 hover:text-white`;
  };

  const renderAvatar = () => {
    if (user.profile_photo) {
      const src = user.profile_photo.startsWith('data:') 
        ? user.profile_photo 
        : `data:image/jpeg;base64,${user.profile_photo}`;
      return (
        <img 
          src={src} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover border-2 border-white/50 shadow-md" 
        />
      );
    }
    const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg border-2 border-white/50 shadow-md">
        {initial}
      </div>
    );
  };

  return (
    <nav className="m-4 rounded-2xl bg-gradient-to-r from-blue-700/90 to-indigo-800/90 backdrop-blur-xl shadow-lg border border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200 drop-shadow-sm">
              SpendWise
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <Link to="/" className={getLinkClasses('/')}>Dashboard</Link>
            <Link to="/expenses" className={getLinkClasses('/expenses')}>Expenses</Link>
          </div>

          <div className="flex space-x-3 items-center relative">
            {!user ? (
              <>
                <Link to="/login" className="px-5 py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors duration-200">
                  Log in
                </Link>
                <Link to="/signup" className="px-5 py-2 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow-md hover:bg-gray-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="focus:outline-none flex transition-transform hover:scale-105"
                >
                  {renderAvatar()}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-gray-100 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <label className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-semibold text-gray-700 cursor-pointer transition">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Update Photo
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    </label>

                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-red-50 text-sm font-semibold text-red-600 transition"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
