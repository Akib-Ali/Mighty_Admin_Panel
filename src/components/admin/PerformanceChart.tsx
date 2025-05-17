'use client';

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
  return (
    <div className="w-full h-[300px]"> {/* Fixed height wrapper */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip />
          <Bar dataKey="properties" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;

