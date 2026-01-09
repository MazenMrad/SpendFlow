"use client";

import CategoryIcon from "@/app/icons/category-icon.svg";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const categoryData = [
  { name: "Utilities", value: 300, color: "#017efa" },
  { name: "Bills", value: 400, color: "#51cbff" },
  { name: "Other", value: 230, color: "#b6e9ff" },
];

const spendingTrends = [
  { category: "Food", amount: 300, percentage: 20, color: "#fd1f9b" },
  { category: "Transport", amount: 150, percentage: 25, color: "#017efa" },
  { category: "Entertainement", amount: 600, percentage: 60, color: "#23b899" },
  { category: "Shopping", amount: 180, percentage: 15, color: "#6342ff" },
];

export default function SpendingByCategoryChart() {
  return (
    <div className="rounded-[39px] bg-white/40 backdrop-blur shadow-lg p-8 h-full">
      {/* Header */}
      <div className="flex flex-col gap-7 mb-8">
        <div className="flex items-center gap-3">
          <CategoryIcon className="w-5 h-5" />
          <h2 className="text-base font-bold text-[#1c1f37]">Spending by Category</h2>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-black">Order Time</span>
          <span className="text-sm font-semibold text-[#017efa] cursor-pointer">View Report</span>
        </div>

        <div className="text-center">
          <p className="text-xs font-bold text-[#1c1f37]">
            1230 TND<br />
            <span className="text-xs">Spent</span>
          </p>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-8">
        <ResponsiveContainer width={200} height={150}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={0}
              dataKey="value"
              isAnimationActive={false}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#017efa]" />
          <span className="text-xs text-[#1c1f37]">Utilities</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#51cbff]" />
          <span className="text-xs text-[#1c1f37]">Bills</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#b6e9ff]" />
          <span className="text-xs text-[#1c1f37]">Other</span>
        </div>
      </div>

      {/* Spending Trends */}
      <div className="space-y-5 mt-8">
        <h3 className="text-xs font-bold text-[#1c1f37]">Spending Trends</h3>
        {spendingTrends.map((trend, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: trend.color }}
                />
                <span className="text-sm font-medium text-[#1c1f37]">{trend.category}</span>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-sm font-bold text-[#1c1f37]">{trend.amount} TND</span>
                <span className="text-xs font-bold text-[#017efa] w-8 text-right">{trend.percentage}%</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: trend.color,
                  width: `${trend.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
