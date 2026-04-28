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
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR("/api/dashboard", fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-[calc(100%-16rem)]">
        <Header title="Dashboard" />

        <div className="mt-8 px-8 pb-12 space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              <MonthlySpendingChart
                monthlyData={data?.monthlyTrend}
                weeklyData={data?.weeklyTrend}
              />

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

            <div className="space-y-8">
              <SpendingByCategoryChart categories={data?.categories} />
            </div>
          </div>

          <div>
            <UpcomingBills bills={data?.upcomingBills} />
          </div>

          <div>
            <RecentTransactions transactions={data?.recentTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
