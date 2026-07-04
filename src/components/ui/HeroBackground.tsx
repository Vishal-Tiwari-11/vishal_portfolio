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

    // Raw and smoothed mouse positions
    const mouse    = { x: -9999, y: -9999 };
    const smoothed = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Init smoothed to center so there's no jump on first move
      if (smoothed.x === -9999) {
        smoothed.x = canvas.width  / 2;
        smoothed.y = canvas.height / 2;
        mouse.x    = smoothed.x;
        mouse.y    = smoothed.y;
      }
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const isDark = document.documentElement.classList.contains('dark');

      // Smooth lerp — 0.06 = very fluid, not snappy
      smoothed.x += (mouse.x - smoothed.x) * 0.06;
      smoothed.y += (mouse.y - smoothed.y) * 0.06;

      ctx.clearRect(0, 0, W, H);

      const SIZE  = 54;
      const COLS  = Math.ceil(W / SIZE) + 3;
      const ROWS  = Math.ceil(H / (SIZE * 0.58)) + 3;
      const HALF  = SIZE * 0.42;
      const TOP_H = HALF * 0.44; // 3D top-face height

      for (let row = -1; row < ROWS; row++) {
        for (let col = -1; col < COLS; col++) {
          const stagger = (row % 2 === 0) ? 0 : SIZE / 2;
          const baseCx  = col * SIZE + stagger - SIZE / 2;
          const baseCy  = row * SIZE * 0.58;

          // Each diamond slightly drifts toward the cursor
          const dxRaw = smoothed.x - baseCx;
          const dyRaw = smoothed.y - baseCy;
          const dist  = Math.sqrt(dxRaw * dxRaw + dyRaw * dyRaw);
          const influence = Math.max(0, 1 - dist / 260);

          // Max drift: 7px toward cursor, smooth with t for ambient
          const drift = influence * 7;
          const cx = baseCx + (dist > 0 ? (dxRaw / dist) * drift : 0);
          const cy = baseCy + (dist > 0 ? (dyRaw / dist) * drift : 0);

          // Ambient glow pulse
          const centerDist = Math.sqrt(
            Math.pow((cx - W / 2) / W, 2) + Math.pow((cy - H / 2) / H, 2)
          );
          const pulse = 0.15 + 0.12 * Math.sin(t * 0.65 - centerDist * 6.5 + col * 0.3);

          // Combine ambient + cursor glow
          const alpha = isDark
            ? pulse * 0.38 + influence * 0.52
            : pulse * 0.16 + influence * 0.24;

          if (alpha < 0.02) continue; // skip invisible cells

          // ── TOP FACE (lit) ──
          const gTop = ctx.createLinearGradient(cx, cy - HALF, cx, cy);
          gTop.addColorStop(0, isDark
            ? `rgba(100,148,255,${alpha})`
            : `rgba(110,155,255,${alpha * 0.9})`);
          gTop.addColorStop(1, isDark
            ? `rgba(61,107,253,${alpha * 0.75})`
            : `rgba(61,107,253,${alpha * 0.65})`);

          ctx.beginPath();
          ctx.moveTo(cx,        cy - HALF);
          ctx.lineTo(cx + HALF, cy - TOP_H);
          ctx.lineTo(cx,        cy);
          ctx.lineTo(cx - HALF, cy - TOP_H);
          ctx.closePath();
          ctx.fillStyle = gTop;
          ctx.fill();

          // ── RIGHT FACE (mid-dark) ──
          const gRight = ctx.createLinearGradient(cx + HALF, cy - TOP_H, cx, cy + HALF);
          gRight.addColorStop(0, isDark
            ? `rgba(35,72,170,${alpha * 0.85})`
            : `rgba(50,90,190,${alpha * 0.55})`);
          gRight.addColorStop(1, isDark
            ? `rgba(12,24,80,${alpha * 0.4})`
            : `rgba(20,50,140,${alpha * 0.22})`);

          ctx.beginPath();
          ctx.moveTo(cx,          cy);
          ctx.lineTo(cx + HALF,   cy - TOP_H);
          ctx.lineTo(cx + HALF,   cy + (HALF - TOP_H));
          ctx.lineTo(cx,          cy + HALF);
          ctx.closePath();
          ctx.fillStyle = gRight;
          ctx.fill();

          // ── LEFT FACE (darkest) ──
          const gLeft = ctx.createLinearGradient(cx - HALF, cy - TOP_H, cx, cy + HALF);
          gLeft.addColorStop(0, isDark
            ? `rgba(25,55,140,${alpha * 0.75})`
            : `rgba(40,75,170,${alpha * 0.45})`);
          gLeft.addColorStop(1, isDark
            ? `rgba(8,16,60,${alpha * 0.35})`
            : `rgba(15,40,120,${alpha * 0.18})`);

          ctx.beginPath();
          ctx.moveTo(cx,          cy);
          ctx.lineTo(cx - HALF,   cy - TOP_H);
          ctx.lineTo(cx - HALF,   cy + (HALF - TOP_H));
          ctx.lineTo(cx,          cy + HALF);
          ctx.closePath();
          ctx.fillStyle = gLeft;
          ctx.fill();

          // ── EDGE LINES ──
          ctx.beginPath();
          ctx.moveTo(cx,        cy - HALF);
          ctx.lineTo(cx + HALF, cy - TOP_H);
          ctx.lineTo(cx + HALF, cy + (HALF - TOP_H));
          ctx.lineTo(cx,        cy + HALF);
          ctx.lineTo(cx - HALF, cy + (HALF - TOP_H));
          ctx.lineTo(cx - HALF, cy - TOP_H);
          ctx.closePath();
          ctx.strokeStyle = isDark
            ? `rgba(80,130,255,${alpha * 0.45})`
            : `rgba(61,107,253,${alpha * 0.35})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // ── CURSOR HIGHLIGHT (specular dot on top face) ──
          if (influence > 0.25) {
            ctx.beginPath();
            ctx.moveTo(cx,        cy - HALF);
            ctx.lineTo(cx + HALF, cy - TOP_H);
            ctx.lineTo(cx,        cy);
            ctx.lineTo(cx - HALF, cy - TOP_H);
            ctx.closePath();
            ctx.fillStyle = `rgba(180,210,255,${influence * 0.22})`;
            ctx.fill();
          }
        }
      }

      // ── RADIAL VIGNETTE — keeps content readable ──
      const vig = ctx.createRadialGradient(W / 2, H * 0.38, H * 0.08, W / 2, H * 0.38, W * 0.8);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, isDark
        ? 'rgba(10,14,26,0.85)'
        : 'rgba(246,248,252,0.82)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      t += 0.01;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
