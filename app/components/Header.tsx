"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Calendar, Settings, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getWeeklyUpcomingBills } from "@/app/actions/expenses";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const [weeklyBills, setWeeklyBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBills() {
      setLoading(true);
      const bills = await getWeeklyUpcomingBills();
      setWeeklyBills(bills);
      setLoading(false);
    }
    fetchBills();
  }, []);

  return (
    <div className="h-[95px] bg-white border border-[rgba(0,0,0,0.46)] flex items-center justify-between px-4 md:px-10">
      <h1 className="text-2xl md:text-[32px] font-gilroy-bold text-[#1C1F37]">{title}</h1>

      <div className="flex items-center gap-2 md:gap-5">
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              {weeklyBills.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 " align="end">
            <div className="p-4 border-b">
              <h3 className="font-gilroy-bold text-lg text-[#1C1F37]">Due this week</h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-sm text-gray-500 font-gilroy">Loading...</div>
              ) : weeklyBills.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {weeklyBills.map((bill) => (
                    <div key={bill.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-gilroy-bold text-sm text-[#1C1F37] truncate max-w-[150px]">
                          {bill.name}
                        </span>
                        <span className="font-gilroy-bold text-sm text-[#017EFA]">
                          {bill.amount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-gilroy">
                        <Calendar className="w-3 h-3" />
                        <span>{bill.date}</span>
                        <span className="mx-1">•</span>
                        <span>{bill.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-sm text-gray-400 font-gilroy">
                  No payments due this week
                </div>
              )}
            </div>
            <div className="p-3 bg-gray-50 text-center border-t">
              <a href="/upcoming-bills" className="text-xs font-gilroy-bold text-[#017EFA] hover:underline">
                View all upcoming bills
              </a>
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-px h-10 bg-[#DADADA]"></div>

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-gilroy-bold text-sm">{userInitials}</span>
              </div>
              <span className="font-gilroy-bold text-sm text-black hidden sm:inline">{userName}</span>
              <button className="w-5 h-6 border border-[rgba(88,85,85,0.24)] rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronDown className="w-4 h-4 text-[#9A9A9A]" />
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-1" align="end">
            <div className="flex flex-col">
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm font-gilroy-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-2 px-3 py-2 text-sm font-gilroy-medium text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

