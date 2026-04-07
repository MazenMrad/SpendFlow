"use client"

import { Download, X } from "lucide-react";
import { useState } from "react";
import Layout from "../components/Layout";
import { useSession, signOut } from "next-auth/react";
import { updateBudgetGoal, createCategory, getDashboardData, getUserCategories, getExpenses, deleteCategory } from "../actions/expenses";
import { useEffect, useRef } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const currencyOptions = [
    { value: "tnd", label: "TND (Tunisian Dinar)" },
    { value: "usd", label: "USD (US Dollar)" },
];

const languageOptions = [
    { value: "en", label: "English" },
];

export default function Settings() {
    const { data: session } = useSession();
    const [currency, setCurrency] = useState("");
    const [language, setLanguage] = useState("");
    const [budgetGoal, setBudgetGoal] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState<{ id: string, name: string, color?: string | null }[]>([]);
    const [alertConfig, setAlertConfig] = useState<{
        open: boolean;
        title: string;
        description: string;
        type: 'success' | 'error';
    }>({
        open: false,
        title: '',
        description: '',
        type: 'success'
    });

    useEffect(() => {
        async function loadBudget() {
            const data = await getDashboardData();
            const cats = await getUserCategories();
            setCategories(cats);
        }
        loadBudget();
    }, []);

    const handleBudgetSave = async () => {
        if (!budgetGoal) return;
        const formData = new FormData();
        formData.append("amount", budgetGoal);
        const res = await updateBudgetGoal(formData);
        if (res.success) {
            setAlertConfig({
                open: true,
                title: 'Success!',
                description: 'Your monthly budget goal has been updated.',
                type: 'success'
            });
        } else {
            setAlertConfig({
                open: true,
                title: 'Error',
                description: 'Failed to update budget. Please try again.',
                type: 'error'
            });
        }
    };

    const handleCreateCategory = async () => {
        if (!categoryName) return;
        const formData = new FormData();
        formData.append("name", categoryName);
        const res = await createCategory(formData);
        if (res.success) {
            setCategoryName("");
            const cats = await getUserCategories();
            setCategories(cats);
        } else {
            setAlertConfig({
                open: true,
                title: 'Error',
                description: 'Failed to create category. Please try again.',
                type: 'error'
            });
        }
    };

    const handleDeleteCategory = async (categoryId: string) => {
        const res = await deleteCategory(categoryId);
        if (res.success) {
            const cats = await getUserCategories();
            setCategories(cats);
        } else {
            setAlertConfig({
                open: true,
                title: 'Error',
                description: res.error || 'Failed to delete category.',
                type: 'error'
            });
        }
    };

    const handleExportCSV = async () => {
        const expenses = await getExpenses();
        if (!expenses || expenses.length === 0) {
            setAlertConfig({
                open: true,
                title: 'No Data',
                description: 'There are no expenses to export.',
                type: 'error'
            });
            return;
        }

        const headers = ["Date", "Category", "Description", "Amount", "Status"];
        const csvContent = [
            headers.join(","),
            ...expenses.map(exp => [
                `"${exp.date}"`,
                `"${exp.category}"`,
                `"${exp.description.replace(/"/g, '""')}"`,
                exp.amount,
                `"${exp.status}"`
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `expenses_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (

        <Layout pageTitle="Settings">
            <div className="px-4 sm:px-8 lg:px-14 py-8 lg:py-14">

                <div className="max-w-[692px] mx-auto">
                    {/* Settings card */}
                    <div className="relative bg-white rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA] p-6 sm:p-8 lg:p-12">
                        {/* User profile section */}
                        <div className="flex flex-col items-center mb-8 lg:mb-10">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#EAECF2] rounded-full mb-4"></div>
                            <h2 className="text-sm font-bold font-inter">{session?.user?.name || "Guest"}</h2>
                        </div>

                        <div className="w-full h-px bg-[#DADADA] opacity-50 mb-8 lg:mb-10"></div>

                        {/* Settings form */}
                        <div className="space-y-5 lg:space-y-7 mb-10 lg:mb-12">
                            {/* Currency */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="text-sm font-gilroy-bold sm:w-[85px] flex-shrink-0">Currency</label>
                                <div className="flex-1">
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors font-gilroy-medium text-lg bg-white"
                                    >
                                        <option value="tnd">TND</option>
                                    </select>
                                </div>
                            </div>

                            {/* Language */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="text-sm font-gilroy-bold sm:w-[85px] flex-shrink-0">Language</label>
                                <div className="flex-1">
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors font-gilroy-medium text-lg bg-white"
                                    >
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </div>

                            {/* Monthly Budget Goal */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="text-sm font-gilroy-bold sm:w-[85px] flex-shrink-0">
                                    Monthly Budget Goal
                                </label>
                                <div className="flex-1">
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={budgetGoal}
                                            onChange={(e) => setBudgetGoal(e.target.value)}
                                            onBlur={handleBudgetSave}
                                            className="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors font-gilroy-medium text-lg"
                                            placeholder="Enter amount (e.g. 2000)"
                                        />
                                        <button
                                            onClick={handleBudgetSave}
                                            className="h-12 px-6 bg-[#017EFA] hover:bg-[#016bd6] text-white rounded-lg font-gilroy-bold transition-colors cursor-pointer"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Add Custom Categorie */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="text-sm font-gilroy-bold sm:w-[85px] flex-shrink-0">
                                    Add Custom Categorie
                                </label>
                                <div className="flex-1">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleCreateCategory();
                                            }}
                                            className="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors font-gilroy-medium text-lg"
                                            placeholder="Type name"
                                        />
                                        <button
                                            onClick={handleCreateCategory}
                                            className="h-12 px-6 bg-[#017EFA] hover:bg-[#016bd6] text-white rounded-lg font-gilroy-bold transition-colors cursor-pointer"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {/* Categories Badges */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {categories.map((cat) => (
                                            <div
                                                key={cat.id}
                                                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-gilroy-bold transition-all hover:pr-2"
                                                style={{
                                                    backgroundColor: cat.color || "#F0E8FF",
                                                    color: cat.color ? "#1C1F37" : "#6B5BF7"
                                                }}
                                            >
                                                <span>{cat.name}</span>
                                                <button
                                                    onClick={() => handleDeleteCategory(cat.id)}
                                                    className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                                                >
                                                    <X className="w-2.5 h-2.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col items-center gap-4 mb-6 lg:mb-8">
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full sm:w-[150px] h-12 bg-red-500 hover:bg-red-600 text-white rounded-[50px] font-poppins transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Export Data */}
                        <div className="flex items-center justify-end gap-2">
                            <span className="text-[11px] text-black/[0.46] font-bold font-inter">
                                Export Data
                            </span>
                            <button
                                onClick={handleExportCSV}
                                className="w-[58px] h-[23px] bg-[#F2F4FD] hover:bg-[#E8EBFA] rounded-md flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                                <Download className="w-[10px] h-[11px] text-[#1C1F37]" strokeWidth={3} />
                                <span className="text-[11px] text-[#1C1F37] font-bold font-inter">
                                    CSV
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AlertDialog open={alertConfig.open} onOpenChange={(open) => setAlertConfig(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={alertConfig.type === 'error' ? 'text-red-600' : 'text-green-600'}>
                            {alertConfig.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertConfig.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setAlertConfig(prev => ({ ...prev, open: false }))}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Layout>
    );

}
