import React from 'react';

const ExpenseTable = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Recent Expenses</h3>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">2026-04-04</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Groceries</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">$ 50.00</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button className="text-blue-500 hover:text-blue-800">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
