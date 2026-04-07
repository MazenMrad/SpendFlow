"use client";

export default function LandingFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16 px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="bg-[#222222] rounded-[41px] px-12 py-10 mb-16 flex items-center justify-between">
          <h3 className="text-[24px] font-bold font-montserrat">
            Ready to get Started ?
          </h3>
          <div className="flex gap-4">
            <a href="/regist">
              <button className="px-8 py-3 text-white font-bold text-sm font-montserrat hover:opacity-80 transition-opacity cursor-pointer">
                Join Now
              </button>
            </a>
            <button className="px-8 py-3 text-white font-bold text-sm border-2 border-white rounded-full hover:bg-white hover:text-[#222222] transition-colors font-montserrat cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex items-center justify-between pt-8">
          <div className="flex items-center gap-4">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6b500c55705bb29ccea2f5cec11694f620a9a2ef?width=96"
              alt="SpendFlow Icon"
              className="h-8 w-auto opacity-80"
            />
            <span className="text-2xl font-semibold font-gilroy-semibold">
              SpendFlow
            </span>
          </div>

          <nav className="flex gap-12">
            <a href="/" className="text-base text-white/80 hover:text-white transition-colors font-gilroy-bold">
              Home
            </a>
            <a href="/" className="text-base font-bold text-white/80 hover:text-white font-gilroy-bold transition-colors font-gilroy">
              Features
            </a>
            <a href="/" className="text-base text-white/80 hover:text-white transition-colors font-gilroy-bold">
              Showcase
            </a>
            <a href="/login" className="text-base text-white/80 hover:text-white transition-colors font-gilroy-bold">
              Login
            </a>
            <a href="/register" className="text-base text-white/80 hover:text-white transition-colors font-gilroy-bold">
              Sign Up
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
