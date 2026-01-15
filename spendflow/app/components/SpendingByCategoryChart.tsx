export default function SpendingByCategory() {
  const categories = [
    { name: "Food", amount: "300 TND", percentage: "20%", color: "#FD1F9B" },
    { name: "Transport", amount: "150 TND", percentage: "25%", color: "#017EFA" },
    { name: "Entertainement", amount: "600 TND", percentage: "60%", color: "#23B899" },
    { name: "Shopping", amount: "180 TND", percentage: "15%", color: "#6342FF" },
  ];

  const legendItems = [
    { label: "Utilities", color: "#017EFA" },
    { label: "Bills", color: "#51CBFF" },
    { label: "Other", color: "#B6E9FF" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-[0_5px_10px_0_#F1F2FA] p-5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-[20px] h-[18px] rounded-full bg-[#017EFA] flex items-center justify-center relative">
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.77637 0C7.66978 0.0828946 8.54507 0.341589 9.35742 0.767578C10.6502 1.44557 11.7223 2.51314 12.4551 3.82715C13.1875 5.14056 13.5539 6.65146 13.5176 8.17773C13.4812 9.70409 13.0424 11.1932 12.2471 12.4648C11.4513 13.7371 10.3277 14.7429 9.00195 15.3467C7.67475 15.951 6.2103 16.1224 4.79004 15.834C3.37076 15.5457 2.07099 14.8144 1.04297 13.7441C0.647053 13.3319 0.298597 12.8755 0 12.3857L2.01172 11.7939C2.15888 11.9925 2.31587 12.1819 2.48535 12.3584C3.245 13.1493 4.1858 13.6704 5.18848 13.874C6.19011 14.0774 7.22585 13.959 8.17383 13.5273C9.12322 13.0949 9.95275 12.362 10.5518 11.4043C11.1511 10.4459 11.4895 9.30819 11.5176 8.12988C11.5456 6.95174 11.262 5.79534 10.708 4.80176C10.1542 3.80857 9.35861 3.02676 8.42871 2.53906C8.06282 2.34718 7.68085 2.20441 7.29102 2.10938L6.77637 0Z"
              fill="white"
            />
            <circle
              cx="7"
              cy="9"
              r="6"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <h2 className="font-gilroy-bold text-sm md:text-[15px] text-[#1C1F37]">
          Spending by Category
        </h2>
      </div>

      {/* Order Time and View Report */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-gilroy-medium text-[13px] text-black">Order Time</span>
        <button className="px-3 py-2 bg-[#F2F4FD] rounded-md">
          <span className="font-gilroy text-sm text-[#017EFA]">View Report</span>
        </button>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-6">
        <div className="relative w-[115px] h-[115px]">
          {/* SVG Donut Chart */}
          <svg
            className="transform -rotate-90"
            width="115"
            height="115"
            viewBox="0 0 115 115"
          >
            {/* Background circle */}
            <circle
              cx="57.5"
              cy="57.5"
              r="43.854"
              fill="none"
              stroke="#B6E9FF"
              strokeWidth="27.2925"
            />
            {/* Blue segment (largest) */}
            <circle
              cx="57.5"
              cy="57.5"
              r="43.854"
              fill="none"
              stroke="#017EFA"
              strokeWidth="27.2925"
              strokeDasharray="90 275"
              strokeDashoffset="0"
            />
            {/* Light blue segment */}
            <circle
              cx="57.5"
              cy="57.5"
              r="43.854"
              fill="none"
              stroke="#51CBFF"
              strokeWidth="27.2925"
              strokeDasharray="100 275"
              strokeDashoffset="-90"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-gilroy-bold text-[10px] text-[#1C1F37]">
              1230 TND
            </div>
            <div className="font-gilroy-medium text-[10px] text-[#1C1F37]">
              Spent
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {legendItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-2 py-1 border border-black/10 rounded-lg"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-gilroy-medium text-sm text-black">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Spending Trends Title */}
      <div className="font-gilroy-bold text-[11px] text-[#1C1F37] mb-2">
        Spending Trends
      </div>

      {/* Progress Bar */}
      <div className="flex h-2.5 mb-4 rounded-sm overflow-hidden">
        <div className="bg-[#FD1F9B] border border-white" style={{ width: "15%" }} />
        <div className="bg-[#017EFA] border border-white" style={{ width: "51%" }} />
        <div className="bg-[#30D987] border border-white" style={{ width: "23%" }} />
        <div className="bg-[#6342FF] border border-white rounded-r" style={{ width: "11%" }} />
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between gap-4 px-5"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-gilroy-medium text-sm text-[#1C1F37]">
                {category.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-gilroy-bold text-sm text-[#1C1F37]">
                {category.amount}
              </span>
              <div className="px-2 py-1.5 bg-[#E6F2FE] rounded-2xl">
                <span className="font-gilroy-bold text-xs text-[#017EFA]">
                  {category.percentage}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
