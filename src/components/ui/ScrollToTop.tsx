import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/30 bg-ink-elevated/90 text-brand-400 shadow-lg shadow-brand-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-ink-elevated hover:shadow-brand-500/20 dark:bg-ink-elevated/90 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
