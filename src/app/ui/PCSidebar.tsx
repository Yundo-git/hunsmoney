'use client';

import { useTheme } from '../contexts/ThemeContext';
import Modetoggle from './Modetoggle';

export default function PCSidebar() {
  const { theme } = useTheme();

  return (
    <div
      className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full"
      style={{ background: theme === 'dark' ? '#1A202C' : '#FFFFFF' }}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="font-nanum text-point text-2xl">H.C</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block px-4 py-2 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
              style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
            >
              대시보드
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
              style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
            >
              포지션
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
              style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
            >
              거래내역
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 rounded-lg font-nanum hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-point transition-colors"
              style={{ color: theme === 'dark' ? '#ededed' : '#1A202C' }}
            >
              설정
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Modetoggle variant="desktop" />
      </div>
    </div>
  );
}
