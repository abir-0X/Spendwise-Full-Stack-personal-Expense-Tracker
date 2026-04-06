import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirect to dashboard
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh]">
      <div className="w-full max-w-md p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
        {/* Subtle decorative blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">Welcome Back</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 font-medium"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 font-medium"
                placeholder="Enter your password"
              />
            </div>
            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 font-bold text-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-gray-600 font-medium">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors ml-1 font-bold">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
