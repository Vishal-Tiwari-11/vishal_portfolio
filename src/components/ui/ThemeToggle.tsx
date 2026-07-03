import { Moon, Sun } from 'lucide-react';
import type { Theme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-paper-border text-paper-muted transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-ink-border dark:text-ink-muted dark:hover:text-brand-400"
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
