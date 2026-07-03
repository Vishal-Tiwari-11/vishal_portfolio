import { useState } from 'react';
import { GraduationCap, ChevronDown } from 'lucide-react';
import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { education } from '@/data/education';

export function Education() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      id="education"
      aria-label="Education"
      className="scroll-mt-16 py-24"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Education"
          title="Academic background"
          description="Formal education and continuous learning — from university to specialized courses in modern web development."
        />

        <ol className="relative mt-12 flex flex-col gap-6 border-l border-paper-border pl-8 dark:border-ink-border sm:pl-10">
          {education.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Animated
                as="li"
                key={item.degree}
                variant="fade-up"
                delayMs={index * 100}
                className="relative"
              >
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2.45rem] top-3 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-200 sm:-left-[2.95rem] ${
                    isOpen
                      ? 'border-brand-500 bg-brand-500'
                      : 'border-brand-500 bg-paper-bg dark:bg-ink-bg'
                  }`}
                >
                  {!isOpen && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
                </span>

                {/* Clickable header */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="group w-full text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs font-medium uppercase tracking-wider text-brand-500 dark:text-brand-400">
                        {item.period}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-paper-text transition-colors group-hover:text-brand-500 dark:text-ink-text dark:group-hover:text-brand-400">
                        {item.degree}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-paper-muted dark:text-ink-muted">
                        <GraduationCap className="h-4 w-4 text-brand-500 dark:text-brand-400" aria-hidden="true" />
                        {item.institution}
                        {item.grade && (
                          <>
                            <span aria-hidden="true" className="text-paper-border dark:text-ink-border">·</span>
                            <span className="text-brand-500 dark:text-brand-400">Grade: {item.grade}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <ChevronDown
                      className={`mt-2 h-4 w-4 flex-shrink-0 text-paper-muted transition-transform duration-300 dark:text-ink-muted ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Collapsible body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-3">
                    <ul className="space-y-2">
                      {item.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm text-paper-muted dark:text-ink-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500"
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
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
