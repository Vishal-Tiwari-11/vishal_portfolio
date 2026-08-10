import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { experience } from '@/data/experience';

export function Experience() {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="scroll-mt-16 border-y border-paper-border bg-paper-elevated py-24 dark:border-ink-border dark:bg-ink-surface"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've worked"
          description="From co-founding a programming institute to shipping payment-integrated university platforms — four roles, one consistent focus on reliable software."
        />

        <ol className="relative mt-12 flex flex-col gap-6 border-l border-paper-border pl-6 dark:border-ink-border sm:pl-10">
          {experience.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Animated as="li" key={`${item.company}-${index}`} variant="fade-up" delayMs={index * 50} className="relative min-w-0">
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[1.95rem] top-3 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-200 sm:-left-[2.95rem] ${
                    isOpen
                      ? 'border-brand-500 bg-brand-500'
                      : 'border-brand-500 bg-paper-surface dark:bg-ink-surface'
                  }`}
                >
                  {!isOpen && <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-sm shadow-brand-500/50" />}
                </span>

                <div className={`rounded-xl transition-colors duration-300 ${isOpen ? 'bg-paper-elevated/50 p-4 -ml-4 dark:bg-ink-elevated/20' : 'p-4 -ml-4 hover:bg-paper-elevated/30 dark:hover:bg-ink-elevated/10'}`}>
                  {/* Clickable header */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="group w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3 min-w-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-medium uppercase tracking-wider text-brand-500 dark:text-brand-400">
                        {item.period}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-paper-text break-words transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-brand-500 group-hover:to-brand-400 group-hover:bg-clip-text group-hover:text-transparent dark:text-ink-text sm:text-xl">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-paper-muted break-words dark:text-ink-muted">
                        {item.company}
                      </p>
                    </div>
                    <ChevronDown
                      className={`mt-2 h-4 w-4 flex-shrink-0 text-brand-500 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] dark:text-brand-400 ${
                        isOpen ? '-rotate-180 scale-110' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Collapsible body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-3">
                    <p className="max-w-2xl text-sm leading-relaxed text-paper-muted dark:text-ink-muted">
                      {item.summary}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {item.achievements.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-paper-muted dark:text-ink-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              </Animated>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
