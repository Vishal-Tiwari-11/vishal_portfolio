import { useEffect, useRef } from 'react';

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animId: number;
    let t = 0;
    let isVisible = true;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const mouse    = { x: -9999, y: -9999 };
    const smoothed = { x: -9999, y: -9999 };

    // Initial size
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    smoothed.x = canvas.width  / 2;
    smoothed.y = canvas.height / 2;
    mouse.x    = smoothed.x;
    mouse.y    = smoothed.y;

    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }, 100);
    };
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Pause when hero scrolls out of view
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    // Pause when tab is hidden
    const onVisibilityChange = () => {
      if (!document.hidden && isVisible) animId = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const draw = () => {
      if (!isVisible || document.hidden) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const W = canvas.width;
      const H = canvas.height;
      const isDark = document.documentElement.classList.contains('dark');

      smoothed.x += (mouse.x - smoothed.x) * 0.06;
      smoothed.y += (mouse.y - smoothed.y) * 0.06;

      ctx.clearRect(0, 0, W, H);

      if (isDark) {
        const SIZE  = 54;
        const COLS  = Math.ceil(W / SIZE) + 3;
        const ROWS  = Math.ceil(H / (SIZE * 0.58)) + 3;
        const HALF  = SIZE * 0.42;
        const TOP_H = HALF * 0.44;

        for (let row = -1; row < ROWS; row++) {
          for (let col = -1; col < COLS; col++) {
            const stagger = (row % 2 === 0) ? 0 : SIZE / 2;
            const baseCx  = col * SIZE + stagger - SIZE / 2;
            const baseCy  = row * SIZE * 0.58;

            const dxRaw = smoothed.x - baseCx;
            const dyRaw = smoothed.y - baseCy;
            const dist  = Math.sqrt(dxRaw * dxRaw + dyRaw * dyRaw);
            const influence = Math.max(0, 1 - dist / 260);

            const drift = influence * 7;
            const cx = baseCx + (dist > 0 ? (dxRaw / dist) * drift : 0);
            const cy = baseCy + (dist > 0 ? (dyRaw / dist) * drift : 0);

            const centerDist = Math.sqrt(
              Math.pow((cx - W / 2) / W, 2) + Math.pow((cy - H / 2) / H, 2)
            );
            const pulse = 0.15 + 0.12 * Math.sin(t * 0.65 - centerDist * 6.5 + col * 0.3);
            const alpha = pulse * 0.38 + influence * 0.52;

            if (alpha < 0.02) continue;

            const a1 = alpha.toFixed(2);
            const a2 = (alpha * 0.75).toFixed(2);
            const a3 = (alpha * 0.85).toFixed(2);
            const a4 = (alpha * 0.4).toFixed(2);
            const a5 = (alpha * 0.75).toFixed(2);
            const a6 = (alpha * 0.35).toFixed(2);

            // TOP FACE
            const gTop = ctx.createLinearGradient(cx, cy - HALF, cx, cy);
            gTop.addColorStop(0, `rgba(100,148,255,${a1})`);
            gTop.addColorStop(1, `rgba(61,107,253,${a2})`);
            ctx.beginPath();
            ctx.moveTo(cx, cy - HALF); ctx.lineTo(cx + HALF, cy - TOP_H);
            ctx.lineTo(cx, cy);        ctx.lineTo(cx - HALF, cy - TOP_H);
            ctx.closePath();
            ctx.fillStyle = gTop;
            ctx.fill();

            // RIGHT FACE
            const gRight = ctx.createLinearGradient(cx + HALF, cy - TOP_H, cx, cy + HALF);
            gRight.addColorStop(0, `rgba(35,72,170,${a3})`);
            gRight.addColorStop(1, `rgba(12,24,80,${a4})`);
            ctx.beginPath();
            ctx.moveTo(cx, cy);              ctx.lineTo(cx + HALF, cy - TOP_H);
            ctx.lineTo(cx + HALF, cy + (HALF - TOP_H)); ctx.lineTo(cx, cy + HALF);
            ctx.closePath();
            ctx.fillStyle = gRight;
            ctx.fill();

            // LEFT FACE
            const gLeft = ctx.createLinearGradient(cx - HALF, cy - TOP_H, cx, cy + HALF);
            gLeft.addColorStop(0, `rgba(25,55,140,${a5})`);
            gLeft.addColorStop(1, `rgba(8,16,60,${a6})`);
            ctx.beginPath();
            ctx.moveTo(cx, cy);              ctx.lineTo(cx - HALF, cy - TOP_H);
            ctx.lineTo(cx - HALF, cy + (HALF - TOP_H)); ctx.lineTo(cx, cy + HALF);
            ctx.closePath();
            ctx.fillStyle = gLeft;
            ctx.fill();

            // EDGES
            ctx.beginPath();
            ctx.moveTo(cx, cy - HALF);       ctx.lineTo(cx + HALF, cy - TOP_H);
            ctx.lineTo(cx + HALF, cy + (HALF - TOP_H)); ctx.lineTo(cx, cy + HALF);
            ctx.lineTo(cx - HALF, cy + (HALF - TOP_H)); ctx.lineTo(cx - HALF, cy - TOP_H);
            ctx.closePath();
            ctx.strokeStyle = `rgba(80,130,255,${(alpha * 0.45).toFixed(2)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            if (influence > 0.25) {
              ctx.beginPath();
              ctx.moveTo(cx, cy - HALF); ctx.lineTo(cx + HALF, cy - TOP_H);
              ctx.lineTo(cx, cy);        ctx.lineTo(cx - HALF, cy - TOP_H);
              ctx.closePath();
              ctx.fillStyle = `rgba(180,210,255,${(influence * 0.22).toFixed(2)})`;
              ctx.fill();
            }
          }
        }

        const vig = ctx.createRadialGradient(W / 2, H * 0.38, H * 0.08, W / 2, H * 0.38, W * 0.8);
        vig.addColorStop(0, 'transparent');
        vig.addColorStop(1, 'rgba(10,14,26,0.85)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
      }

      t += 0.01;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ contain: 'strict' }}
    />
  );
}
