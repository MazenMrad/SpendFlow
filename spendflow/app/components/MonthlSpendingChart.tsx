"use client";

import ChartIcon from "@/app/icons/chart-icon.svg";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", totalExpenses: 800, dailyNeeds: 600 },
  { month: "Feb", totalExpenses: 1000, dailyNeeds: 650 },
  { month: "Mar", totalExpenses: 900, dailyNeeds: 700 },
  { month: "Apr", totalExpenses: 1200, dailyNeeds: 800 },
  { month: "Mei", totalExpenses: 1400, dailyNeeds: 900 },
  { month: "Jun", totalExpenses: 1300, dailyNeeds: 850 },
  { month: "Jul", totalExpenses: 1500, dailyNeeds: 950 },
  { month: "Aug", totalExpenses: 1800, dailyNeeds: 1100 },
  { month: "Sep", totalExpenses: 1600, dailyNeeds: 1000 },
  { month: "Oct", totalExpenses: 1700, dailyNeeds: 1050 },
  { month: "Nov", totalExpenses: 1400, dailyNeeds: 900 },
  { month: "Dec", totalExpenses: 1300, dailyNeeds: 800 },
];

export default function MonthlySpendingChart() {
  return (
    <div className="chart-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <ChartIcon className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-[#1c1f37]">
            Monthly Spending Overview
          </h2>
        </div>

        <div className="flex gap-6">
          <span className="text-sm text-[#017efa] font-bold cursor-pointer">Daily</span>
          <span className="text-sm text-[#a9abb0] font-normal cursor-pointer">Weekly</span>
          <span className="text-sm text-[#a9abb0] font-normal cursor-pointer">Monthly</span>
        </div>
      </div>

      <hr className="my-4 border-[#dadada]" />

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#dadada" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#8e8e8e"
            style={{ fontSize: "14px", fontFamily: "Gilroy" }}
          />
          <YAxis
            stroke="#8e8e8e"
            style={{ fontSize: "12px", fontFamily: "Gilroy" }}
            domain={[0, 4000]}
            ticks={[0, 1000, 2000, 3000, 4000]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f5f7fb",
              border: "1px solid #dadada",
              borderRadius: "6px",
              fontFamily: "Gilroy"
            }}
            formatter={(value) => `${value}`}
          />
          <Area
            type="monotone"
            dataKey="totalExpenses"
            fill="#017efa"
            stroke="#017efa"
            fillOpacity={0.1}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="dailyNeeds"
            stroke="#fd1f9b"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex gap-8 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#017efa]" />
          <span className="text-[#017efa] font-bold">185</span>
          <span className="text-[#8e8e8e] font-normal opacity-70">: Total Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#fd1f9b]" />
          <span className="text-[#fd1f9b] font-bold">75</span>
          <span className="text-[#8e8e8e] font-normal opacity-70">: Daily Needs</span>
        </div>
      </div>
    </div>
  );
}
