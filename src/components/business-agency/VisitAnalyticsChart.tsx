"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const visitData = [
  { day: "Mon", visits: 120 },
  { day: "Tue", visits: 200 },
  { day: "Wed", visits: 150 },
  { day: "Thu", visits: 300 },
  { day: "Fri", visits: 250 },
  { day: "Sat", visits: 180 },
  { day: "Sun", visits: 220 },
];

const VisitAnalyticsChart = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={visitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitAnalyticsChart;
