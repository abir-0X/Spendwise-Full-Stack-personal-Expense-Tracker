import React from 'react';

const Dashboard = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2 text-lg">Monitor your spending and financial health.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">Total Expenses</p>
          <h2 className="text-4xl font-black text-gray-800 relative z-10">$0.00</h2>
          <div className="mt-4 flex items-center text-sm font-medium text-green-600 relative z-10">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
            This month
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">Transactions</p>
          <h2 className="text-4xl font-black text-gray-800 relative z-10">0</h2>
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 relative z-10">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Overall recorded
          </div>
        </div>
      </div>

      {/* Category Breakdown Placeholder */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Category Breakdown</h3>
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <p className="text-lg font-medium">No expenses to display yet</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
