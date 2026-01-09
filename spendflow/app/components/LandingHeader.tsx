"use client";

import LandingLogo from "@/app/icons/landing-logo.svg";

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-between px-16 py-6 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <LandingLogo className="w-12 h-8" />
        <span className="text-2xl font-semibold text-black font-gilroy">
          SpendFlow
        </span>
      </div>

      <nav className="flex items-center gap-12">
        <a href="/" className="text-sm font-semibold text-black font-gilroy">
          Home
        </a>
        <a href="/" className="text-sm font-normal text-black font-gilroy">
          Features
        </a>
        <a href="/" className="text-sm font-normal text-black font-gilroy">
          Showcase
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <a href="/login" className="px-6 py-2 text-sm font-semibold text-[#070f18] bg-[#f2f4f7] rounded-full hover:bg-gray-200 font-gilroy">
          Sign In
        </a>
        <a href="/register" className="px-6 py-2 text-sm font-semibold text-white bg-[#1570ef] rounded-full hover:bg-blue-700 font-gilroy">
          Sign Up
        </a>
      </div>
    </header>
  );
}
