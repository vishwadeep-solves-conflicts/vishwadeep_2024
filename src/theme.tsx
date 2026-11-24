import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeKey = "navy" | "white" | "midnight";

export const themes: { key: ThemeKey; label: string; bg: string; accent: string }[] = [
  { key: "navy", label: "Navy", bg: "#061a33", accent: "#67e8f9" },
  { key: "white", label: "White", bg: "#ffffff", accent: "#3730a3" },
  { key: "midnight", label: "Midnight", bg: "#0c0c0e", accent: "#bef264" },
];

const STORAGE_KEY = "vk-theme";

function readStoredTheme(): ThemeKey {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "navy" || stored === "white" || stored === "midnight") return stored;
  } catch {
    // storage can be unavailable (private mode, blocked cookies)
  }
  return "navy";
}

type ThemeContextValue = { theme: ThemeKey; setTheme: (key: ThemeKey) => void };

const ThemeContext = createContext<ThemeContextValue>({ theme: "navy", setTheme: () => undefined });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
