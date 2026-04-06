import React from 'react';

const SummaryCard = ({ title, amount, subtitle, icon, colorTheme = 'blue' }) => {
  const themes = {
    blue: 'from-blue-400 to-indigo-500 text-blue-600',
    green: 'from-green-400 to-emerald-500 text-green-600',
    purple: 'from-purple-400 to-pink-500 text-purple-600',
    red: 'from-red-400 to-rose-500 text-red-600'
  };

  const themeClasses = themes[colorTheme] || themes.blue;
  const gradientClasses = themeClasses.split(' ').slice(0, 2).join(' ');
  const textClasses = themeClasses.split(' ')[2];

  return (
    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white relative overflow-hidden group">
      <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${gradientClasses} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500 delay-75`}></div>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">{title}</p>
      <h2 className="text-4xl font-black text-gray-800 relative z-10">{amount}</h2>
      {subtitle && (
        <div className={`mt-4 flex items-center text-sm font-medium ${textClasses} relative z-10`}>
          {icon && <span className="mr-1">{icon}</span>}
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
