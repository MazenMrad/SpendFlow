"use client";

import { useState } from "react";
import ChartIcon from "@/app/icons/chart-icon.svg";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface MonthlySpendingChartProps {
    monthlyData: {
        label: string
        totalExpenses: number
        dailyNeeds: number
    }[],
    weeklyData: {
        label: string
        totalExpenses: number
        dailyNeeds: number
    }[]
}

export default function MonthlySpendingChart({ monthlyData, weeklyData }: MonthlySpendingChartProps) {
    const [viewMode, setViewMode] = useState<"weekly" | "monthly">("monthly");

    // Fallback to empty if data not provided
    const chartData = viewMode === "monthly" ? (monthlyData || []) : (weeklyData || []);

    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <ChartIcon className="w-8 h-8" />
                    <h2 className="text-2xl font-bold text-[#1c1f37]">
                        Spending Overview
                    </h2>
                </div>

                <div className="flex gap-6">
                    <button
                        onClick={() => setViewMode("weekly")}
                        className={`text-sm font-bold cursor-pointer transition-colors ${viewMode === "weekly" ? "text-[#017efa]" : "text-[#a9abb0] font-normal"}`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setViewMode("monthly")}
                        className={`text-sm font-bold cursor-pointer transition-colors ${viewMode === "monthly" ? "text-[#017efa]" : "text-[#a9abb0] font-normal"}`}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            <hr className="my-4 border-[#dadada]" />

            {/* Chart */}
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#dadada" vertical={false} />
                        <XAxis
                            dataKey="label"
                            stroke="#8e8e8e"
                            style={{ fontSize: "14px", fontFamily: "Gilroy" }}
                            tickFormatter={(value) => (value ? value.slice(0, 3) : "")}
                        />
                        <YAxis
                            stroke="#8e8e8e"
                            style={{ fontSize: "12px", fontFamily: "Gilroy" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#f5f7fb",
                                border: "1px solid #dadada",
                                borderRadius: "6px",
                                fontFamily: "Gilroy"
                            }}
                            formatter={(value: number) => [`${value.toFixed(2)}`, ""]}
                            labelStyle={{ color: "#1c1f37", fontWeight: "bold" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalExpenses"
                            name="Total Expenses"
                            fill="#017efa"
                            stroke="#017efa"
                            fillOpacity={0.1}
                            isAnimationActive={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="dailyNeeds"
                            name="Daily Needs"
                            stroke="#fd1f9b"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex gap-8 mt-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#017efa]" />
                    <span className="text-[#017efa] font-bold">
                        {chartData.length > 0 ? chartData[chartData.length - 1].totalExpenses.toFixed(0) : "0"}
                    </span>
                    <span className="text-[#8e8e8e] font-normal opacity-70">: Total Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#fd1f9b]" />
                    <span className="text-[#fd1f9b] font-bold">
                        {chartData.length > 0 ? chartData[chartData.length - 1].dailyNeeds.toFixed(0) : "0"}
                    </span>
                    <span className="text-[#8e8e8e] font-normal opacity-70">: Daily Needs</span>
                </div>
            </div>
        </div>
    );
}
