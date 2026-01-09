"use client";

import TransactionsIcon from "@/app/icons/transactions-icon.svg";
import TransactionItemIcon from "@/app/icons/transaction-item-icon.svg";

const transactions = [
  {
    type: "Online Purchase",
    description: "Inscription",
    amount: "50 TND",
  },
  {
    type: "Online Purchase",
    description: "Inscription",
    amount: "70 TND",
  },
];

export default function RecentTransactions() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <TransactionsIcon className="w-8 h-8" />
        <h2 className="text-2xl font-medium text-[#1c1f37]">
          Recent Transactions
        </h2>
      </div>

      {/* Transaction Items */}
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="transaction-item bg-[#fafafa] flex justify-between items-center px-6 py-5"
          >
            <div className="flex items-center gap-4">
              <TransactionItemIcon className="w-6 h-6" />
              <div className="flex flex-col">
                <p
                  className="text-sm font-medium text-[#1c1f37]"
                >
                  {transaction.type}
                </p>
                <p
                  className="text-xs font-medium text-[#1c1f37] opacity-30"
                >
                  {transaction.description}
                </p>
              </div>
            </div>
            <span
              className="text-sm font-medium text-[#000000]"
            >
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
