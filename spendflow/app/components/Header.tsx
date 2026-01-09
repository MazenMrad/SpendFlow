"use client";

import NotificationIcon from "@/app/icons/notification-icon.svg";

export default function Header() {
  return (
    <div className="fixed top-0 right-0 left-64 h-24 bg-white border-b border-[#dadada] flex items-center justify-between px-8 z-10">
      <h1 className="text-4xl font-bold text-[#1c1f37] font-gilroy">
        Dashboard
      </h1>

      <div className="flex items-center gap-6">
        <NotificationIcon className="w-8 h-8" />
        <div className="flex items-center gap-3 pl-6 border-l border-[#dadada]">
          <div className="w-9 h-9 bg-gray-400 rounded-full" />
          <span className="text-sm font-bold text-black font-gilroy">
            Mazen Mrad
          </span>
          <svg className="w-2.5 h-2 bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  );
}
