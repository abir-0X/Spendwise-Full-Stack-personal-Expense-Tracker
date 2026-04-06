import React from 'react';

const SummaryCard = ({ title, amount }) => {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center">
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-2xl font-bold text-gray-800">{amount}</p>
    </div>
  );
};

export default SummaryCard;
