import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryCard from '../components/SummaryCard';
import ChartComponent from '../components/ChartComponent';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/dashboard/summary', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium text-center max-w-2xl mx-auto mt-10">
        {error}
      </div>
    );
  }

  const { totalMonthlyExpenses = 0, totalTransactions = 0, categoryBreakdown = [] } = dashboardData || {};

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col items-center text-center mb-12 w-full pt-6">
        <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 drop-shadow-sm pb-2">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1 text-xl tracking-wide">Monitor your spending and financial health.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10 w-full max-w-4xl mx-auto">
        <SummaryCard 
          title="Monthly Expenses"
          amount={`₹${totalMonthlyExpenses.toFixed(2)}`}
          subtitle="This month"
          colorTheme="blue"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>}
        />
        <SummaryCard 
          title="Transactions"
          amount={totalTransactions}
          subtitle="Overall recorded"
          colorTheme="green"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
      </div>

      {/* Category Breakdown Chart */}
      <div className="w-full max-w-4xl mx-auto">
        <ChartComponent data={categoryBreakdown} />
      </div>
    </div>
  );
};

export default Dashboard;
