"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import MonthlySpendingChart from "@/app/components/MonthlySpendingChart";
import SpendingByCategoryChart from "@/app/components/SpendingByCategoryChart";
import MetricsCard from "@/app/components/MetricsCard";
import UpcomingBills from "@/app/components/UpcomingBills";
import RecentTransactions from "@/app/components/RecentTransactions";
import SpendingTrends from "@/app/components/SpendingTrends";
import { getDashboardData } from "@/app/actions/expenses";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getDashboardData();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-[calc(100%-16rem)]">
        {/* Header */}
        <Header title="Dashboard" />

        {/* Content Area */}
        <div className="mt-8 px-8 pb-12 space-y-8">
          {/*  Monthly Spending Overview & Category Analysis */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left side: Chart and Metrics (spans 2 columns) */}
            <div className="col-span-2 space-y-8">
              {/* Monthly Spending Chart */}
              <MonthlySpendingChart
                monthlyData={data?.monthlyTrend}
                weeklyData={data?.weeklyTrend}
              />

              {/* Metrics Row (Horizontal) */}
              <div className="grid grid-cols-3 gap-6">
                <MetricsCard
                  label="Monthly Spending"
                  amount={data?.metrics?.monthlySpending}
                />
                <MetricsCard
                  label="Remaining Budget"
                  amount={data?.metrics?.remainingBudget}
                  changeSign="up"
                />
                <MetricsCard
                  label={data?.metrics?.topCategory}
                  amount={data?.metrics?.topCategoryAmount}
                />
              </div>
            </div>

            {/* Right side: Spending by Category & Trends */}
            <div className="space-y-8">
              <SpendingByCategoryChart categories={data?.categories} />
            </div>
          </div>

          {/* Middle Section: Upcoming Bills */}
          <div>
            <UpcomingBills />
          </div>

          {/* Bottom Section: Recent Transactions */}
          <div>
            <RecentTransactions transactions={data?.recentTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
