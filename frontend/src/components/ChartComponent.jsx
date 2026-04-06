import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getCategoryStyles } from '../utils/categoryColors';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    if (!data || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    
    const labels = data.map(item => item.category);
    const values = data.map(item => item.totalAmount);
    const backgroundColors = labels.map(label => getCategoryStyles(label).chart);

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Expenses',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              font: {
                size: 14,
                family: "'Inter', sans-serif",
                weight: 'bold'
              }
            }
          }
        },
        cutout: '75%',
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white" style={{ height: '420px' }}>
      <h3 className="text-2xl font-extrabold text-gray-800 mb-6 tracking-tight">Category Breakdown</h3>
      <div className="relative h-full pb-10">
        {(!data || data.length === 0) ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <p className="text-lg font-medium">No expenses to display yet</p>
          </div>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
