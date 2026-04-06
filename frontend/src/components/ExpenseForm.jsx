import React from 'react';

const ExpenseForm = () => {
  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h3 className="text-lg font-bold mb-4">Add Expense</h3>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input type="text" className="border rounded w-full py-2 px-3 text-gray-700" placeholder="e.g., Groceries" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
          <input type="number" className="border rounded w-full py-2 px-3 text-gray-700" placeholder="e.g., 50.00" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
