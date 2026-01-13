"use client"

import { Download } from "lucide-react";
import { useState } from "react";
import Layout from "../components/Layout";

const currencyOptions = [
    { value: "tnd", label: "TND (Tunisian Dinar)" },
    { value: "usd", label: "USD (US Dollar)" },
];

const languageOptions = [
    { value: "en", label: "English" },
];

export default function Settings() {
    const [currency, setCurrency] = useState("");
    const [language, setLanguage] = useState("");

    return (

        <Layout pageTitle="Settings">
            <div className="px-4 sm:px-8 lg:px-14 py-8 lg:py-14">

                <div className="max-w-[692px] mx-auto">
                    {/* Settings card */}
                    <div className="relative bg-white rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA] p-6 sm:p-8 lg:p-12">
                        {/* User profile section */}
                        <div className="flex flex-col items-center mb-8 lg:mb-10">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#EAECF2] rounded-full mb-4"></div>
                            <h2 className="text-sm font-bold font-inter">Mazen Mrad</h2>
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
                                    <input
                                        type="text"
                                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors font-gilroy-medium text-lg"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Add Custom Categorie */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="text-sm font-gilroy-bold sm:w-[85px] flex-shrink-0">
                                    Add Custom Categorie
                                </label>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors font-gilroy-medium text-lg"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col items-center gap-4 mb-6 lg:mb-8">
                            <button className="w-full sm:w-[150px] h-12 bg-red-500 hover:bg-red-600 text-white rounded-[50px] font-poppins transition-colors cursor-pointer">
                                Logout
                            </button>
                            <button className="w-full sm:w-[150px] h-12 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-[50px] font-inter transition-colors cursor-pointer">
                                Change Password
                            </button>
                        </div>

                        {/* Export Data */}
                        <div className="flex items-center justify-end gap-2">
                            <span className="text-[11px] text-black/[0.46] font-bold font-inter">
                                Export Data
                            </span>
                            <button className="w-[58px] h-[23px] bg-[#F2F4FD] hover:bg-[#E8EBFA] rounded-md flex items-center justify-center gap-1 transition-colors">
                                <Download className="w-[10px] h-[11px] text-[#1C1F37]" strokeWidth={3} />
                                <span className="text-[11px] text-[#1C1F37] font-bold font-inter">
                                    CSV
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}
