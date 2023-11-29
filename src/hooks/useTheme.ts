import { useState, useEffect, useCallback } from "react";
/**
 * @description 更换系统主题颜色
 * @returns theme light | dark
 * @returns handleToggle 切换主题
 */

const allThemesList = [
  {
    name: "--text-color",
    light: "#363636",
    dark: "#fff",
  },
  {
    name: "--bg-color",
    light: "#f6f4f4",
    dark: "#1d1e22",
  },
  {
    name: "--menus-bg-color",
    light: "rgba(0,0,0,0.12)",
    dark: "rgba(255,255,255,0.12)",
  },
  {
    name: "--menus-hover-bg-color",
    light: "rgba(0,0,0,0.32)",
    dark: "rgba(255,255,255,0.32)",
  },
  {
    name: "--border-color",
    light: "rgba(0,0,0,0.08)",
    dark: "rgba(255,255,255,0.08)",
  },
  {
    name: "--banner-hover-text-color",
    light: "#ee5e70",
    dark: "#714870",
  },
];

export const useTheme = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "dark"
  );

  const handleChangeTheme = useCallback(() => {
    allThemesList.forEach((item) => {
      document.documentElement.style.setProperty(
        item.name,
        theme === "light" ? item.light : item.dark
      );
    });
  }, [theme]);

  const handleToggle = (e: boolean) => {
    e ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    handleChangeTheme();
    window.localStorage.setItem("theme", theme);
  }, [handleChangeTheme, theme]);

  return {
    theme,
    handleToggle,
  };
};
