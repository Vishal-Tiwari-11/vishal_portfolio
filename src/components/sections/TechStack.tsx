import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { techStack } from '@/data/techStack';

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-label="Technology stack"
      className="scroll-mt-16 border-y border-paper-border bg-paper-surface py-24 dark:border-ink-border dark:bg-ink-surface"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Tools I reach for, daily"
          description="A focused toolkit covering the full path from interface to database — chosen for reliability over novelty."
          align="center"
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {techStack.map((tech, index) => (
            <Animated
              key={tech.name}
              as="li"
              variant="fade-up"
              delayMs={index * 50}
              className="card-surface group flex flex-col items-center gap-3 px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-lg hover:shadow-brand-500/5"
            >
              <tech.icon
                aria-hidden="true"
                className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                style={{ color: tech.color }}
              />
              <span className="text-sm font-medium text-paper-text dark:text-ink-text">
                {tech.name}
              </span>
            </Animated>
          ))}
        </ul>
      </div>
    </section>
  );
}
