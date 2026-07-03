import { Github, Linkedin, Mail } from 'lucide-react';

const links = [
  { label: 'GitHub', icon: Github, url: 'https://github.com/Vishal-Tiwari-11' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/vishaltiwari642' },
  { label: 'Email', icon: Mail, url: 'mailto:vishaltiwari642@gmail.com' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-border bg-paper-surface dark:border-ink-border dark:bg-ink-surface">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">

        {/* Brand */}
        <a
          href="#home"
          className="font-mono text-sm font-semibold text-paper-text dark:text-ink-text"
        >
          <span className="text-brand-500 dark:text-brand-400">&lt;</span>
          Vishal Tiwari
          <span className="text-brand-500 dark:text-brand-400">/&gt;</span>
        </a>

        {/* Copyright */}
        <p className="text-xs text-paper-muted dark:text-ink-muted">
          &copy; {year} Vishal Tiwari · Crafting the web, one commit at a time
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {links.map(({ label, icon: Icon, url }) => (
            <a
              key={label}
              href={url}
              target={label === 'Email' ? undefined : '_blank'}
              rel={label === 'Email' ? undefined : 'noreferrer noopener'}
              aria-label={label}
              className="text-paper-muted transition-colors hover:text-brand-500 dark:text-ink-muted dark:hover:text-brand-400"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
