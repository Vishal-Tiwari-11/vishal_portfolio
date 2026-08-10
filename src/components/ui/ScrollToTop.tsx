import { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onScroll = () => {
      const show = window.scrollY > 400;
      btn.style.opacity = show ? '1' : '0';
      btn.style.transform = show ? 'translateY(0)' : 'translateY(1rem)';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/30 bg-ink-elevated/90 text-brand-400 shadow-lg shadow-brand-900/20 backdrop-blur-sm transition-[opacity,transform] duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-ink-elevated hover:shadow-brand-500/20 dark:bg-ink-elevated/90"
      style={{ opacity: 0, transform: 'translateY(1rem)', pointerEvents: 'none' }}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
