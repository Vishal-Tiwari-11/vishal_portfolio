import { useEffect, useRef, useCallback } from 'react';

type CursorState = 'default' | 'link' | 'button' | 'input' | 'text';

interface Particle { x: number; y: number; alpha: number; scale: number; id: number; }

interface Cfg {
  outerSize: number;
  innerSize: number;
  outerColor: string;
  outerBg: string;
  innerColor: string;
  label: string;
  rotate: number;
  trailColor: string;
}

const CFG: Record<CursorState, Cfg> = {
  default: { outerSize: 36, innerSize: 5,  outerColor: 'rgba(61,107,253,0.6)',  outerBg: 'transparent',              innerColor: '#3D6BFD',  label: '',      rotate: 0,  trailColor: 'rgba(61,107,253,' },
  link:    { outerSize: 60, innerSize: 0,  outerColor: 'rgba(61,107,253,0.9)',  outerBg: 'rgba(61,107,253,0.10)',    innerColor: '#3D6BFD',  label: 'open',  rotate: 0,  trailColor: 'rgba(99,102,241,' },
  button:  { outerSize: 52, innerSize: 0,  outerColor: 'rgba(16,185,129,0.9)',  outerBg: 'rgba(16,185,129,0.10)',   innerColor: '#10b981',  label: 'click', rotate: 45, trailColor: 'rgba(16,185,129,' },
  input:   { outerSize: 30, innerSize: 16, outerColor: 'rgba(61,107,253,0.3)',  outerBg: 'transparent',              innerColor: 'rgba(61,107,253,0.15)', label: '', rotate: 0, trailColor: 'rgba(61,107,253,' },
  text:    { outerSize: 6,  innerSize: 20, outerColor: 'transparent',           outerBg: 'transparent',              innerColor: 'rgba(61,107,253,0.4)', label: '', rotate: 0, trailColor: 'rgba(61,107,253,' },
};

function getState(el: HTMLElement): CursorState {
  if (el.closest('input, textarea, select')) return 'input';
  if (el.closest('button, [role="button"]')) return 'button';
  if (el.closest('a[href]')) return 'link';
  if (el.closest('p, h1, h2, h3, h4, h5, h6, span, li')) return 'text';
  return 'default';
}

export function CursorSpotlight() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef<CursorState>('default');
  const mouseRef   = useRef({ x: 0, y: 0 });
  const outerPos   = useRef({ x: 0, y: 0 });
  const particles  = useRef<Particle[]>([]);
  const pid        = useRef(0);
  const clicking   = useRef(false);
  const rafRef     = useRef<number>(0);

  const applyState = useCallback((s: CursorState, click = false) => {
    const cfg = CFG[s];
    const outer = outerRef.current;
    const inner = innerRef.current;
    const lbl   = labelRef.current;
    if (!outer || !inner || !lbl) return;

    const scale = click ? 0.78 : 1;
    outer.style.width        = `${cfg.outerSize}px`;
    outer.style.height       = `${cfg.outerSize}px`;
    outer.style.borderColor  = cfg.outerColor;
    outer.style.background   = cfg.outerBg;
    outer.style.borderRadius = s === 'button' ? '10px' : '50%';
    outer.style.boxShadow    = cfg.outerBg !== 'transparent'
      ? `0 0 18px ${cfg.outerColor}`
      : `0 0 8px rgba(61,107,253,0.3)`;
    outer.style.transform    = `translate(${outerPos.current.x}px,${outerPos.current.y}px) translate(-50%,-50%) scale(${scale}) rotate(${cfg.rotate}deg)`;

    inner.style.width        = `${cfg.innerSize}px`;
    inner.style.height       = `${cfg.innerSize}px`;
    inner.style.background   = cfg.innerColor;
    inner.style.opacity      = cfg.innerSize > 0 ? '1' : '0';
    inner.style.borderRadius = s === 'text' ? '2px' : '50%';

    lbl.textContent  = cfg.label;
    lbl.style.opacity = cfg.label ? '1' : '0';
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Show immediately on first move
    const show = () => {
      if (outerRef.current) outerRef.current.style.opacity = '1';
      if (innerRef.current) innerRef.current.style.opacity = '1';
    };
    const hide = () => {
      if (outerRef.current) outerRef.current.style.opacity = '0';
      if (innerRef.current) innerRef.current.style.opacity = '0';
    };

    applyState('default');

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      show();
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
      }
      particles.current.push({ x: e.clientX, y: e.clientY, alpha: 0.6, scale: 1, id: pid.current++ });
      if (particles.current.length > 20) particles.current.shift();
    };

    const onOver = (e: MouseEvent) => {
      const next = getState(e.target as HTMLElement);
      if (next !== stateRef.current) {
        stateRef.current = next;
        applyState(next, clicking.current);
      }
    };

    const onDown = () => {
      clicking.current = true;
      applyState(stateRef.current, true);
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 * i) / 8;
        particles.current.push({ x: mouseRef.current.x + Math.cos(a) * 20, y: mouseRef.current.y + Math.sin(a) * 20, alpha: 0.8, scale: 1.6, id: pid.current++ });
      }
    };
    const onUp = () => { clicking.current = false; applyState(stateRef.current, false); };

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const op = outerPos.current;
      op.x += (mx - op.x) * 0.11;
      op.y += (my - op.y) * 0.11;

      if (outerRef.current && !clicking.current) {
        const cfg = CFG[stateRef.current];
        outerRef.current.style.transform = `translate(${op.x}px,${op.y}px) translate(-50%,-50%) scale(1) rotate(${cfg.rotate}deg)`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cfg = CFG[stateRef.current];
      particles.current = particles.current.filter(p => p.alpha > 0.01);
      particles.current.forEach((p, i) => {
        const r = Math.max(0.5, 3.5 * p.scale * (i / Math.max(1, particles.current.length)));
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${cfg.trailColor}${p.alpha.toFixed(2)})`;
        ctx.fill();
        p.alpha *= 0.80;
        p.scale *= 0.90;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, [applyState]);

  return (
    <>
      {/* Particle trail canvas */}
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9997] hidden lg:block" />

      {/* Outer ring */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden items-center justify-center rounded-full border-2 lg:flex"
        style={{
          opacity: 0,
          width: '36px', height: '36px',
          borderColor: 'rgba(61,107,253,0.6)',
          boxShadow: '0 0 8px rgba(61,107,253,0.3)',
          transition: 'width 0.28s cubic-bezier(0.34,1.56,0.64,1), height 0.28s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, background 0.2s ease, border-radius 0.2s ease, box-shadow 0.2s ease, opacity 0.25s ease',
          willChange: 'transform, width, height',
        }}
      >
        <span ref={labelRef} aria-hidden="true"
          className="select-none font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/90"
          style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full lg:block"
        style={{
          opacity: 0,
          width: '5px', height: '5px',
          background: '#3D6BFD',
          transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease, border-radius 0.18s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
