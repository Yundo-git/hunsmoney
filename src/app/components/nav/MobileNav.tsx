"use client";

import { useState } from "react";
import Modetoggle from "../../ui/Modetoggle";
import Link from "next/link"; // Next.js 프로젝트라면 Link 사용 권장

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "대시보드", href: "/" },
    { name: "포지션", href: "/positions" },
    { name: "거래내역", href: "/history" },
    { name: "설정", href: "/settings" },
  ];

  return (
    <>
      {/* 1. 상단 바: bg-background 적용 */}
      <header className="lg:hidden flex justify-between p-4 items-center bg-background border-b border-gray-200 dark:border-gray-700 transition-colors sticky top-0 z-40">
        <h1 className="text-point text-2xl font-title font-bold">H.C</h1>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg text-foreground"
          aria-label="메뉴 열기"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* 2. 슬라이드 메뉴: 오른쪽에서 열리도록 수정 */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out bg-background ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full font-title">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-point text-2xl font-bold">Menu</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-foreground"
              aria-label="메뉴 닫기"
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
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl block font-medium text-foreground hover:text-point transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Modetoggle variant="mobile" />
          </div>
        </div>
      </div>

      {/* 3. 오버레이: z-index 조정 및 애니메이션 효과 */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
