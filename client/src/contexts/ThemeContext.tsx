import React, { createContext, useContext, useEffect, useState } from "react";
import { resolveAirTheme } from "@shared/presentation";
import { AIR_PALETTES, DEFAULT_PALETTE, PALETTE_STORAGE_KEY, resolveAirPalette, type AirPaletteId } from "@shared/palettes";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
  palette: AirPaletteId;
  setPalette: (palette: AirPaletteId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "air-theme-v2";

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The page still works.
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = readStorage(THEME_STORAGE_KEY) ?? readStorage("theme");
      if (!readStorage(THEME_STORAGE_KEY) && (stored === "light" || stored === "dark")) {
        writeStorage(THEME_STORAGE_KEY, stored);
      }
      return resolveAirTheme(stored, Boolean(window.matchMedia?.("(prefers-color-scheme: light)").matches), defaultTheme);
    }
    return defaultTheme;
  });
  const [palette, setPaletteState] = useState<AirPaletteId>(() => resolveAirPalette(readStorage(PALETTE_STORAGE_KEY), DEFAULT_PALETTE));

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;

    if (switchable) {
      writeStorage(THEME_STORAGE_KEY, theme);
      writeStorage("theme", null);
    }
  }, [theme, switchable]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.palette = palette;
    writeStorage(PALETTE_STORAGE_KEY, palette);
    const ground = AIR_PALETTES.find(item => item.id === palette)?.swatches[0];
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta && ground) meta.content = ground;
  }, [palette]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  const setPalette = (next: AirPaletteId) => setPaletteState(resolveAirPalette(next, DEFAULT_PALETTE));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable, palette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
