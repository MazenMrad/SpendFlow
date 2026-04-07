"use client";

import GainInsightsIcon from "@/app/icons/gain-insights-icon.svg";
import BuildHabitsIcon from "@/app/icons/build-habits-icon.svg";
import SecurityIcon from "@/app/icons/secure-private-icon.svg";

const reasons = [
  {
    icon: GainInsightsIcon,
    title: "Gain Clear Insights",
    description: "See exactly where your money goes with easy category breakdowns, monthly trends, and daily summaries. No more guessing—understand your spending habits in seconds",
    bgColor: "bg-[#fead86]",
  },
  {
    icon: BuildHabitsIcon,
    title: "Build Better Habits",
    description: "Set budgets, track progress, and get gentle reminders when you're approaching limits. Small changes add up—save more on groceries, transport, or dining out.",
    bgColor: "bg-[#51a690]",
  },
  {
    icon: SecurityIcon,
    title: "Secure & Private",
    description: "Your data stays yours—encrypted and never shared. No ads, no bank links required. Track peacefully with a tool that's simple, free to start, and built for you.",
    bgColor: "bg-[#ffcf00]",
  },
];

export default function LandingWhyChooseUs() {
  return (
    <section className="bg-white py-24 px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-[55px] font-bold text-[#1b1b1b] font-montserrat">
            Why Choose Us ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-2xl p-10 shadow-lg border border-[#e8ecef] hover:shadow-2xl transition-shadow relative overflow-hidden group">
              <div className={`${reason.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-8 relative z-10`}>
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3b3e43] font-gilroy mb-6 relative z-10">
                {reason.title}
              </h3>
              <p className="text-base text-[#595e64] leading-relaxed font-gilroy relative z-10">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
