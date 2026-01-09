"use client";

import { useState } from "react";
import EyeIcon from "@/app/icons/eye-icon.svg";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-[20px] p-12 shadow-lg" style={{
        boxShadow: "40px 40px 60px rgba(228, 230, 234, 0.74)"
      }}>
        {/* Title */}
        <h1 className="text-2xl font-semibold text-[#101828] mb-8 leading-7 font-gilroy">
          Login to your account
        </h1>

        <form className="space-y-6">
          {/* Email Field */}
          <div className="space-y-3">
            <label className="block text-sm font-normal text-[#344054] capitalize font-gilroy">
              Email
            </label>
            <input
              type="email"
              placeholder="Test123@gmail.com"
              className="w-full px-4 py-3 text-sm rounded-lg border-4 border-[#d1e9ff] focus:outline-none focus:border-blue-400 font-gilroy placeholder:font-gilroy"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-normal text-[#344054] capitalize font-gilroy">
                Password
              </label>
              <a
                href="#"
                className="text-sm font-normal text-[#1570ef] hover:underline font-gilroy"
              >
                Forgot ?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 text-sm rounded-lg border border-[#d0d5dd] focus:outline-none focus:border-blue-400 placeholder-[#98a2b3] font-gilroy placeholder:font-gilroy"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#1570ef] text-white text-base font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors font-gilroy"
          >
            Login now
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-sm font-normal text-[#98a2b3] font-gilroy">
              Don't have an account?{" "}
            </span>
            <a
              href="#"
              className="text-sm font-normal text-[#1570ef] hover:underline font-gilroy"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
