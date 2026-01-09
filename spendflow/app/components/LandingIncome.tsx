"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const incomeExpenseData = [
  { month: "Apr 21", expense: 400, income: 600 },
  { month: "May 21", expense: 800, income: 1000 },
  { month: "Jun 21", expense: 1300, expense2: 1700, income: 1300 },
  { month: "Jul 21", expense: 1200, income: 1400 },
  { month: "Aug 21", expense: 1000, income: 1200 },
  { month: "Sep 21", expense: 1100, income: 2000 },
];

export default function LandingIncome() {
  return (
    <section className="bg-white py-24 px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block text-[#8e8e8e] font-gilroy">
              GET STARTED FOR FREE
            </span>
            <h2 className="text-[52px] leading-[1.1] font-bold text-[#1b1b1b] font-gilroy mb-6">
              Take Control of Your Money Today
            </h2>
            <p className="text-xl text-[#595e64] leading-relaxed font-gilroy mb-12">
              Track expenses effortlessly, see clear insights into your spending, and reach your savings goals faster all in one simple app.
            </p>
            <button className="px-10 py-4 bg-[#1570ef] text-white rounded-full font-bold text-base hover:bg-blue-700 transition-colors font-gilroy shadow-lg">
              Get Started
            </button>
          </div>

          {/* Right Chart */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-2xl border border-[#dadada] shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-[#1c1f37] font-gilroy">Income vs Expenses</h3>
                <button className="text-[#8e8e8e] text-sm font-dm-sans">April 2021 - September 2021</button>
              </div>

              <div className="flex gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#017efa] rounded-sm"></div>
                  <span className="text-sm font-medium text-[#1c1f37] font-gilroy">Expense</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#51cbff] rounded-sm"></div>
                  <span className="text-sm font-medium text-[#1c1f37] font-gilroy">Income</span>
                </div>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeExpenseData}>
                    <CartesianGrid vertical={false} stroke="#e8ecef" strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: "#8e8e8e", fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: "#8e8e8e", fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#f5f7fb", border: "none", borderRadius: 8 }}
                      cursor={false}
                    />
                    <Bar dataKey="expense" fill="#017efa" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="income" fill="#51cbff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}