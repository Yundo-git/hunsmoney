"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function Modetoggle({
  variant = "mobile",
}: {
  variant?: "mobile" | "desktop";
}) {
  const { theme, setTheme } = useTheme();
  const isDesktop = variant === "desktop";

  return (
    <select
      onChange={(e) => setTheme(e.target.value === "black" ? "dark" : "light")}
      value={theme === "dark" ? "black" : "white"}
      className={`
        w-full px-3 py-2 outline-none rounded-md transition-all cursor-pointer font-medium
        ${isDesktop ? "bg-gray-100 dark:bg-gray-800" : "bg-transparent"}
        ${theme === "dark" ? "text-point" : "text-dark"}
      `}
    >
      <option value="white" className="bg-white text-black">
        화이트 모드
      </option>
      <option value="black" className="bg-gray-800 text-white">
        블랙 모드
      </option>
    </select>
  );
}
