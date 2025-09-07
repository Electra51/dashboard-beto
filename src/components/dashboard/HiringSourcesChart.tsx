"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface HiringData {
  label: string;
  value: number;
}
const HiringSourcesChart = () => {
  const [data, setData] = useState<HiringData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chart");
        const result = await response.json();
        setData(result.sources);
      } catch (error) {
        console.error("Error fetching hiring sources data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBarColor = (label: string) => {
    const colors: { [key: string]: string } = {
      Direct: "#10B981",
      Wework: "#4F46E5",
      LinkedIn: "#1F2937",
      Hired: "#F59E0B",
      Internal: "#6366F1",
      Referral: "#10B981",
      Others: "#9CA3AF",
    };
    return colors[label] || "#9CA3AF";
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Hiring Sources
        </h3>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Hiring Sources
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            domain={[0, 60]}
            ticks={[0, 20, 40, 60]}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Bar key={`bar-${index}`} fill={getBarColor(entry.label)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-4 gap-2 mt-4 text-xs text-gray-600">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-1">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: getBarColor(entry.label) }}></div>
            <span className="truncate">{entry.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiringSourcesChart;
