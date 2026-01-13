'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function Layout({ children, pageTitle }: LayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;


  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Menu Overlay and Button can remain for now, or be integrated into Sidebar later */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-navy-dark rounded-lg flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isMobileMenuOpen ? (
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[240px] w-full">
        <Header title={pageTitle} />
        {/* Page Content */}
        <main className="p-4 lg:p-[55px]">
          {children}
        </main>
      </div>
    </div >
  );
}
