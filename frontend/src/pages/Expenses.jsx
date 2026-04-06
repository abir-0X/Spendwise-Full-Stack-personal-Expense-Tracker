import React from 'react';

const Expenses = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Expenses</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage and track your recent spending.</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 font-bold transform hover:-translate-y-0.5 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Expense
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs">Date</th>
                <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs">Category</th>
                <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs">Description</th>
                <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs text-right">Amount</th>
                <th className="py-5 px-6 font-bold text-gray-500 uppercase tracking-wider text-xs text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Placeholder row */}
              <tr className="hover:bg-blue-50/30 transition-colors group">
                <td className="py-4 px-6 text-sm text-gray-600 font-medium">Oct 24, 2023</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold tracking-wide">Food</span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-800">Weekly Groceries</td>
                <td className="py-4 px-6 text-sm font-bold text-gray-900 text-right">$125.00</td>
                <td className="py-4 px-6 text-center text-sm">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-blue-500 hover:text-blue-700 transition">Edit</button>
                    <button className="text-red-500 hover:text-red-700 transition">Delete</button>
                  </div>
                </td>
              </tr>
              {/* Empty state placeholder */}
              <tr>
                <td colSpan="5" className="py-16 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-medium text-lg">No other expenses found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
