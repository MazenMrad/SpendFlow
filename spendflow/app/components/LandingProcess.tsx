"use client";

import TrackExpenseFull from "@/app/icons/track-expense-full.svg";
import AchieveGoalsFull from "@/app/icons/achieve-goals-full.svg";
import ClearInsightsFull from "@/app/icons/clear-insights-full.svg";
import Vector121 from "@/app/icons/vector-121.svg";
import Vector122 from "@/app/icons/vector-122.svg";

export default function LandingProcess() {
  return (
    <section className="bg-[#050d35] py-24 px-16 relative overflow-hidden">
      {/* Decorative vectors from design */}
      <Vector121 className="absolute top-[10%] left-0 w-[300px] h-auto opacity-20 pointer-events-none" />
      <Vector122 className="absolute bottom-[10%] right-0 w-[400px] h-auto opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <span className="text-white/50 text-xs font-bold tracking-[1.8px] uppercase mb-4 block font-gilroy">
          BEHIND THE SCENE
        </span>
        <h2 className="text-[48px] font-medium text-white font-gilroy mb-8">
          How Our App Works
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-gilroy">
          Track your expenses effortlessly, gain clear insights into your spending, and build better financial habits all in one simple app
        </p>
      </div>

      <div className="w-full space-y-32 relative z-10 flex flex-col items-center">
        {/* Block 1: Track Your Expenses Image */}
        <div className="w-full flex justify-center overflow-visible">
          <TrackExpenseFull className="max-w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.7)]" />
        </div>

        {/* Block 2: Get Clear Insights Image */}
        <div className="w-full flex justify-center overflow-visible">
          <ClearInsightsFull className="max-w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.7)]" />
        </div>

        {/* Block 3: Achieve Your Goals Image */}
        <div className="w-full flex justify-center overflow-visible">
          <AchieveGoalsFull className="max-w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.7)]" />
        </div>
      </div>
    </section>
  );
}