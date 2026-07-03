import { useEffect, useRef, useState, useCallback } from 'react';

type CursorState = 'default' | 'link' | 'button' | 'input' | 'text';

/* ── Trail particle ─────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  alpha: number;
  scale: number;
  id: number;
}

/* ── Per-state visual config ────────────────────── */
interface Cfg {
  outerSize: number;
  innerSize: number;
  outerColor: string;   // CSS color for ring
  outerBg: string;      // fill behind ring
  innerColor: string;
  label: string;
  rotate: number;       // ring border-radius morphs via squircle trick
  trailColor: string;
}

const CFG: Record<CursorState, Cfg> = {
  default: {
    outerSize: 36,
    innerSize: 5,
    outerColor: 'rgba(61,107,253,0.45)',
    outerBg: 'transparent',
    innerColor: '#3D6BFD',
    label: '',
    rotate: 0,
    trailColor: 'rgba(61,107,253,',
  },
  link: {
    outerSize: 64,
    innerSize: 0,
    outerColor: 'rgba(61,107,253,0.8)',
    outerBg: 'rgba(61,107,253,0.08)',
    innerColor: '#3D6BFD',
    label: 'open',
    rotate: 0,
    trailColor: 'rgba(99,102,241,',
  },
  button: {
    outerSize: 56,
    innerSize: 0,
    outerColor: 'rgba(16,185,129,0.8)',
    outerBg: 'rgba(16,185,129,0.08)',
    innerColor: '#10b981',
    label: 'click',
    rotate: 45,
    trailColor: 'rgba(16,185,129,',
  },
  input: {
    outerSize: 28,
    innerSize: 18,
    outerColor: 'rgba(61,107,253,0.2)',
    outerBg: 'transparent',
    innerColor: 'rgba(61,107,253,0.12)',
    label: '',
    rotate: 0,
    trailColor: 'rgba(61,107,253,',
  },
  text: {
    outerSize: 4,
    innerSize: 22,
    outerColor: 'transparent',
    outerBg: 'transparent',
    innerColor: 'rgba(61,107,253,0.35)',
    label: '',
    rotate: 0,
    trailColor: 'rgba(61,107,253,',
  },
};

function getState(el: HTMLElement): CursorState {
  if (el.closest('input, textarea, select')) return 'input';
  if (el.closest('button, [role="button"]')) return 'button';
  if (el.closest('a[href]')) return 'link';
  if (el.closest('p, h1, h2, h3, h4, h5, h6, span, li')) return 'text';
  return 'default';
}

/* ── Main component ─────────────────────────────── */
export function CursorSpotlight() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [visible, setVisible] = useState(false);
  const [curState, setCurState] = useState<CursorState>('default');
  const curStateRef = useRef<CursorState>('default');
  const mouseRef = useRef({ x: 0, y: 0 });
  const outerPosRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const pidRef = useRef(0);
  const clickingRef = useRef(false);
  const rafRef = useRef<number>(0);

  const applyState = useCallback((s: CursorState, clicking = false) => {
    const cfg = CFG[s];
    const outer = outerRef.current;
    const inner = innerRef.current;
    const lbl = labelRef.current;
    if (!outer || !inner || !lbl) return;

    const scale = clicking ? 0.8 : 1;

    outer.style.width = `${cfg.outerSize}px`;
    outer.style.height = `${cfg.outerSize}px`;
    outer.style.borderColor = cfg.outerColor;
    outer.style.background = cfg.outerBg;
    outer.style.transform = `translate(${outerPosRef.current.x}px, ${outerPosRef.current.y}px) translate(-50%,-50%) scale(${scale}) rotate(${cfg.rotate}deg)`;
    outer.style.borderRadius = s === 'button' ? '12px' : '50%';
    outer.style.boxShadow = cfg.outerBg !== 'transparent'
      ? `0 0 20px ${cfg.outerColor}, inset 0 0 12px ${cfg.outerBg}`
      : 'none';

    inner.style.width = `${cfg.innerSize}px`;
    inner.style.height = `${cfg.innerSize}px`;
    inner.style.background = cfg.innerColor;
    inner.style.opacity = cfg.innerSize > 0 ? '1' : '0';
    inner.style.borderRadius = s === 'text' ? '2px' : '50%';

    lbl.textContent = cfg.label;
    lbl.style.opacity = cfg.label ? '1' : '0';
  }, []);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Size canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    applyState('default');

    /* mouse move */
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Snap inner dot
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }

      // Spawn trail particle
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.55,
        scale: 1,
        id: pidRef.current++,
      });
      if (particlesRef.current.length > 18) particlesRef.current.shift();
    };

    /* hover context */
    const onOver = (e: MouseEvent) => {
      const next = getState(e.target as HTMLElement);
      if (next !== curStateRef.current) {
        curStateRef.current = next;
        setCurState(next);
        applyState(next, clickingRef.current);
      }
    };

    /* click press / release */
    const onDown = () => {
      clickingRef.current = true;
      applyState(curStateRef.current, true);

      // Burst particles on click
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const r = 18;
        particlesRef.current.push({
          x: mouseRef.current.x + Math.cos(angle) * r,
          y: mouseRef.current.y + Math.sin(angle) * r,
          alpha: 0.7,
          scale: 1.4,
          id: pidRef.current++,
        });
      }
    };
    const onUp = () => {
      clickingRef.current = false;
      applyState(curStateRef.current, false);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    /* RAF loop */
    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const op = outerPosRef.current;

      // Lerp outer ring
      op.x += (mx - op.x) * 0.11;
      op.y += (my - op.y) * 0.11;

      if (outerRef.current && !clickingRef.current) {
        const cfg = CFG[curStateRef.current];
        outerRef.current.style.transform =
          `translate(${op.x}px, ${op.y}px) translate(-50%,-50%) scale(1) rotate(${cfg.rotate}deg)`;
      }

      // Draw trail on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cfg = CFG[curStateRef.current];

      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.01);
      particlesRef.current.forEach((p, i) => {
        const radius = 3 * p.scale * (i / particlesRef.current.length);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(radius, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `${cfg.trailColor}${p.alpha.toFixed(2)})`;
        ctx.fill();
        p.alpha *= 0.82;
        p.scale *= 0.92;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyState, visible]);

  return (
    <>
      {/* Canvas for particle trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997] hidden lg:block"
      />

      {/* Outer ring — morphs shape, color, size */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden items-center justify-center rounded-full border-2 lg:flex"
        style={{
          opacity: visible ? 1 : 0,
          transition:
            'width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, background 0.25s ease, border-radius 0.25s ease, box-shadow 0.25s ease, opacity 0.3s ease',
          willChange: 'transform, width, height',
        }}
      >
        <span
          ref={labelRef}
          aria-hidden="true"
          className="select-none font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/80 transition-opacity duration-200"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Inner dot — instant snap */}
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full lg:block"
        style={{
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-radius 0.2s ease, opacity 0.2s ease',
          opacity: visible ? 1 : 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
