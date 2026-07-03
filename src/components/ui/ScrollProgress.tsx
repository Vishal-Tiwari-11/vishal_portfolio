import { useEffect, useState } from 'react';

/**
 * Thin brand-coloured bar pinned to the very top of the viewport
 * that fills as the user scrolls down the page.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[3px] bg-brand-500 transition-[width] duration-75"
      style={{ width: `${progress}%` }}
    />
  );
}
