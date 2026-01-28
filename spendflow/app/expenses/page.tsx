"use client"

import { useState, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";
import Layout from "../components/Layout";
import { getExpenses, deleteExpense } from "../actions/expenses";
import { useRouter } from "next/navigation";
import useSWR from 'swr';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Expense {
    id: string;
    date: string;
    category: string;
    description: string;
    amount: number;
    status: "completed" | "pending";
    categoryColor?: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
    Food: { bg: "#FFE8E8", text: "#F75C4E" },
    Transport: { bg: "#E8F5FF", text: "#207DFF" },
    Entertainment: { bg: "#E8F5F0", text: "#51A690" },
    Utilities: { bg: "#FFF5E8", text: "#F7A500" },
    Shopping: { bg: "#F0E8FF", text: "#6B5BF7" },
    Health: { bg: "#E8FFEE", text: "#51A690" },
};

const ThreeDotsIcon = () => (
    <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
        <circle cx="1.57" cy="1.33" r="1.33" fill="#8E8E8E" />
        <circle cx="7.05" cy="1.33" r="1.33" fill="#8E8E8E" />
        <circle cx="12.53" cy="1.33" r="1.33" fill="#8E8E8E" />
    </svg>
);

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Expenses() {
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
    const [sortBy, setSortBy] = useState<"date" | "amount">("date");
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [deleteConfig, setDeleteConfig] = useState<{ open: boolean; id: string | null }>({
        open: false,
        id: null
    });
    const [alertConfig, setAlertConfig] = useState<{ open: boolean; title: string; description: string }>({
        open: false,
        title: '',
        description: ''
    });
    const router = useRouter();

    // useSWR for real-time updates (polls every 10 seconds)
    const { data: expensesListData, error: swrError, isLoading: swrLoading, mutate } = useSWR('/api/orders', fetcher, {
        refreshInterval: 10000,
        revalidateOnFocus: true,
    });

    const expensesList = expensesListData || [];
    const loading = swrLoading && !expensesListData;

    const filteredExpenses = expensesList.filter((exp: Expense) => {
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

    const handleDelete = async (expenseId: string) => {
        setDeleteConfig({ open: true, id: expenseId });
    };

    const confirmDelete = async () => {
        if (!deleteConfig.id) return;

        const result = await deleteExpense(deleteConfig.id);
        if (result.success) {
            // Optimistically update the UI
            mutate(expensesList.filter((e: Expense) => e.id !== deleteConfig.id), false);
            setActiveMenuId(null);
            setDeleteConfig({ open: false, id: null });
            router.refresh();
        } else {
            setDeleteConfig({ open: false, id: null });
            setAlertConfig({
                open: true,
                title: 'Error',
                description: result.error || "Failed to delete expense"
            });
        }
    };
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveMenuId(null);
            setShowFilterMenu(false);
            setShowSortMenu(false);
        };
        if (activeMenuId || showFilterMenu || showSortMenu) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [activeMenuId, showFilterMenu, showSortMenu]);

    return (
        <Layout pageTitle="Expenses">
            <div className="px-4 sm:px-8 lg:px-14 py-6 lg:py-14">
                <div className="max-w-[1800px] mx-auto space-y-6">
                    {/* Filter and Stats Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-[20px] p-6 shadow-md">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-base text-gray-600 font-gilroy-bold">Filter:</span>
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowFilterMenu(!showFilterMenu);
                                            setShowSortMenu(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#F5F6FB] rounded-lg border border-[#E3E8F1] hover:bg-[#E8EBFA] transition-colors text-base font-gilroy-regular cursor-pointer"
                                    >
                                        <span className="text-[#1C1F37] font-gilroy-bold">
                                            {filterStatus === "all" ? "All" : filterStatus === "completed" ? "Completed" : "Pending"}
                                        </span>
                                        <ChevronDown size={16} />
                                    </button>

                                    {showFilterMenu && (
                                        <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#E3E8F1] z-30 py-2 overflow-hidden">
                                            {(["all", "completed", "pending"] as const).map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => {
                                                        setFilterStatus(status);
                                                        setShowFilterMenu(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm font-gilroy-medium transition-colors hover:bg-[#F5F6FB] ${filterStatus === status ? "text-spendflow-blue bg-[#F5F6FB]" : "text-[#1C1F37]"}`}
                                                >
                                                    {status === "all" ? "All" : status === "completed" ? "Completed" : "Pending"}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-base text-gray-600 font-gilroy-bold">Sort:</span>
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowSortMenu(!showSortMenu);
                                            setShowFilterMenu(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#F5F6FB] rounded-lg border border-[#E3E8F1] hover:bg-[#E8EBFA] transition-colors text-base font-gilroy-regular cursor-pointer"
                                    >
                                        <span className="text-[#1C1F37] font-gilroy-bold">
                                            {sortBy === "date" ? "Date" : "Amount"}
                                        </span>
                                        <ChevronDown size={16} />
                                    </button>

                                    {showSortMenu && (
                                        <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#E3E8F1] z-30 py-2 overflow-hidden">
                                            {(["date", "amount"] as const).map((sort) => (
                                                <button
                                                    key={sort}
                                                    onClick={() => {
                                                        setSortBy(sort);
                                                        setShowSortMenu(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm font-gilroy-medium transition-colors hover:bg-[#F5F6FB] ${sortBy === sort ? "text-spendflow-blue bg-[#F5F6FB]" : "text-[#1C1F37]"}`}
                                                >
                                                    {sort === "date" ? "Date" : "Amount"}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500 font-gilroy-regular">Total</p>
                                <p className="text-2xl sm:text-3xl text-spendflow-blue font-gilroy-bold">
                                    TND {totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-spendflow-blue hover:bg-spendflow-blue/90 text-white rounded-lg transition-colors cursor-pointer">
                                <Download size={16} />
                                <span className="text-base font-gilroy-bold hidden sm:inline">Export</span>
                            </button>
                        </div>
                    </div>

                    {/* Expenses Table/List */}
                    <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
                        {/* Mobile View */}
                        <div className="lg:hidden divide-y divide-[#E3E8F1]">
                            {sortedExpenses.length === 0 ? (
                                <div className="p-6 text-center">
                                    <p className="text-gray-500 font-gilroy-regular">No expenses found</p>
                                </div>
                            ) : (
                                sortedExpenses.map((expense) => {
                                    const defaultColors = categoryColors[expense.category] || categoryColors.Food;
                                    const bg = expense.categoryColor || defaultColors.bg;
                                    const text = expense.categoryColor ? "#1C1F37" : defaultColors.text; // Dark text for custom colors

                                    return (
                                        <div key={expense.id} className="p-4 sm:p-6">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-1">
                                                    <p className="text-lg text-[#1C1F37] font-gilroy-bold">
                                                        {expense.description}
                                                    </p>
                                                    <p className="text-sm text-gray-500 font-gilroy-regular mt-1">
                                                        {expense.date}
                                                    </p>
                                                </div>
                                                <span
                                                    className="text-base font-gilroy-bold px-3 py-1 rounded-full whitespace-nowrap"
                                                    style={{ backgroundColor: bg, color: text }}
                                                >
                                                    {expense.category}
                                                </span>
                                                <div className="relative" onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveMenuId(activeMenuId === expense.id ? null : expense.id);
                                                        }}
                                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                    >
                                                        <ThreeDotsIcon />
                                                    </button>
                                                    {activeMenuId === expense.id && (
                                                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1 cursor-pointer">
                                                            <button onClick={() => handleDelete(expense.id)} className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-gilroy-medium transition-colors ">Remove</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className={`text-sm px-3 py-1 rounded-full font-gilroy-bold ${expense.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {expense.status === "completed" ? "Completed" : "Pending"}
                                                </span>
                                                <span className="text-xl text-[#1C1F37] font-gilroy-bold">
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
                                        <th className="px-6 py-6 text-left text-lg text-[#1C1F37] font-gilroy-bold">
                                            Date
                                        </th>
                                        <th className="px-6 py-6 text-left text-lg text-[#1C1F37] font-gilroy-bold">
                                            Description
                                        </th>
                                        <th className="px-6 py-6 text-center text-lg text-[#1C1F37] font-gilroy-bold">
                                            Category
                                        </th>
                                        <th className="px-6 py-6 text-center text-lg text-[#1C1F37] font-gilroy-bold">
                                            Status
                                        </th>
                                        <th className="px-6 py-6 text-right text-lg text-[#1C1F37] font-gilroy-bold">
                                            Amount
                                        </th>
                                        <th className="px-6 py-6 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E3E8F1]">
                                    {sortedExpenses.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center">
                                                <p className="text-lg text-gray-500 font-gilroy-regular">No expenses found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        sortedExpenses.map((expense) => {
                                            const defaultColors = categoryColors[expense.category] || categoryColors.Food;
                                            const bg = expense.categoryColor || defaultColors.bg;
                                            const text = expense.categoryColor ? "#1C1F37" : defaultColors.text;

                                            return (
                                                <tr
                                                    key={expense.id}
                                                    className="hover:bg-[#F5F6FB] transition-colors"
                                                >
                                                    <td className="px-6 py-6 text-base text-gray-600 font-gilroy-regular">
                                                        {expense.date}
                                                    </td>
                                                    <td className="px-6 py-6 text-lg text-[#1C1F37] font-gilroy-medium">
                                                        {expense.description}
                                                    </td>
                                                    <td className="px-6 py-6 text-center">
                                                        <span
                                                            className="text-sm font-gilroy-bold px-3 py-1 rounded-full inline-block"
                                                            style={{
                                                                backgroundColor: bg,
                                                                color: text,
                                                            }}
                                                        >
                                                            {expense.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-6 text-center">
                                                        <span
                                                            className={`text-sm px-3 py-1 rounded-full font-gilroy-bold ${expense.status === "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                        >
                                                            {expense.status === "completed"
                                                                ? "Completed"
                                                                : "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-6 text-right text-lg text-[#1C1F37] font-gilroy-bold">
                                                        TND {expense.amount.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-6 text-right">
                                                        <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setActiveMenuId(activeMenuId === expense.id ? null : expense.id);
                                                                }}
                                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                            >
                                                                <ThreeDotsIcon />
                                                            </button>
                                                            {activeMenuId === expense.id && (
                                                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1 text-left">
                                                                    <button
                                                                        onClick={() => handleDelete(expense.id)}
                                                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-gilroy-medium transition-colors"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
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

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteConfig.open} onOpenChange={(open) => setDeleteConfig(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the expense record.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 cursor-pointer">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Error/Info Alert Dialog */}
            <AlertDialog open={alertConfig.open} onOpenChange={(open) => setAlertConfig(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertConfig.title}</AlertDialogTitle>
                        <AlertDialogDescription>{alertConfig.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setAlertConfig(prev => ({ ...prev, open: false }))} className="cursor-pointer">
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Layout>
    );
}
