'use client';

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Modetoggle from './Modetoggle';

export default function MobileNav() {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 모바일: 상단 네비게이션 */}
      <div
        className="lg:hidden flex justify-between p-4 items-center"
        style={{ background: theme === 'dark' ? '#1A202C' : '#FFFFFF' }}
      >
        <h1 className="font-nanum text-point text-xl">H.C</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg"
          style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일: 슬라이드 메뉴 */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: theme === 'dark' ? '#1A202C' : '#FFFFFF' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="font-nanum text-point text-xl">메뉴</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg"
              style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
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
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
                  style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  대시보드
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
                  style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  포지션
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
                  style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  거래내역
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
                  style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  설정
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Modetoggle variant="mobile" />
          </div>
        </div>
      </div>

      {/* 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
