"use client";

import NotificationIcon from "@/app/icons/notification-icon.svg";

import { Bell, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";

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

  return (
    <div className="h-[95px] bg-white border border-[rgba(0,0,0,0.46)] flex items-center justify-between px-4 md:px-10">
      <h1 className="text-2xl md:text-[32px] font-gilroy-bold text-[#1C1F37]">{title}</h1>

      <div className="flex items-center gap-2 md:gap-5">
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="w-px h-10 bg-[#DADADA]"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-gilroy-bold text-sm">{userInitials}</span>
          </div>
          <span className="font-gilroy-bold text-sm text-black hidden sm:inline">{userName}</span>
          <button className="w-5 h-6 border border-[rgba(88,85,85,0.24)] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <ChevronDown className="w-4 h-4 text-[#9A9A9A]" />
          </button>
        </div>
      </div>
    </div>
  );
}

