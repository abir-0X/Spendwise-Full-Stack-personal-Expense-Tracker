import React from 'react';
import { getCategoryStyles } from '../utils/categoryColors';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white">
        <div className="flex flex-col items-center justify-center">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="font-bold text-xl text-gray-600">No expenses found</p>
          <p className="text-md mt-2">Add your first expense to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs">Date</th>
              <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs">Category</th>
              <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs">Description</th>
              <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs text-right">Amount</th>
              <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.map((expense) => {
              const expenseDate = new Date(expense.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              });
              
              return (
                <tr key={expense.id} className="hover:bg-blue-50/40 transition-colors group">
                  <td className="py-4 px-6 text-sm text-gray-600 font-medium whitespace-nowrap">{expenseDate}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wide ${getCategoryStyles(expense.category).bg} ${getCategoryStyles(expense.category).text}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">{expense.description}</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gray-900 text-right whitespace-nowrap">
                    ₹{Number(expense.amount).toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center text-sm w-32">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => onEdit(expense)} 
                        title="Edit Expense"
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full transition-all duration-200 transform hover:scale-110 shadow-sm"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => onDelete(expense.id)} 
                        title="Delete Expense"
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-all duration-200 transform hover:scale-110 shadow-sm"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
