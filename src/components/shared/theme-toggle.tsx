"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";
  const tooltipText = !mounted
    ? "Toggle theme"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  const button = (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-foreground transition-all duration-200 hover:bg-muted hover:border-border hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
        className,
      )}
      aria-label={tooltipText}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 text-amber-500 dark:-rotate-90 dark:scale-0 dark:text-muted-foreground" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 text-muted-foreground dark:rotate-0 dark:scale-100 dark:text-indigo-400" />
      <span className="sr-only">{tooltipText}</span>
    </button>
  );

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground text-muted-foreground",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-foreground">
            {isDark ? (
              <Moon className="h-3.5 w-3.5 text-indigo-400" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-500" />
            )}
          </div>
          <span>Theme</span>
        </div>
        <span className="text-xs font-semibold capitalize text-foreground">
          {mounted ? (isDark ? "Dark" : "Light") : "System"}
        </span>
      </button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipContent side="bottom" sideOffset={8}>
        <p className="text-xs">{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
