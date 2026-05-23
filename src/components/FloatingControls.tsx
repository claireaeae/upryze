import { Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

export function FloatingControls() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useI18n();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <button
        onClick={toggleLang}
        className="flex items-center gap-2 px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 text-xs font-medium tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
        aria-label="Toggle language"
      >
        <Languages className="h-4 w-4" />
        {lang.toUpperCase()}
      </button>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );
}