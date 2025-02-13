import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import React from "react";

import { Root } from "@radix-ui/react-toggle";

export type SystemTheme = "light" | "dark";
export type ThemeMode = SystemTheme | "system";

const THEME_STORAGE_KEY = "ai-ug-theme";
const DEFAULT_THEME = "system" as const;
const SYSTEM_THEMES = ["light", "dark"] as const;
const MEDIA = "(prefers-color-scheme: dark)";

function setColorScheme(theme: SystemTheme) {
  const el = document.documentElement;
  if (SYSTEM_THEMES.includes(theme)) {
    el.style.colorScheme = theme;
  }
}

function updateDOM(theme: SystemTheme) {
  const el = document.documentElement;
  el.classList.remove(...SYSTEM_THEMES);
  el.classList.add(theme);
  setColorScheme(theme);
}

function getSystemTheme() {
  return window.matchMedia(MEDIA).matches ? "dark" : "light";
}

function getThemeMode() {
  let theme: ThemeMode | null = null;

  // check for localStorage support
  if (typeof localStorage !== "undefined") {
    theme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  }

  return theme || DEFAULT_THEME;
}

function getTheme() {
  const mode = getThemeMode();
  return mode === "system" ? getSystemTheme() : mode;
}

function disableAnimation() {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

function setTheme(theme: ThemeMode) {
  const cleanup = disableAnimation();
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateDOM(getTheme());
  cleanup();
}

export function ThemeToggle() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [theme, updateTheme] = React.useState<ThemeMode>(getThemeMode());

  const setSystem = React.useCallback(() => {
    setTheme("system");
    updateTheme(getThemeMode());
  }, []);

  const setDark = React.useCallback(() => {
    setTheme("dark");
    updateTheme(getThemeMode());
  }, []);

  const setLight = React.useCallback(() => {
    setTheme("light");
    updateTheme(getThemeMode());
  }, []);

  const handleMediaQuery = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: MediaQueryListEvent | MediaQueryList) => {
      updateTheme(getThemeMode());
    },
    []
  );

  // Always listen to System preference
  React.useEffect(() => {
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) {
        return;
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      if (!e.newValue) {
        setTheme("system");
        updateTheme(getThemeMode());
      } else {
        setTheme(e.newValue as ThemeMode);
        updateTheme(getThemeMode());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  React.useEffect(() => {
    setIsLoading(false);
    setTheme(getThemeMode());
  }, []);

  return (
    <div className="bg-background flex items-center justify-center gap-0.5 rounded-full border p-1">
      <Root
        aria-label="System Theme"
        onPressedChange={setSystem}
        pressed={!isLoading && theme === "system"}
        className="text-foreground ring-ring data-[state=on]:border-tertiary data-[state=on]:bg-tertiary data-[state=on]:text-tertiary-foreground inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 data-[state=on]:shadow-lg"
      >
        <MonitorIcon className="h-4 w-4" strokeWidth="1.5" />
      </Root>
      <Root
        aria-label="Dark Theme"
        onPressedChange={setDark}
        pressed={!isLoading && theme === "dark"}
        className="text-foreground ring-ring data-[state=on]:border-tertiary data-[state=on]:bg-tertiary data-[state=on]:text-tertiary-foreground inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 data-[state=on]:shadow-lg"
      >
        <MoonIcon className="h-4 w-4" strokeWidth="1.5" />
      </Root>
      <Root
        aria-label="Light Theme"
        onPressedChange={setLight}
        pressed={!isLoading && theme === "light"}
        className="text-foreground ring-ring data-[state=on]:border-tertiary data-[state=on]:bg-tertiary data-[state=on]:text-tertiary-foreground inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 data-[state=on]:shadow-lg"
      >
        <SunIcon className="h-4 w-4" strokeWidth="1.5" />
      </Root>
    </div>
  );
}
