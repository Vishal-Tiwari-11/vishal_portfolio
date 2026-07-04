import { useEffect, useRef } from 'react';

export function CursorSpotlight() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on real pointer devices, respect reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    let rafId: number;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;       // ring position (lerped)
    let isVisible = false;

    const LERP = 0.14; // smoothness — lower = slower follow

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Dot snaps instantly
      dot.style.transform = `translate(${mx}px, ${my}px)`;

      if (!isVisible) {
        isVisible = true;
        ring.style.opacity = '1';
        dot.style.opacity  = '1';
      }
    };

    const onLeave = () => {
      isVisible = false;
      ring.style.opacity = '0';
      dot.style.opacity  = '0';
    };

    const onEnter = () => {
      if (isVisible) return;
      isVisible = true;
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    };

    // Scale ring on interactive elements
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isLink   = !!el.closest('a[href]');
      const isBtn    = !!el.closest('button, [role="button"]');
      const isInput  = !!el.closest('input, textarea, select');

      if (isLink || isBtn) {
        ring.style.width  = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = isBtn
          ? 'rgba(16,185,129,0.8)'
          : 'rgba(61,107,253,0.8)';
        ring.style.background = isBtn
          ? 'rgba(16,185,129,0.06)'
          : 'rgba(61,107,253,0.06)';
      } else if (isInput) {
        ring.style.width  = '28px';
        ring.style.height = '28px';
        ring.style.borderColor = 'rgba(61,107,253,0.3)';
        ring.style.background = 'transparent';
      } else {
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(61,107,253,0.55)';
        ring.style.background = 'transparent';
      }
    };

    const onDown = () => { ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(0.8)`; };
    const onUp   = () => { ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(1)`; };

    // RAF loop — only lerps ring
    const tick = () => {
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(1)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseover',  onOver,  { passive: true });
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lags smoothly */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full border-2 lg:block"
        style={{
          width: '36px',
          height: '36px',
          opacity: 0,
          borderColor: 'rgba(61,107,253,0.55)',
          background: 'transparent',
          transition: 'width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />

      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full lg:block"
        style={{
          width: '5px',
          height: '5px',
          opacity: 0,
          background: '#3D6BFD',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease',
          boxShadow: '0 0 6px rgba(61,107,253,0.7)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
