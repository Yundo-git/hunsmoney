"use client";

import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Modetoggle from "../../ui/Modetoggle";

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "대시보드", href: "#" },
    { name: "포지션", href: "#" },
    { name: "거래내역", href: "#" },
    { name: "설정", href: "#" },
  ];

  return (
    <>
      {/* 상단 바 */}
      <div className="lg:hidden flex justify-between p-4 items-center bg-white dark:bg-[#1A202C] border-b border-gray-200 dark:border-gray-700 transition-colors">
        <h1 className="text-point text-xl font-gumi">H.C</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-[#1A202C] dark:text-[#ededed]"
        >
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
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* 슬라이드 메뉴 */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out bg-white dark:bg-[#1A202C] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-point text-xl font-gumi">Menu</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#1A202C] dark:text-[#ededed]"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-[#1A202C] dark:text-[#ededed] hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-point dark:hover:text-point transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Modetoggle variant="mobile" />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
