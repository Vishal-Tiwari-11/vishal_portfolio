import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="scroll-mt-16 py-24">
      <div className="container-page">
        <SectionHeader
          eyebrow="Skills"
          title="What I bring to a project"
          description="Less a list of buzzwords, more a breakdown of where I actually spend my time."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Animated
              key={category.title}
              as="li"
              variant="fade-up"
              delayMs={index * 80}
              className="card-surface flex flex-col gap-4 p-6 transition-all duration-300 hover:border-brand-400/60 hover:shadow-lg hover:shadow-brand-500/5"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
                <category.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-paper-text dark:text-ink-text">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-muted dark:text-ink-muted">
                  {category.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Animated>
          ))}
        </ul>
      </div>
    </section>
  );
}
