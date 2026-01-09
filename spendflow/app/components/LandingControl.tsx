"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Vector1 from "@/app/icons/vector-1.svg";
import VectorMain from "@/app/icons/vector-main.svg";

const categoryData = [
  { name: "Utilities", value: 40, color: "#017efa" },
  { name: "Bills", value: 30, color: "#51cbff" },
  { name: "Other", value: 30, color: "#b6e9ff" },
];

export default function LandingControl() {
  return (
    <section className="bg-[#f9fafb] py-24 px-16 overflow-hidden relative">
      <Vector1 className="absolute top-0 left-0 w-full h-auto opacity-10 pointer-events-none" />
      <VectorMain className="absolute bottom-0 right-0 w-full h-auto opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
        {/* Left Visual Area */}
        <div className="lg:w-1/2 relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-[450px] relative z-10 border border-[#dadada]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#dadada]">
              <h3 className="text-xl font-bold text-[#1c1f37] font-gilroy">Spending by Category</h3>
              <button className="text-[#017efa] text-sm font-medium font-gilroy">View Report</button>
            </div>
            
            <div className="mb-8">
              <div className="text-sm text-[#8e8e8e] font-gilroy mb-1">Order Time</div>
              <div className="text-xs text-[#8e8e8e]/50 font-gilroy">January 2026</div>
            </div>

            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-[#1c1f37] font-gilroy leading-tight text-center">
                  1230 TND<br /><span className="text-xs font-medium text-[#8e8e8e]">Spent</span>
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-[#1c1f37] font-gilroy">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overlapping Summary Card */}
          <div className="absolute top-[60%] -right-24 bg-[#081a51] text-white rounded-xl p-8 shadow-2xl z-20 w-[320px] border border-white/10">
            <h4 className="text-base font-medium font-gilroy mb-6 opacity-80">January 2026 Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#fd1f9b] rounded-full"></div>
                  <span className="text-sm opacity-70 font-gilroy">Total Expenses</span>
                </div>
                <span className="text-sm font-bold font-gilroy">1480 TND</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#30d987] rounded-full"></div>
                  <span className="text-sm opacity-70 font-gilroy">Compared to Last Month</span>
                </div>
                <span className="text-sm font-bold font-gilroy">220 TND</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#017efa] rounded-full"></div>
                  <span className="text-sm opacity-70 font-gilroy">Top Category</span>
                </div>
                <span className="text-sm font-bold font-gilroy">600 TND</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Text Content */}
        <div className="lg:w-1/2">
          <span className="text-[#f75c4e] font-bold text-sm tracking-widest uppercase mb-4 block font-poppins">
            SAVE MORE TIME
          </span>
          <h2 className="text-[44px] leading-[1.1] font-bold text-[#1c1f37] font-gilroy mb-8">
            Take Control of Your Finances
          </h2>
          <p className="text-xl text-[#575455] leading-relaxed font-gilroy mb-12">
            Track your expenses effortlessly, gain insights into your spending, and build better financial habits.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-[#1570ef] text-white px-10 py-4 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors font-gilroy shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}