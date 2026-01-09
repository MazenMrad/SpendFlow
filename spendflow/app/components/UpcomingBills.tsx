"use client";

import UpcomingBillsIcon from "@/app/icons/upcoming-bills-icon.svg";
import ChevronRightIcon from "@/app/icons/chevron-right-icon.svg";

const bills = [
  {
    name: "Car Loan",
    date: "20 January 2026",
    icon: "🚗",
  },
  {
    name: "Loan",
    date: "Paid",
    status: "paid",
  },
  {
    name: "Rent",
    date: "14 January 2026",
    icon: "🏠",
  },
];

const calendarDays = [10, 11, 12, 13, 14, 15, 16];

export default function UpcomingBills() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-96">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <UpcomingBillsIcon className="w-7 h-8" />
          <h2 className="text-2xl font-bold text-[#1c1f37]">
            Upcoming Bills
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[#017efa] font-semibold cursor-pointer">
          <span className="text-base font-semibold">
            See Detail
          </span>
          <ChevronRightIcon className="w-2.5 h-3.5" />
        </div>
      </div>

      <hr className="my-4 border-[#dadada]" />

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-12">
        {/* Bills List */}
        <div className="flex flex-col gap-6">
          <div className="space-y-6">
            {bills.map((bill, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="text-base font-medium text-[#000000]">
                  {bill.name}
                </p>
                <p className="text-xs font-medium text-[#000000] opacity-50">
                  {bill.status === "paid" ? (
                    <span className="text-[#23b899]">{bill.date}</span>
                  ) : (
                    bill.date
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={i} className="text-xs font-normal text-[#313131] w-8">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {calendarDays.map((day, i) => (
              <div
                key={i}
                className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded transition-colors ${
                  day === 12
                    ? "text-[#017efa] bg-[#017efa]/20"
                    : "text-[#017efa]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
