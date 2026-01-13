import { Info, FileText } from "lucide-react";

const transactions = [
  { name: "Online Purchase", amount: "50 TND", description: "Inscription" },
  { name: "Online Purchase", amount: "70 TND", description: "Inscription" },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-lg shadow-[0_5px_10px_0_#F1F2FA] p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-[#E6F3FF] rounded-full flex items-center justify-center">
          <Info className="w-5 h-5 text-[#017EFA]" />
        </div>
        <h2 className="text-2xl font-medium text-[#1C1F37]">
          Recent Transactions
        </h2>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-[#FAFAFA] rounded-[27px] p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 text-[#7659FF]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-medium text-[#1C1F37]">
                  {transaction.name}
                </div>
                <div className="text-xs text-[#1C1F37] opacity-30 mt-1">
                  {transaction.description}
                </div>
              </div>
            </div>
            <div className="text-xs text-black font-medium">
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
