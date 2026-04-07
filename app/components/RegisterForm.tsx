"use client";

import { useState } from "react";
import EyeIcon from "@/app/icons/eye-icon.svg";
import GoogleIcon from "@/app/icons/google-icon.svg";
import { signUp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await signUp(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-[20px] p-12 shadow-lg" style={{
        boxShadow: "40px 40px 60px rgba(228, 230, 234, 0.74)"
      }}>
        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-base font-normal text-[#5a5a5d] mb-2 font-gilroy-medium">
            Welcome back
          </p>
          <h1 className="text-2xl font-semibold text-[#101828] font-gilroy-medium ">
            Create an account
          </h1>
        </div>

        <form action={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Full Name Field */}
          <div className="space-y-3">
            <label className="block text-sm font-normal text-[#344054] capitalize font-gilroy">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 text-sm rounded-lg border-4 border-[#d1e9ff] focus:outline-none focus:border-blue-400 font-gilroy placeholder:font-gilroy"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-3">
            <label className="block text-sm font-normal text-[#344054] capitalize font-gilroy">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
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
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 text-sm rounded-lg border border-[#d0d5dd] focus:outline-none focus:border-blue-400 placeholder-[#98a2b3] font-gilroy placeholder:font-gilroy"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600  "
              >
                <EyeIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1570ef] text-white text-base font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors font-gilroy disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {/* Continue with Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#d1e9ff] text-[#1570ef] text-base font-semibold py-3 rounded-lg hover:bg-blue-100 transition-colors font-gilroy cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-sm font-normal text-[#98a2b3] font-gilroy">
              Already have an account ?{" "}
            </span>
            <a
              href="/login"
              className="text-sm font-normal text-[#1570ef] hover:underline font-gilroy"
            >
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
