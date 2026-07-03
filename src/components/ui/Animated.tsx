import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type AnimationVariant = 'fade-up' | 'fade-in' | 'scale';

interface AnimatedProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delayMs?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

const hiddenStyle: Record<AnimationVariant, CSSProperties> = {
  'fade-up': { opacity: 0, transform: 'translateY(18px)' },
  'fade-in': { opacity: 0 },
  scale:     { opacity: 0, transform: 'scale(0.96)' },
};

const visibleStyle: CSSProperties = {
  opacity: 1,
  transform: 'none',
};

export function Animated({
  children,
  variant = 'fade-up',
  delayMs = 0,
  className = '',
  as = 'div',
}: AnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Already in viewport on mount → show immediately
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  const style: CSSProperties = {
    transition: `opacity 0.7s ease-out ${delayMs}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
    ...(isVisible ? visibleStyle : hiddenStyle[variant]),
  };

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
