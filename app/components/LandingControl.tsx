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
    <section className="w-full bg-[rgba(230,242,254,0.28)] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Decorative blue shape */}
      <svg
        className="absolute left-0 top-0 opacity-20 w-48 sm:w-64 lg:w-96 h-auto"
        viewBox="0 0 761 761"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.2"
          d="M761 0.000133057C761 420.072 420.072 761 0 761L0.000133057 0L761 0.000133057Z"
          fill="#017EFA"
          fillOpacity="0.46"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Images/Graphics */}
          <div className="relative order-2 lg:order-1">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b8d8b822f33fc18e8053c954dbd3307264e55784?width=856"
              alt="Spending Analytics"
              className="w-full max-w-md mx-auto lg:mx-0 h-auto"
            />

            {/* Decorative icons */}
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/098e4a1487864be51502c956d488a9ebf04956d0?width=100"
              alt=""
              className="absolute top-4 right-12 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/94949d9b11b53f729fba1ebdcf53463cf20bd7f4?width=100"
              alt=""
              className="absolute bottom-32 left-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/82754a94185a10e144b116994f9fe534e5166533?width=100"
              alt=""
              className="absolute bottom-8 left-16 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col gap-6 sm:gap-8 order-1 lg:order-2">
            <p className="text-[#F75C4E] text-sm sm:text-base font-gilroy-bold font-poppins tracking-wider">
              SAVE MORE TIME
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-gilroy-bold text-black">
              Take Control of Your Finances
            </h2>
            <p className="text-[#575455] text-base sm:text-lg font-gilroy-medium leading-relaxed">
              Track your expenses effortlessly, gain insights into your spending, and build better financial habits.
            </p>

            {/* Email Input + CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative w-full sm:w-auto">
              </div>
              <a href="/register">
                <button className="cursor-pointer w-full sm:w-auto px-8 lg:px-10 py-3 rounded-full bg-[#1F7CFF] text-white text-base font-semibold font-poppins hover:bg-[#1A6AE0] transition-colors whitespace-nowrap">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
