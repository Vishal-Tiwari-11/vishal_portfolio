import { Animated } from '@/components/ui/Animated';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

/**
 * Consistent heading pattern used at the top of every page section:
 * a small mono-font eyebrow label, a display-font title, and an
 * optional supporting description.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <Animated variant="fade-up" className={`flex flex-col gap-3 ${alignment} max-w-2xl`}>
      <span className="eyebrow flex items-center gap-2">
        <span aria-hidden="true" className="h-px w-6 bg-brand-500/70" />
        {eyebrow}
      </span>
      <h2 className="text-2xl font-bold break-words sm:text-3xl md:text-4xl bg-gradient-to-br from-paper-text to-paper-muted bg-clip-text text-transparent dark:from-ink-text dark:to-ink-muted">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-paper-muted break-words leading-relaxed dark:text-ink-muted sm:text-base">
          {description}
        </p>
      )}
    </Animated>
  );
}
