"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useApp();

  // Apply data-theme to the html element for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
