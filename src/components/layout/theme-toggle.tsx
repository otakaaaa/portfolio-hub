"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => undefined;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={mounted ? (isDark ? "ライトテーマに切り替える" : "ダークテーマに切り替える") : "テーマを切り替える"}
      aria-pressed={mounted ? isDark : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
