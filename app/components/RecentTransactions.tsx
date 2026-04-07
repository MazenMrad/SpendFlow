interface Transaction {
  id: string;
  type: string;
  amount: string;
  category: string;
  description: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

export default function RecentTransactions({ transactions: propTransactions }: RecentTransactionsProps) {
  const displayTransactions = propTransactions || [
    { id: "1", type: "Online Purchase", amount: "50 TND", category: "Inscription", description: "Sample", date: "Jan 13, 2026" },
    { id: "2", type: "Online Purchase", amount: "70 TND", category: "Inscription", description: "Sample", date: "Jan 12, 2026" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-[0_5px_10px_0_#F1F2FA] p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-[34px] h-[31px] rounded-full bg-[#017EFA] flex items-center justify-center relative">
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.01367 0C8.03829 0.0511246 9.04868 0.282085 9.9873 0.685547C11.3723 1.28099 12.5521 2.23221 13.3721 3.4375C14.1931 4.64444 14.6149 6.05131 14.5732 7.48633C14.5315 8.92113 14.0286 10.304 13.1406 11.4678C12.2536 12.6371 11.0224 13.5232 9.60645 14.0518C8.19092 14.5801 6.64055 14.7264 5.13965 14.4766C3.63854 14.2267 2.23771 13.5882 1.11133 12.627C0.694978 12.2716 0.323285 11.8764 0 11.4502L2.2041 10.918C2.2715 10.9815 2.33893 11.0457 2.41016 11.1064C3.24755 11.821 4.30835 12.3109 5.46777 12.5039C6.62742 12.6969 7.82337 12.5823 8.90723 12.1777C9.99073 11.7733 10.9056 11.1004 11.5508 10.2549C12.1948 9.41077 12.5451 8.42818 12.5742 7.42773C12.6032 6.4277 12.3107 5.43275 11.7188 4.5625C11.1255 3.69053 10.2537 2.97659 9.19727 2.52246C8.69905 2.30831 8.1715 2.15956 7.63086 2.07422L7.01367 0Z"
              fill="white"
            />
            <circle
              cx="10"
              cy="11"
              r="8"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <h2 className="font-gilroy-bold text-lg md:text-2xl text-[#1C1F37]">
          Recent Transactions
        </h2>
      </div>

      <div className="h-px bg-[#DADADA]/50 mb-4" />

      {/* Transactions List */}
      <div className="space-y-4">
        {displayTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-[#FAFAFA] rounded-[27px] p-4"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Icon */}
              <svg
                className="flex-shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 19.22H5V7H12V5H5C3.9 5 3 5.9 3 7V19C3 20.1 3.9 21 5 21H17C18.1 21 19 20.1 19 19V12H17V19.22Z"
                  fill="#7659FF"
                />
                <path
                  d="M19 2H17V5H14C14.01 5.01 14 7 14 7H17V9.99C17.01 10 19 9.99 19 9.99V7H22V5H19V2ZM7 9H15V11H7V9ZM7 12V14H15V12H12H7ZM7 15H15V17H7V15Z"
                  fill="#7659FF"
                />
              </svg>

              {/* Transaction Details */}
              <div className="flex-1 min-w-0">
                <div className="font-gilroy-medium text-base text-[#1C1F37] mb-1">
                  {transaction.description}
                </div>
                <div className="font-gilroy-medium text-xs text-[#1C1F37]/30">
                  {transaction.type} • {transaction.date}
                </div>
              </div>

              {/* Amount */}
              <div className="font-gilroy-medium text-xs text-black flex-shrink-0">
                {transaction.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
