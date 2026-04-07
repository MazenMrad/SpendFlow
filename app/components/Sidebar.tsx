"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/icons/spendflow-logo.svg";
import DashboardIcon from "@/app/icons/dashboard-icon.svg";
import BillsIcon from "@/app/icons/bills-icon.svg";
import ExpensesIcon from "@/app/icons/expenses-icon.svg";
import AddExpenseIcon from "@/app/icons/add-expense-icon.svg";
import AccountIcon from "@/app/icons/account-icon.svg";
import SettingsIcon from "@/app/icons/settings-icon.svg";

const navItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { name: "Upcoming Bills", icon: BillsIcon, path: "/upcoming-bills" },
  { name: "Expenses", icon: ExpensesIcon, path: "/expenses" },
  { name: "Add Expense", icon: AddExpenseIcon, path: "/add-expense" },
  { name: "Account", icon: AccountIcon, path: "/account" },

];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[240px] h-screen bg-[#081A51] fixed left-0 top-0 flex flex-col hidden lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="w-10 h-10 flex items-center justify-center">
          <Logo className="w-10 h-10 text-[#017EFA]" />
        </div>
        <span className="text-white text-xl font-gilroy-bold">SpendFlow</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-item transition-all rounded-lg mb-2 ${isActive
                  ? "bg-white/10 text-white"
                  : "text-[#CCD2E3] hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon className={`w-6 h-6 transition-colors ${isActive ? "text-white" : "text-[#CCD2E3]"}`} />
              <span className="text-lg font-gilroy-regular">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="px-2 pb-8">
        <Link
          href="/settings"
          className={`sidebar-item transition-all rounded-lg ${pathname === "/settings"
              ? "bg-white/10 text-white"
              : "text-[#CCD2E3] hover:bg-white/10 hover:text-white"
            }`}
        >
          <SettingsIcon className={`w-6 h-6 transition-colors ${pathname === "/settings" ? "text-white" : "text-[#CCD2E3]"}`} />
          <span className="text-lg font-gilroy-regular">Settings</span>
        </Link>
      </div>
    </div>
  );
}
