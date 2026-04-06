import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onSave, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.description || '',
        amount: initialData.amount || '',
        category: initialData.category || '',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (Number(formData.amount) <= 0) {
      setError('Amount must be positive');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const payload = {
        description: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date
      };

      if (initialData && initialData.id) {
        await axios.put(`/api/expenses/${initialData.id}`, payload, config);
      } else {
        await axios.post('/api/expenses', payload, config);
      }
      
      onSave(); // Trigger refresh on parent
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">
          {initialData ? 'Edit Expense' : 'Add Expense'}
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition" type="button">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Description / Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g., Groceries" />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option value="" disabled>Select Category</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount (₹)</label>
          <input type="number" step="50" name="amount" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g., 500" />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <div className="pt-4 flex gap-3">
          <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all disabled:opacity-70">
            {loading ? 'Saving...' : 'Save Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
