"use client";

import Link from "next/link";
import LandingLogo from "@/app/icons/landing-logo.svg";

export default function RegisterHeader() {
  return (
    <header className="flex items-center justify-between px-16 py-6 bg-white border-b border-gray-100">
      <Link href="/" className="flex items-center gap-3">
        <LandingLogo className="w-12 h-8" />
        <span className="text-2xl font-semibold text-[#070f18] font-gilroy">
          SpendFlow
        </span>
      </Link>

      <nav className="flex items-center gap-12">
        <a href="/" className="text-sm font-semibold text-[#070f18] font-gilroy">
          Home
        </a>
        <a href="/" className="text-sm font-normal text-[#070f18] font-gilroy">
          Features
        </a>
        <a href="/" className="text-sm font-normal text-[#070f18] font-gilroy">
          Showcase
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/login" className="px-6 py-2 text-sm font-normal text-[#070f18] font-gilroy">
          Sign In
        </Link>
        <Link href="/register" className="px-6 py-2 text-sm font-normal text-white bg-[#1570ef] rounded-full hover:bg-blue-700 font-gilroy">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
