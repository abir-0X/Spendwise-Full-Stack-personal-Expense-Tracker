export const categoryColors = {
  Food: { bg: 'bg-amber-100', text: 'text-amber-700', chart: 'rgba(245, 158, 11, 0.8)' },
  Housing: { bg: 'bg-blue-100', text: 'text-blue-700', chart: 'rgba(59, 130, 246, 0.8)' },
  Transport: { bg: 'bg-emerald-100', text: 'text-emerald-700', chart: 'rgba(16, 185, 129, 0.8)' },
  Utilities: { bg: 'bg-cyan-100', text: 'text-cyan-700', chart: 'rgba(6, 182, 212, 0.8)' },
  Entertainment: { bg: 'bg-pink-100', text: 'text-pink-700', chart: 'rgba(236, 72, 153, 0.8)' },
  Shopping: { bg: 'bg-violet-100', text: 'text-violet-700', chart: 'rgba(139, 92, 246, 0.8)' },
  Health: { bg: 'bg-red-100', text: 'text-red-700', chart: 'rgba(239, 68, 68, 0.8)' },
  Other: { bg: 'bg-gray-100', text: 'text-gray-700', chart: 'rgba(156, 163, 175, 0.8)' }
};

export const getCategoryStyles = (category) => {
  return categoryColors[category] || categoryColors.Other;
};
