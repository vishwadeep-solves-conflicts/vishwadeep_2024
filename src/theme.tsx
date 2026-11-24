import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeKey = "navy" | "white" | "midnight";

export const themes: { key: ThemeKey; label: string; bg: string; accent: string }[] = [
  { key: "navy", label: "Navy", bg: "#061a33", accent: "#67e8f9" },
  { key: "white", label: "White", bg: "#ffffff", accent: "#3730a3" },
  { key: "midnight", label: "Midnight", bg: "#0c0c0e", accent: "#bef264" },
];

// Renamed from "vk-theme", which was saved on every visit and would pin old visitors to Navy.
const STORAGE_KEY = "vk-theme-choice";

function readStoredTheme(): ThemeKey {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "navy" || stored === "white" || stored === "midnight") return stored;
  } catch {
    // storage can be unavailable (private mode, blocked cookies)
  }
  return "midnight";
}

type ThemeContextValue = { theme: ThemeKey; setTheme: (key: ThemeKey) => void };

const ThemeContext = createContext<ThemeContextValue>({ theme: "midnight", setTheme: () => undefined });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Save only a theme the visitor picks, so a change of default reaches everyone else.
  const setTheme = (key: ThemeKey) => {
    setThemeState(key);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch {
      // ignore storage errors
    }
  };

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
