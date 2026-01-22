export default function UpcomingBills() {
  const bills: { id: number; name: string; status: string; color: string; date: string }[] = [];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const today = new Date();
  const currentDay = today.getDay();
  const currentDate = today.getDate();

  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(currentDate + mondayOffset + i);
    return date.getDate();
  });

  // Find which index is today
  const todayIndex = dates.findIndex(date => date === currentDate);


  return (
    <div className="bg-white rounded-lg shadow-[0_5px_10px_0_#F1F2FA] p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-[31px] rounded-full bg-[#017EFA] flex items-center justify-center relative">
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.34277 0C7.09739 0.0937929 7.83539 0.321445 8.52441 0.678711C9.71861 1.29797 10.7102 2.27241 11.3877 3.47363C12.0649 4.67445 12.4038 6.05645 12.3701 7.45215C12.3364 8.84778 11.9306 10.2096 11.1953 11.3721C10.4596 12.5349 9.4207 13.4535 8.19629 14.0049C6.97067 14.5567 5.61871 14.7133 4.30762 14.4502C2.99721 14.1871 1.79591 13.519 0.845703 12.541C0.530763 12.2168 0.248734 11.8621 0 11.4844L2.0459 10.8887C2.12125 10.9777 2.19936 11.0642 2.28027 11.1475C2.96036 11.8474 3.80298 12.3089 4.70117 12.4893C5.59865 12.6694 6.52682 12.564 7.37598 12.1816C8.22626 11.7987 8.96961 11.1504 9.50586 10.3027C10.0425 9.45431 10.3449 8.4466 10.3701 7.40332C10.3952 6.36014 10.1416 5.33569 9.64551 4.45605C9.14977 3.57717 8.43705 2.88596 7.60449 2.4541C7.36814 2.33155 7.12353 2.23332 6.875 2.15527L6.34277 0Z"
                fill="white"
              />
              <circle
                cx="9"
                cy="10"
                r="7"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <h2 className="font-gilroy-bold text-lg md:text-2xl text-[#1C1F37]">
            Upcoming Bills
          </h2>
        </div>

        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg group self-start sm:self-auto">
          <span className="font-gilroy-bold text-sm md:text-lg text-[#017EFA]">
            <a href="/upcoming-bills">
              See Detail
            </a>
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.061 19.061L17.121 12L10.061 4.93896L7.93896 7.06096L12.879 12L7.93896 16.939L10.061 19.061Z"
              fill="#5da6f0ff"
            />
          </svg>
        </button>
      </div>

      <div className="border-t border-[#DADADA]/50 pt-6">
        {/* Calendar Grid */}
        <div className="mb-6 overflow-x-auto">
          {/* Calendar Header */}
          <div className="min-w-[500px] grid grid-cols-7 gap-0 border border-[#ECEDF3] rounded-lg overflow-hidden">
            {/* Header Row */}
            <div className="col-span-7 grid grid-cols-7 bg-[#F9FAFD] border-b border-[#ECEDF3]">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center py-4 font-gilroy text-sm text-[#313131] border-r border-[#ECEDF3] last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Date Cells */}
            {dates.map((date, i) => {
              const isToday = i === todayIndex;
              const isWeekend = i === 5 || i === 6; // Sat or Sun

              return (
                <div
                  key={`${date}-${i}`}
                  className={`text-center py-5 border-r border-b border-[#ECEDF3] last:border-r-0 ${isToday
                    ? "bg-[#017EFA] shadow-lg"
                    : ""
                    }`}
                >
                  <span
                    className={`font-gilroy-bold text-sm ${isToday ? "text-white" : "text-[#017EFA]"
                      }`}
                  >
                    {date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bills List */}
        <div className="space-y-5">
          {bills.map((bill) => (
            <div key={bill.id} className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3.13"
                    y="3.33"
                    width="12.53"
                    height="10.67"
                    rx="2"
                    stroke={bill.color}
                    strokeWidth="2"
                  />
                  <path
                    d="M12.53 1.33V3.33C12.53 4.28 12.53 4.75 12.24 5.04C11.95 5.33 11.47 5.33 10.53 5.33H8.27C7.32 5.33 6.85 5.33 6.56 5.04C6.27 4.75 6.27 4.28 6.27 3.33V1.33"
                    stroke={bill.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.05 9.33H11.75"
                    stroke={bill.status === "paid" ? bill.color : "#017EFA"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <div>
                  <div className="font-gilroy-medium text-base text-[#1C1F37]">
                    {bill.name}
                  </div>
                  <div
                    className={`font-gilroy-medium text-xs mt-1 ${bill.status === "paid"
                      ? "text-[#23B899] opacity-50"
                      : "text-black opacity-50"
                      }`}
                  >
                    {bill.date}
                  </div>
                </div>
              </div>

              {/* Options Menu */}
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg
                  width="15"
                  height="3"
                  viewBox="0 0 15 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.57" cy="1.33" r="1.33" fill="#8E8E8E" />
                  <circle cx="7.05" cy="1.33" r="1.33" fill="#8E8E8E" />
                  <circle cx="12.53" cy="1.33" r="1.33" fill="#8E8E8E" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
