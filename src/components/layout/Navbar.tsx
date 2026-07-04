import { useEffect, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { navLinks } from '@/data/socials';
import { useTheme } from '@/hooks/useTheme';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { generateResume } from '@/utils/generateResume';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useActiveSection(navLinks.map((link) => link.href.replace('#', '')));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route/hash changes via a link click
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-paper-border bg-paper-bg/80 backdrop-blur-md dark:border-ink-border dark:bg-ink-bg/80'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <a
          href="#home"
          className="font-mono text-sm font-semibold text-paper-text dark:text-ink-text"
        >
          <span className="text-brand-500 dark:text-brand-400">&lt;</span>
          Vishal Tiwari
          <span className="text-brand-500 dark:text-brand-400">/&gt;</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-paper-muted hover:text-paper-text dark:text-ink-muted dark:hover:text-ink-text'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-500"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={generateResume}
            className="hidden items-center gap-1.5 rounded-lg border border-paper-border px-3 py-2 text-sm font-medium text-paper-muted transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-ink-border dark:text-ink-muted dark:hover:text-brand-400 md:inline-flex"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </button>
          <a href="#contact" className="btn-primary hidden md:inline-flex">
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-paper-border text-paper-text dark:border-ink-border dark:text-ink-text md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-b border-paper-border bg-paper-bg transition-[max-height] duration-300 dark:border-ink-border dark:bg-ink-bg md:hidden ${
          isMenuOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <ul className="container-page flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-paper-text hover:bg-paper-elevated dark:text-ink-text dark:hover:bg-ink-elevated"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex flex-col gap-2 border-t border-paper-border pt-3 dark:border-ink-border">
            <button
              type="button"
              onClick={() => { generateResume(); setIsMenuOpen(false); }}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-paper-border px-3 py-2.5 text-sm font-medium text-paper-text dark:border-ink-border dark:text-ink-text"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download Resume
            </button>
            <a href="#contact" onClick={handleLinkClick} className="btn-primary w-full text-center">
              Let&apos;s talk
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
