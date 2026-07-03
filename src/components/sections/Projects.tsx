import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/data/projects';

export function Projects() {
  return (
    <section id="projects" aria-label="Featured projects" className="scroll-mt-16 py-24">
      <div className="container-page">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Things I've built that are live"
          description="Real production projects — university portals, international conference sites, and payment systems where reliability isn't optional."
        />

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Animated
              key={project.title}
              as="li"
              variant="fade-up"
              delayMs={(index % 3) * 80}
              className="flex"
            >
              <ProjectCard project={project} index={index} />
            </Animated>
          ))}
        </ul>
      </div>
    </section>
  );
}
