import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Small mono-font pill used for tech tags throughout the site. */
export function Badge({ children, className = '' }: BadgeProps) {
  return <span className={`tag-chip ${className}`.trim()}>{children}</span>;
}
