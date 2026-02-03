"use client";

import { usePathname } from "next/navigation"; // 현재 경로 파악용
import { useTheme } from "../../contexts/ThemeContext";
import Modetoggle from "../../ui/Modetoggle";
import Link from "next/link"; // a 태그 대신 Link 권장

export default function PCSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "대시보드", href: "/" },
    { name: "포지션", href: "/positions" },
    { name: "거래내역", href: "/history" },
    { name: "설정", href: "/settings" },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full border-r border-gray-200 dark:border-gray-700 transition-colors bg-background">
      {/* 로고 영역: font-title 적용 */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="font-bold text-point text-2xl tracking-wider font-title">
          H.C
        </h1>
      </div>

      {/* 메뉴 영역 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            // 현재 경로와 일치하는지 확인
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors font-medium
                    ${
                      isActive
                        ? "text-point bg-gray-100 dark:bg-gray-800"
                        : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-point"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 하단 설정 영역 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Modetoggle variant="desktop" />
      </div>
    </aside>
  );
}
