import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { ProjectItem } from '@/types';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-paper-border bg-paper-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-ink-border dark:bg-ink-surface dark:hover:shadow-none"
    >
      {/* Top accent line */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(to right, ${project.accentColor}, transparent 70%)` }}
      />

      <div className="flex flex-1 flex-col gap-4 p-5 min-w-0">
        {/* Row: number + category + link */}
        <div className="flex items-center justify-between gap-2 min-w-0">
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
              {project.category}
            </span>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${project.title} live`}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-paper-border text-paper-muted transition-all duration-200 hover:border-brand-400 hover:text-brand-500 dark:border-ink-border dark:text-ink-muted dark:hover:border-brand-400 dark:hover:text-brand-400"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-paper-text break-words transition-colors duration-200 group-hover:text-brand-500 dark:text-ink-text dark:group-hover:text-brand-400">
          {project.title}
        </h3>

        {/* Description — flex-1 so it fills available space and pushes footer down */}
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
            {expanded ? 'Hide details' : 'What I built'}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expanded ? 'max-h-72 opacity-100 pt-3' : 'max-h-0 opacity-0'
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

        {/* Stack footer */}
        <div>
          <div
            aria-hidden="true"
            className="mb-3 h-px"
            style={{ background: `linear-gradient(to right, ${project.accentColor}25, transparent)` }}
          />
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.stack.map((tech, i) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 font-mono text-[11px] text-paper-muted dark:text-ink-muted"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-paper-border dark:bg-ink-border"
                  />
                )}
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
