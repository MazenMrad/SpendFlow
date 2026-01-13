"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Calendar data for January 2026
const calendarWeeks = [
  [
    { day: 10, isCurrentMonth: true, hasBill: true },
    { day: 11, isCurrentMonth: true, hasBill: true },
    { day: 12, isCurrentMonth: true, hasBill: true },
    { day: 13, isCurrentMonth: true, hasBill: true },
    { day: 14, isCurrentMonth: true, hasBill: true },
    { day: 15, isCurrentMonth: true, hasBill: true },
    { day: 16, isCurrentMonth: true, hasBill: true, isHighlighted: true },
  ],
  [
    { day: 17, isCurrentMonth: true, hasBill: true },
    { day: 18, isCurrentMonth: true, hasBill: true },
    { day: 19, isCurrentMonth: true, hasBill: true },
    { day: 20, isCurrentMonth: true, hasBill: true },
    { day: 21, isCurrentMonth: true, hasBill: true },
    { day: 22, isCurrentMonth: true, hasBill: true },
    { day: 23, isCurrentMonth: true, hasBill: true, isHighlighted: true },
  ],
  [
    { day: 24, isCurrentMonth: true, hasBill: true },
    { day: 25, isCurrentMonth: true, hasBill: true },
    { day: 26, isCurrentMonth: true, hasBill: true },
    { day: 27, isCurrentMonth: true, hasBill: true },
    { day: 28, isCurrentMonth: true, hasBill: true },
    { day: 29, isCurrentMonth: true, hasBill: true },
    { day: 30, isCurrentMonth: true, hasBill: true },
  ],
  [
    { day: 31, isCurrentMonth: true, hasBill: true },
    { day: 1, isCurrentMonth: false, hasBill: false },
    { day: 2, isCurrentMonth: false, hasBill: false },
    { day: 3, isCurrentMonth: false, hasBill: false },
    { day: 4, isCurrentMonth: false, hasBill: false },
    { day: 5, isCurrentMonth: false, hasBill: false },
    { day: 6, isCurrentMonth: false, hasBill: false },
  ],
];

export default function UpcomingBills() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMonth, setCurrentMonth] = useState("January 2026");

  return (
    <Layout pageTitle="Upcoming bills">
      <div className="px-4 sm:px-8 lg:px-14 py-8 lg:py-14">

        <div className="max-w-[1076px] mx-auto">
          {/* Calendar card */}
          <div className="relative bg-white rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA] p-6 sm:p-8 lg:p-12">
            {/* Month/Year Header */}
            <div className="flex justify-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-[32px] font-bold text-black font-inter">
                {currentMonth}
              </h2>
            </div>

            {/* Calendar Table */}
            <div className="w-full max-w-[878px] mx-auto border-[1.5px] border-[#ECEDF3] rounded-lg overflow-hidden">
              {/* Days of week header */}
              <div className="grid grid-cols-7 bg-[#F0F2F8]">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={day}
                    className={`py-4 sm:py-6 text-center text-sm font-medium text-[#313131] border-r-[1.5px] border-[#ECEDF3] ${index === 0 ? "border-l-0" : ""
                      } ${index === 6 ? "border-r-0" : ""}`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div>
                {calendarWeeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className={`grid grid-cols-7 ${weekIndex === 0 ? "bg-[rgba(217,217,217,0.2)]" : ""
                      }`}
                  >
                    {week.map((dateObj, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`
                        relative py-8 sm:py-12 lg:py-[49px] text-center border-r-[1.5px] border-t-[1.5px] border-[#ECEDF3]
                        ${dayIndex === 0 ? "border-l-0" : ""}
                        ${dayIndex === 6 ? "border-r-0" : ""}
                        ${dateObj.isHighlighted ? "bg-[rgba(1,126,250,0.27)]" : ""}
                      `}
                      >
                        <span
                          className={`text-sm font-bold font-inter ${dateObj.isCurrentMonth
                            ? dateObj.hasBill
                              ? "text-[#017EFA]"
                              : "text-[#017EFA]"
                            : "text-[#9CA0A4]"
                            } ${weekIndex === 0 ? "font-bold" : ""}`}
                        >
                          {dateObj.day}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-center gap-2 mt-8 lg:mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-3 h-3 flex items-center justify-center disabled:opacity-50"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-3 h-3 text-[#D9D9D9]" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-[38px] h-10 flex items-center justify-center rounded-lg border border-[#E3E8F1] text-xs font-semibold font-inter transition-colors ${currentPage === 1
                    ? "bg-[#F5F7FB] text-black"
                    : "bg-[#F5F7FB] text-black hover:bg-[#E8EBFA]"
                    }`}
                >
                  1
                </button>
                <div className="w-[38px] h-10 flex items-center justify-center rounded-lg border border-[#E3E8F1] bg-[#F5F7FB]">
                  <span className="text-xs font-semibold font-inter text-black">...</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-3 h-3 flex items-center justify-center"
              >
                <ChevronRight className="w-3 h-3 text-[#D9D9D9]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
