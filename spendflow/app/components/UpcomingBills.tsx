import { Info, ChevronRight, MoreHorizontal } from "lucide-react";

const bills = [
  { name: "Car Loan", date: "20 January 2026", icon: "", paid: false },
  { name: "Loan", date: "Paid", icon: "", paid: true },
  { name: "Rent", date: "14 January 2026", icon: "", paid: false },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = ["10", "11", "12", "13", "14", "15", "16"];

export default function UpcomingBills() {
  return (
    <div className="bg-white rounded-lg shadow-[0_5px_10px_0_#F1F2FA] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#E6F3FF] rounded-full flex items-center justify-center">
            <Info className="w-4 h-4 text-[#017EFA]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1C1F37]">Upcoming Bills</h2>
        </div>

        <button className="flex items-center gap-2 text-[#017EFA] hover:opacity-80 transition-opacity">
          <span className="text-lg font-semibold">See Detail</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="border-t border-[#DADADA] opacity-50 mb-6"></div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="flex-shrink-0">
          <div className="w-full md:w-[325px] h-[312px] border border-[#ECEDF3] rounded-lg">
            {/* Calendar header with weekdays */}
            <div className="grid grid-cols-7 gap-6 justify-items-center py-4 px-4 border-b border-[#ECEDF3]">
              {weekDays.map((day) => (
                <span key={day} className="text-sm text-[#313131]">
                  {day}
                </span>
              ))}
            </div>

            {/* Calendar dates */}
            <div className="grid grid-cols-7 gap-6 justify-items-center py-6 px-4">
              {dates.map((date) => (
                <span
                  key={date}
                  className="text-sm font-bold text-[#017EFA]"
                >
                  {date}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bills List */}
        <div className="flex-1 space-y-5">
          {bills.map((bill, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xl">{bill.icon}</span>
                <div>
                  <div className="text-base text-[#1C1F37] font-medium">
                    {bill.name}
                  </div>
                  <div
                    className={`text-xs mt-1 ${bill.paid
                      ? "text-[#23B899] opacity-50"
                      : "text-black opacity-50"
                      }`}
                  >
                    {bill.date}
                  </div>
                </div>
              </div>
              <button className="text-[#8E8E8E] hover:text-[#1C1F37] transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
