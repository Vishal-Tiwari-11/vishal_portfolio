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
      <h2 className="text-3xl sm:text-4xl font-semibold text-paper-text dark:text-ink-text">
        {title}
      </h2>
      {description && (
        <p className="text-base text-paper-muted dark:text-ink-muted leading-relaxed">
          {description}
        </p>
      )}
    </Animated>
  );
}
