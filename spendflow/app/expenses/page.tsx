
"use client"
import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import Layout from "../components/Layout";

interface Expense {
    id: string;
    date: string;
    category: string;
    description: string;
    amount: number;
    status: "completed" | "pending";
}

const expenses: Expense[] = [
    {
        id: "1",
        date: "Jan 13, 2026",
        category: "Food",
        description: "Restaurant Dinner",
        amount: 45.50,
        status: "completed",
    },
    {
        id: "2",
        date: "Jan 12, 2026",
        category: "Transport",
        description: "Uber Ride",
        amount: 22.30,
        status: "completed",
    },
    {
        id: "3",
        date: "Jan 11, 2026",
        category: "Entertainment",
        description: "Movie Tickets",
        amount: 32.00,
        status: "completed",
    },
    {
        id: "4",
        date: "Jan 10, 2026",
        category: "Utilities",
        description: "Electricity Bill",
        amount: 78.90,
        status: "pending",
    },
    {
        id: "5",
        date: "Jan 9, 2026",
        category: "Shopping",
        description: "Groceries",
        amount: 65.75,
        status: "completed",
    },
    {
        id: "6",
        date: "Jan 8, 2026",
        category: "Health",
        description: "Pharmacy",
        amount: 28.40,
        status: "completed",
    },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
    Food: { bg: "#FFE8E8", text: "#F75C4E" },
    Transport: { bg: "#E8F5FF", text: "#207DFF" },
    Entertainment: { bg: "#E8F5F0", text: "#51A690" },
    Utilities: { bg: "#FFF5E8", text: "#F7A500" },
    Shopping: { bg: "#F0E8FF", text: "#6B5BF7" },
    Health: { bg: "#E8FFEE", text: "#51A690" },
};

export default function Expenses() {
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
    const [sortBy, setSortBy] = useState<"date" | "amount">("date");

    const filteredExpenses = expenses.filter((exp) => {
        if (filterStatus === "all") return true;
        return exp.status === filterStatus;
    });

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
            return b.amount - a.amount;
        }
    });

    const totalAmount = sortedExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <Layout pageTitle="Expenses">
            <div className="px-4 sm:px-8 lg:px-14 py-8 lg:py-14">
                <div className="max-w-[1076px] mx-auto space-y-6">
                    {/* Filter and Stats Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-[20px] p-6 shadow-md">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-600 font-inter">Filter:</span>
                                <div className="relative">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-[#F5F6FB] rounded-lg border border-[#E3E8F1] hover:bg-[#E8EBFA] transition-colors text-sm font-inter">
                                        <span className="text-[#1C1F37] font-semibold">
                                            {filterStatus === "all" ? "All" : filterStatus === "completed" ? "Completed" : "Pending"}
                                        </span>
                                        <ChevronDown size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-600 font-inter">Sort:</span>
                                <div className="relative">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-[#F5F6FB] rounded-lg border border-[#E3E8F1] hover:bg-[#E8EBFA] transition-colors text-sm font-inter">
                                        <span className="text-[#1C1F37] font-semibold">
                                            {sortBy === "date" ? "Date" : "Amount"}
                                        </span>
                                        <ChevronDown size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-xs text-gray-500 font-inter">Total</p>
                                <p className="text-xl sm:text-2xl font-bold text-spendflow-blue font-inter">
                                    TND {totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-spendflow-blue hover:bg-spendflow-blue/90 text-white rounded-lg transition-colors">
                                <Download size={16} />
                                <span className="text-sm font-semibold font-inter hidden sm:inline">Export</span>
                            </button>
                        </div>
                    </div>

                    {/* Expenses Table/List */}
                    <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
                        {/* Mobile View */}
                        <div className="lg:hidden divide-y divide-[#E3E8F1]">
                            {sortedExpenses.length === 0 ? (
                                <div className="p-6 text-center">
                                    <p className="text-gray-500 font-inter">No expenses found</p>
                                </div>
                            ) : (
                                sortedExpenses.map((expense) => {
                                    const colors =
                                        categoryColors[expense.category] || categoryColors.Food;
                                    return (
                                        <div key={expense.id} className="p-4 sm:p-6">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#1C1F37] font-inter">
                                                        {expense.description}
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-inter mt-1">
                                                        {expense.date}
                                                    </p>
                                                </div>
                                                <span
                                                    className="text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap"
                                                    style={{ backgroundColor: colors.bg, color: colors.text }}
                                                >
                                                    {expense.category}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full font-semibold font-inter ${expense.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {expense.status === "completed" ? "Completed" : "Pending"}
                                                </span>
                                                <span className="font-bold text-[#1C1F37] font-inter">
                                                    TND {expense.amount.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#F5F6FB] border-b border-[#E3E8F1]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-[#1C1F37] font-inter">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-[#1C1F37] font-inter">
                                            Description
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-bold text-[#1C1F37] font-inter">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-bold text-[#1C1F37] font-inter">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-bold text-[#1C1F37] font-inter">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E3E8F1]">
                                    {sortedExpenses.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center">
                                                <p className="text-gray-500 font-inter">No expenses found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        sortedExpenses.map((expense) => {
                                            const colors =
                                                categoryColors[expense.category] || categoryColors.Food;
                                            return (
                                                <tr
                                                    key={expense.id}
                                                    className="hover:bg-[#F5F6FB] transition-colors"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-600 font-inter">
                                                        {expense.date}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-[#1C1F37] font-inter">
                                                        {expense.description}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span
                                                            className="text-xs font-bold px-3 py-1 rounded-full inline-block"
                                                            style={{
                                                                backgroundColor: colors.bg,
                                                                color: colors.text,
                                                            }}
                                                        >
                                                            {expense.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span
                                                            className={`text-xs px-3 py-1 rounded-full font-semibold font-inter ${expense.status === "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                        >
                                                            {expense.status === "completed"
                                                                ? "Completed"
                                                                : "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-bold text-[#1C1F37] font-inter">
                                                        TND {expense.amount.toFixed(2)}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
