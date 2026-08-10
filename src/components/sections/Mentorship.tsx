import { useState } from 'react';
import { GraduationCap, ChevronDown } from 'lucide-react';
import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mentorshipProjects } from '@/data/mentorship';

function MentorshipCard({ project, index }: { project: (typeof mentorshipProjects)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-paper-border bg-paper-elevated transition-all duration-300 hover:shadow-lg dark:border-ink-border dark:bg-ink-elevated">
      {/* Top accent line */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(to right, ${project.accentColor}, transparent 70%)` }}
      />

      <div className="flex flex-1 flex-col gap-4 p-5 min-w-0">
        {/* Row: number + category label */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="font-mono text-2xl font-black leading-none tabular-nums flex-shrink-0"
            style={{ color: project.accentColor, opacity: 0.2 }}
            aria-hidden="true"
          >
            {num}
          </span>
          <span
            className="truncate rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest"
            style={{
              borderColor: `${project.accentColor}40`,
              color: project.accentColor,
              background: `${project.accentColor}12`,
            }}
          >
            Mentorship
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-paper-text break-words transition-colors duration-200 group-hover:text-brand-500 dark:text-ink-text dark:group-hover:text-brand-400">
          {project.title}
        </h3>

        {/* Description — flex-1 pushes footer down */}
        <p className="flex-1 text-sm leading-relaxed text-paper-muted break-words dark:text-ink-muted">
          {project.description}
        </p>

        {/* Expandable highlights */}
        <div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="flex items-center gap-1.5 font-mono text-xs font-medium transition-colors duration-200"
            style={{ color: project.accentColor }}
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
            {expanded ? 'Hide details' : 'Key outcomes'}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expanded ? 'max-h-64 opacity-100 pt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="space-y-2">
              {project.highlights.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-paper-muted dark:text-ink-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: project.accentColor }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags footer */}
        <div>
          <div
            aria-hidden="true"
            className="mb-3 h-px"
            style={{ background: `linear-gradient(to right, ${project.accentColor}25, transparent)` }}
          />
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 font-mono text-[11px] text-paper-muted dark:text-ink-muted"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-paper-border dark:bg-ink-border"
                  />
                )}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Mentorship() {
  return (
    <section
      id="mentorship"
      aria-label="Mentorship projects"
      className="scroll-mt-16 border-y border-paper-border bg-paper-elevated py-24 dark:border-ink-border dark:bg-ink-surface"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Mentorship"
          title="Projects I've guided at JECRC"
          description="At JECRC University's AI internship program, I mentor student interns through real-world AI and automation projects — from idea to deployment."
        />

        {/* Context banner */}
        <Animated variant="fade-up" delayMs={60}>
          <div className="mt-10 flex items-start gap-4 rounded-xl border border-brand-500/20 bg-brand-500/5 px-6 py-5 dark:border-brand-400/20 dark:bg-brand-400/5">
            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-paper-text dark:text-ink-text">
                AI Internship Program · JECRC University, Jaipur
              </p>
              <p className="mt-1 text-sm leading-relaxed text-paper-muted dark:text-ink-muted">
                I guide student interns through the full software lifecycle — scoping, architecture,
                implementation, and deployment — on AI and automation projects that solve real
                university problems.
              </p>
            </div>
          </div>
        </Animated>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mentorshipProjects.map((project, index) => (
            <Animated
              key={project.title}
              as="li"
              variant="fade-up"
              delayMs={(index % 3) * 80}
              className="flex"
            >
              <MentorshipCard project={project} index={index} />
            </Animated>
          ))}
        </ul>
      </div>
    </section>
  );
}
