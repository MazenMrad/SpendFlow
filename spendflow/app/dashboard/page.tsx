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
        <div className="mt-8 px-8 pb-12 space-y-8">
          {/* Top Section: Monthly Spending Overview & Category Analysis */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left side: Chart and Metrics (spans 2 columns) */}
            <div className="col-span-2 space-y-8">
              {/* Monthly Spending Chart */}
              <MonthlySpendingChart />

              {/* Metrics Row (Horizontal) */}
              <div className="grid grid-cols-3 gap-6">
                <MetricsCard
                  label="Monthly Spending"
                  amount="250 TND"
                  change="8%"
                  changeSign="down"
                />
                <MetricsCard
                  label="Remaining Budget"
                  amount="1,250 TND"
                  change="12%"
                  changeSign="up"
                />
                <MetricsCard
                  label="Groceries & Dining"
                  amount="300 TND"
                />
              </div>
            </div>

            {/* Right side: Spending by Category */}
            <div>
              <SpendingByCategoryChart />
            </div>
          </div>

          {/* Middle Section: Upcoming Bills */}
          <div>
            <UpcomingBills />
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
