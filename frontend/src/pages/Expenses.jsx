import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseForm from '../components/ExpenseForm';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/expenses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(expenses.filter(e => e.id !== id));
      } catch (err) {
        alert('Failed to delete expense');
      }
    }
  };

  const handleSaveSuccess = () => {
    setIsFormOpen(false);
    setExpenseToEdit(null);
    fetchExpenses();
  };

  const openNewForm = () => {
    setExpenseToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <div className="animate-fade-in-up relative">
      <div className="flex flex-col items-center relative mb-12 w-full pt-6">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 drop-shadow-sm pb-2">Expenses</h1>
          <p className="text-gray-500 mt-1 text-xl tracking-wide">Manage and track your recent spending.</p>
        </div>
        <div className="mt-6 md:absolute md:right-0 md:top-0 md:mt-1">
          <button 
            onClick={openNewForm}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 font-bold transform hover:-translate-y-0.5 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Expense
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : (
        <ExpenseTable expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Modal / Overlay for Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md animate-fade-in-up">
            <ExpenseForm 
              initialData={expenseToEdit} 
              onSave={handleSaveSuccess}
              onCancel={() => { setIsFormOpen(false); setExpenseToEdit(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
