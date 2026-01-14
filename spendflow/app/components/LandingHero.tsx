"use client";

import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import SuccessIcon from "@/app/icons/success-icon.svg";
import ChartIcon from "@/app/icons/landing-chart-icon.svg";

const data = [
  { name: "Jan", total: 1000, daily: 800 },
  { name: "Feb", total: 1500, daily: 1000 },
  { name: "Mar", total: 1300, daily: 900 },
  { name: "Apr", total: 1800, daily: 1100 },
  { name: "Mei", total: 2200, daily: 1300 },
  { name: "Jun", total: 1900, daily: 1200 },
  { name: "Jul", total: 2400, daily: 1500 },
  { name: "Aug", total: 3200, daily: 1800 },
  { name: "Sep", total: 2800, daily: 1600 },
  { name: "Oct", total: 3000, daily: 1700 },
  { name: "Nov", total: 2900, daily: 1650 },
  { name: "Dec", total: 3100, daily: 1750 },
];

export default function LandingHero() {
  return (
    <section className="px-16 py-20 bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="lg:w-[45%]">
          <h1 className="text-[52px] leading-[1.1] font-bold text-[#1c1f37] font-gilroy mb-8 max-w-[550px]">
            Take Control of Your Personal Finances
          </h1>
          <p className="text-lg text-[#575455] font-gilroy mb-10 max-w-[450px] leading-[1.6]">
            Our tracker helps you categorize expenses, set limits, and reach your savings goals with zero effort
          </p>
          <a href="/register">
            <button className="cursor-pointer bg-[#1570ef] text-white px-10 py-4 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors font-gilroy">
              Get Started
            </button>
          </a>
        </div>

        {/* Right Dashboard Card */}
        <div className="lg:w-[55%] w-full">
          <div className="bg-white rounded-2xl shadow-[0px_5px_10px_#f1f2fa] border border-[#dadada] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#dadada]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#017efa] rounded-lg flex items-center justify-center">
                  <ChartIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1c1f37] font-gilroy">
                  Monthly Spending Overview
                </h3>
              </div>
              <div className="flex gap-4">
                <button className="text-[#017efa] font-bold text-lg font-gilroy cursor-pointer">Daily</button>
                <button className="text-[#a9abb0] font-normal text-lg font-gilroy cursor-pointer">Weekly</button>
                <button className="text-[#a9abb0] font-normal text-lg font-gilroy cursor-pointer">Monthly</button>
              </div>
            </div>

            <div className="p-8 flex gap-8">
              <div className="flex-1 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#017efa" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#017efa" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fd1f9b" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#fd1f9b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#dadada" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8e8e8e", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8e8e8e", fontSize: 12 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#017efa"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                    />
                    <Area
                      type="monotone"
                      dataKey="daily"
                      stroke="#fd1f9b"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorDaily)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats Panel */}
              <div className="w-[220px] bg-[#f5f7fb] rounded-lg p-6 flex flex-col gap-8">
                <div>
                  <div className="text-[40px] font-bold text-[#1c1f37] font-gilroy leading-none">250 TND</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 bg-[#fd1f9b] rounded-sm"></div>
                    <span className="text-sm text-[#1c1f37]/60 font-medium font-gilroy">Monthly Spending</span>
                    <span className="text-[#dd405f] text-xs font-bold font-gilroy">↓ 8%</span>
                  </div>
                </div>

                <div>
                  <div className="text-[40px] font-bold text-[#1c1f37] font-gilroy leading-none">1,250 TND</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 bg-[#017efa] rounded-sm"></div>
                    <span className="text-sm text-[#1c1f37]/60 font-medium font-gilroy">Remaining Budget</span>
                    <span className="text-[#30d988] text-xs font-bold font-gilroy">↑ 12%</span>
                  </div>
                </div>

                <div>
                  <div className="text-[40px] font-bold text-[#1c1f37] font-gilroy leading-none">300 TND</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-[#1c1f37]/60 font-medium font-gilroy">Groceries & Dining</span>
                  </div>
                </div>

                <div className="mt-auto flex items-start gap-3">
                  <SuccessIcon className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#1c1f37] font-gilroy">You're doing good!</div>
                    <div className="text-xs text-[#1c1f37]/50 font-gilroy mt-1 leading-relaxed">
                      Your reach performance is 12% better compate to last year
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}