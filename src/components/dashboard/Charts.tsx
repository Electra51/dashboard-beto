/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetChartsQuery } from "../../store/api";
import Card from "../ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "@/utils/constants";
import { ChartData } from "@/types";
export default function Charts() {
  const { data: charts, isLoading, error } = useGetChartsQuery();

  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center justify-center h-80">Loading...</div>
      </Card>
    );
  }

  if (error || !charts) {
    return (
      <Card>
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          Error loading chart data
        </div>
      </Card>
    );
  }

  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } =
      props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const femaleIcon = (
      <svg
        x={x - 14}
        y={y - 10}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="purple"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm-1 10v7h2v-7h-2z" />
      </svg>
    );

    const maleIcon = (
      <svg
        x={x - 14}
        y={y - 10}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="teal"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="7" r="5" />
        <path d="M12 12v7h2v-7h-2z" />
      </svg>
    );

    return (
      <g>
        {index === 0 ? femaleIcon : maleIcon}
        <text
          x={x}
          y={y}
          fill="#000"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="use-script"
          className="text-sm font-medium"
          style={{ fontSize: 12, fontWeight: 500 }}>
          {(percent * 100).toFixed(0)}%
        </text>
      </g>
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </Card>
        <Card>
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </Card>
      </div>
    );
  }

  const totalEmployees = charts.composition.reduce(
    (sum: number, item: ChartData["composition"][number]) => sum + item.value,
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Employee Composition
        </h3>

        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={charts.composition}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}>
              {charts.composition.map((entry: any, index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS.DONUT[index % CHART_COLORS.DONUT.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-2 text-sm text-gray-600">
          {totalEmployees} employee total
        </div>
      </Card>

      <Card className="col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Hiring Sources
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={charts.sources}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-0}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {charts.sources.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={CHART_COLORS.BARS[index % CHART_COLORS.BARS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
