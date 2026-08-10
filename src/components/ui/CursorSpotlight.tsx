import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!ring || !dot || !glow) return;

    let rafId: number;
    let mx = -999;
    let my = -999;
    let rx = -999;
    let ry = -999;
    let isVisible = false;
    let scale = 1;

    // Responsive LERP speed: 0.32 for ultra-fast, snappy follow with butter smoothness
    const LERP = 0.32;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!isVisible) {
        rx = mx;
        ry = my;
        isVisible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
        glow.style.opacity = "1";
      }
    };

    const onLeave = () => {
      isVisible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    };

    const onEnter = () => {
      if (isVisible) return;
      isVisible = true;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      glow.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isLink = !!el.closest("a[href]");
      const isBtn = !!el.closest('button, [role="button"]');
      const isInput = !!el.closest("input, textarea, select");
      const isCard = !!el.closest(".card-surface, article, code, pre");

      if (isBtn) {
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "rgba(61,107,253,0.9)";
        ring.style.background = "rgba(61,107,253,0.12)";
        ring.style.boxShadow = "0 0 20px rgba(61,107,253,0.25)";
      } else if (isLink) {
        ring.style.width = "44px";
        ring.style.height = "44px";
        ring.style.borderColor = "rgba(16,185,129,0.85)";
        ring.style.background = "rgba(16,185,129,0.08)";
        ring.style.boxShadow = "0 0 16px rgba(16,185,129,0.2)";
      } else if (isInput) {
        ring.style.width = "24px";
        ring.style.height = "24px";
        ring.style.borderColor = "rgba(92,140,255,0.7)";
        ring.style.background = "transparent";
        ring.style.boxShadow = "none";
      } else if (isCard) {
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "rgba(61,107,253,0.6)";
        ring.style.background = "rgba(61,107,253,0.04)";
        ring.style.boxShadow = "0 0 12px rgba(61,107,253,0.15)";
      } else {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "rgba(61,107,253,0.55)";
        ring.style.background = "transparent";
        ring.style.boxShadow = "none";
      }
    };

    const onDown = () => {
      scale = 0.75;
    };
    const onUp = () => {
      scale = 1;
    };

    // 120+ FPS Hardware-accelerated GPU animation loop
    const tick = () => {
      if (isVisible && mx !== -999) {
        rx += (mx - rx) * LERP;
        ry += (my - ry) * LERP;

        // GPU translate3d — zero layout recalculations
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
        glow.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Ambient background glow following cursor */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-96 w-96 rounded-full opacity-0 transition-opacity duration-500 lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(61,107,253,0.07) 0%, rgba(61,107,253,0) 70%)",
          willChange: "transform",
        }}
      />

      {/* Outer follower ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full border-2 opacity-0 lg:block"
        style={{
          width: "32px",
          height: "32px",
          borderColor: "rgba(61,107,253,0.55)",
          background: "transparent",
          transition:
            "width 0.18s cubic-bezier(0.34,1.56,0.64,1), height 0.18s cubic-bezier(0.34,1.56,0.64,1), border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      />

      {/* Inner precise dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-brand-500 opacity-0 shadow-[0_0_8px_rgba(61,107,253,0.8)] transition-opacity duration-200 lg:block"
        style={{
          willChange: "transform",
        }}
      />
    </>
  );
}
