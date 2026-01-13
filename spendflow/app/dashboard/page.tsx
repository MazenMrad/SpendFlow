import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import MonthlySpendingChart from "@/app/components/MonthlSpendingChart";
import SpendingByCategoryChart from "@/app/components/SpendingByCategoryChart";
import MetricsCard from "@/app/components/MetricsCard";
import UpcomingBills from "@/app/components/UpcomingBills";
import RecentTransactions from "@/app/components/RecentTransactions";
import SuccessIcon from "@/app/icons/success-icon.svg";
import { getServerSession } from "next-auth";
//import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/** 
export default function DashboardPage() {
  const session = async () => await getServerSession(authOptions);

  // Note: Since this is a server component, we can use getServerSession directly in the component body
  // However, Next.js 13+ App Router often handles this via middleware or inside the component as await.

  return (
    <DashboardContent />
  );
}

async function DashboardContent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
    */
export default function DashboardPage() {

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-[calc(100%-16rem)]">
        {/* Header */}
        <Header title="Dashboard" />

        {/* Content Area */}
        <div className="mt-24 px-8 pb-12 space-y-8">
          {/* Top Section: Monthly Spending Overview */}
          <div className="grid grid-cols-3 gap-8">
            {/* Chart (spans 2 columns) */}
            <div className="col-span-2">
              <MonthlySpendingChart />
            </div>

            {/* Metrics and Success Message */}
            <div className="flex flex-col gap-6">
              {/* Monthly Spending Metric */}
              <MetricsCard
                label="Monthly Spending"
                amount="250 TND"
                change="8%"
                changeSign="down"
              />

              {/* Remaining Budget */}
              <MetricsCard
                label="Remaining Budget"
                amount="1,250 TND"
                change="12%"
                changeSign="up"
              />

              {/* Groceries & Dining */}
              <MetricsCard
                label="Groceries & Dining"
                amount="300 TND"
              />

              {/* Success Message */}
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start gap-3 mb-2">
                  <SuccessIcon className="w-6 h-7 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1c1f37]">
                      You're doing good!
                    </p>
                    <p className="text-xs font-medium text-[#1c1f37] opacity-50 leading-[18px] mt-1">
                      You're doing good! Spending 10% lower than last month.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section: Spending by Category & Upcoming Bills */}
          <div className="grid grid-cols-3 gap-8">
            {/* Upcoming Bills */}
            <div className="col-span-2">
              <UpcomingBills />
            </div>

            {/* Spending by Category */}
            <div>
              <SpendingByCategoryChart />
            </div>
          </div>

          {/* Bottom Section: Recent Transactions */}
          <div>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
