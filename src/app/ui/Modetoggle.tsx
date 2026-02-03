"use client";

import { useTheme } from "../contexts/ThemeContext";

interface ModetoggleProps {
  variant?: "mobile" | "desktop";
}

export default function Modetoggle({ variant = "mobile" }: ModetoggleProps) {
  const { theme, setTheme } = useTheme();

  const baseClasses = "font-nanum";
  const mobileClasses = "";
  const desktopClasses = "w-full px-3 py-2 ";

  const className = `${baseClasses} ${variant === "desktop" ? desktopClasses : mobileClasses}`;

  const mobileStyle = { color: theme === "dark" ? "#7dadbe" : "#1a202c" };
  const desktopStyle = {
    color: theme === "dark" ? "#7dadbe" : "#1a202c",
    background: theme === "dark" ? "#2d3748" : "#f7fafc",
  };

  return (
    <div>
      <select
        onChange={(e) =>
          setTheme(e.target.value === "black" ? "dark" : "light")
        }
        value={theme === "dark" ? "black" : "white"}
        className={className}
        style={variant === "desktop" ? desktopStyle : mobileStyle}
      >
        <option value="white">
          {variant === "desktop" ? "화이트 모드" : "화이트"}
        </option>
        <option value="black">
          {variant === "desktop" ? "블랙 모드" : "블랙"}
        </option>
      </select>
    </div>
  );
}
