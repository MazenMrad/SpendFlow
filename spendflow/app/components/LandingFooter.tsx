"use client";

import FooterLogo from "@/app/icons/footer-logo.svg";

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
            <button className="px-8 py-3 text-white font-bold text-sm font-montserrat hover:opacity-80 transition-opacity">
              Join Now
            </button>
            <button className="px-8 py-3 text-white font-bold text-sm border-2 border-white rounded-full hover:bg-white hover:text-[#222222] transition-colors font-montserrat">
              Sign Up
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex items-center justify-between pt-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <FooterLogo className="w-8 h-6 text-[#1a1a1a]" />
            </div>
            <span className="text-2xl font-semibold font-gilroy">
              SpendFlow
            </span>
          </div>

          <nav className="flex gap-12">
            <a href="/" className="text-base text-white/80 hover:text-white transition-colors font-dm-sans">
              Home
            </a>
            <a href="/" className="text-base font-bold text-white/80 hover:text-white transition-colors font-dm-sans">
              Features
            </a>
            <a href="/" className="text-base text-white/80 hover:text-white transition-colors font-dm-sans">
              Showcase
            </a>
            <a href="/login" className="text-base text-white/80 hover:text-white transition-colors font-dm-sans">
              Login
            </a>
            <a href="/register" className="text-base text-white/80 hover:text-white transition-colors font-dm-sans">
              Sign Up
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
