"use client";

interface MetricsCardProps {
  label: string;
  amount: string;
  change?: string;
  changeSign?: "up" | "down";
  description?: string;
}

export default function MetricsCard({
  label,
  amount,
  change,
  changeSign,
  description,
}: MetricsCardProps) {
  return (
    <div className="bg-[#f5f7fb] rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-[#017efa]" />
        <span className="text-sm font-gilroy-medium text-[rgba(28,31,55,0.58)]">
          {label}
        </span>
      </div>
      <p className="text-2xl font-gilroy-bold text-[#1c1f37]">
        {amount}
      </p>
      {change && (
        <div className="flex items-center gap-1">
          <span
            className={`text-xs font-gilroy-bold ${changeSign === "up" ? "text-[#30d988]" : "text-[#dd405f]"
              }`}
          >
            {changeSign === "up" ? "↑" : "↓"} {change}
          </span>
        </div>
      )}
      {description && (
        <p className="text-xs font-gilroy-medium text-[#1c1f37]">{description}</p>
      )}
    </div>
  );
}
