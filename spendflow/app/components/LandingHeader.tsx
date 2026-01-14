import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="w-full px-16">
        <nav className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a0b0ad2a41e37f3e5b7ceae78accc16318959ce2?width=430"
              alt="SpendFlow"
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-16">
            <Link
              href="/"
              className="text-[#070F18] font-semibold text-base font-gilroy-medium hover:text-[#1F7CFF] transition-colors"
            >
              Home
            </Link>
            <a
              href="#features"
              className="text-[#070F18] text-base font-gilroy-medium hover:text-[#1F7CFF] transition-colors"
            >
              Features
            </a>
            <a
              href="#showcase"
              className="text-[#070F18] text-base font-gilroy-medium hover:text-[#1F7CFF] transition-colors"
            >
              Showcase
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <a href="/login" className="px-6 lg:px-8 py-3 rounded-full bg-[#F5F6FB] text-[#070F18] text-base font-poppins hover:bg-[#E5E6F1] transition-colors cursor-pointer">
              Sign In
            </a>
            <a href="/register" className="px-6 lg:px-8 py-3 rounded-full bg-[#1F7CFF] text-white text-base font-poppins hover:bg-[#1A6AE0] transition-colors cursor-pointer">
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-[#070F18] cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
