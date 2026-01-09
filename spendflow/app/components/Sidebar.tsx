"use client";

import Logo from "@/app/icons/spendflow-logo.svg";
import DashboardIcon from "@/app/icons/dashboard-icon.svg";
import BillsIcon from "@/app/icons/bills-icon.svg";
import ExpensesIcon from "@/app/icons/expenses-icon.svg";
import AddExpenseIcon from "@/app/icons/add-expense-icon.svg";
import AccountIcon from "@/app/icons/account-icon.svg";
import SettingsIcon from "@/app/icons/settings-icon.svg";

const navigationItems = [
  { label: "Dashboard", icon: DashboardIcon, active: true },
  { label: "Upcoming Bills", icon: BillsIcon, active: false },
  { label: "Expenses", icon: ExpensesIcon, active: false },
  { label: "Add Expense", icon: AddExpenseIcon, active: false },
  { label: "Account", icon: AccountIcon, active: false },
];

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#081a51] flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[#1a3066]">
        <Logo className="w-12 h-9" />
        <span className="text-white text-2xl font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
          SpendFlow
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-1 py-8">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`sidebar-item ${
                item.active ? "sidebar-item-active" : "sidebar-item-inactive"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-[#1a3066] px-6 py-5">
        <div className="sidebar-item sidebar-item-inactive">
          <SettingsIcon className="w-5 h-5" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
