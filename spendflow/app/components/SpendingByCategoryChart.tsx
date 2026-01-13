

const categories = [
  { name: "Food", amount: "300 TND", percentage: "20%", color: "#FD1F9B" },
  { name: "Transport", amount: "150 TND", percentage: "25%", color: "#017EFA" },
  { name: "Entertainement", amount: "600 TND", percentage: "60%", color: "#23B899" },
  { name: "Shopping", amount: "180 TND", percentage: "15%", color: "#6342FF" },
];

const chartLabels = [
  { name: "Utilities", color: "#017EFA" },
  { name: "Bills", color: "#51CBFF" },
  { name: "Other", color: "#B6E9FF" },
];

export default function SpendingByCategory() {
  return (
    <div className="bg-white rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA] p-8 opacity-100">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-5 h-5 bg-[#017EFA] rounded-full flex items-center justify-center relative">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" fill="white" />
            <path
              d="M7 2 L7 7 L11 7 A5 5 0 0 1 7 12 L7 7 Z"
              fill="#017EFA"
            />
          </svg>
        </div>
        <h3 className="text-[15px] font-bold text-[#1C1F37]">
          Spending by Category
        </h3>
      </div>

      {/* Chart Labels */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[13px] text-black">Order Time</span>
        <button className="ml-auto px-3 py-2 bg-[#F2F4FD] rounded-md text-[14px] text-[#017EFA]">
          View Report
        </button>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-8">
        <div className="relative w-[115px] h-[115px]">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#E6F3FF"
              strokeWidth="20"
            />
            {/* Blue segment */}
            <circle
              cx="57.5"
              cy="57.5"
              r="50"
              fill="none"
              stroke="#017EFA"
              strokeWidth="20"
              strokeDasharray="157 314"
              strokeDashoffset="0"
              transform="rotate(-90 57.5 57.5)"
            />
            {/* Inner circle */}
            <circle cx="57.5" cy="57.5" r="35" fill="white" />
            <text
              x="57.5"
              y="52"
              textAnchor="middle"
              className="text-xl font-bold"
              fill="#017EFA"
            >
              150 TND
            </text>
            <text
              x="57.5"
              y="68"
              textAnchor="middle"
              className="text-xs"
              fill="#666"
            >
              Total
            </text>
          </svg>
        </div>
      </div>

      {/* Category Labels */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {chartLabels.map((label) => (
          <div
            key={label.name}
            className="flex items-center gap-2 px-3 py-1.5 border border-black/10 rounded-lg"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: label.color }}
            ></div>
            <span className="text-sm text-black">{label.name}</span>
          </div>
        ))}
      </div>

      {/* Spending Trends Header */}
      <div className="mb-2">
        <h4 className="text-[11px] font-bold text-[#1C1F37] mb-1">
          Spending Trends
        </h4>
        <div className="flex h-2.5 rounded overflow-hidden">
          <div className="bg-[#FD1F9B] border border-white" style={{ width: "15%" }}></div>
          <div className="bg-[#017EFA] border border-white" style={{ width: "51%" }}></div>
          <div className="bg-[#30D987] border border-white" style={{ width: "23%" }}></div>
          <div className="bg-[#6342FF] border border-white" style={{ width: "11%" }}></div>
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-4 mt-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between px-5"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-sm text-[#1C1F37]">{category.name}</span>
            </div>
            <span className="text-sm font-bold text-[#1C1F37]">
              {category.amount}
            </span>
            <div className="px-2 py-1.5 bg-[#E6F2FE] rounded-2xl">
              <span className="text-xs font-bold text-[#017EFA]">
                {category.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
