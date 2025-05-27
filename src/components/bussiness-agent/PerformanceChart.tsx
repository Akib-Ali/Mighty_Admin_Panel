'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', properties: 30 },
  { name: 'Feb', properties: 45 },
  { name: 'Mar', properties: 60 },
  { name: 'Apr', properties: 80 },
  { name: 'May', properties: 50 },
  { name: 'Jun', properties: 70 },
];

const PerformanceChart = () => {
  const [primaryColor, setPrimaryColor] = useState('#dc2626'); // fallback

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue('--color-primary').trim();
    if (color) {
      setPrimaryColor(color);
    }
  }, []);

  return (
    <div className="w-full h-[300px] text-primary">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip />
          <Bar dataKey="properties" fill={primaryColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;



