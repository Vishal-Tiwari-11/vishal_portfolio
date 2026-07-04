import { lazy, Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CursorSpotlight } from '@/components/ui/CursorSpotlight';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

// Below-the-fold sections are code-split so the initial bundle stays lean —
// they're requested only as the user scrolls toward them.
const TechStack = lazy(() =>
  import('@/components/sections/TechStack').then((m) => ({ default: m.TechStack })),
);
const Experience = lazy(() =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience })),
);
const Projects = lazy(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects })),
);
const Mentorship = lazy(() =>
  import('@/components/sections/Mentorship').then((m) => ({ default: m.Mentorship })),
);
const Education = lazy(() =>
  import('@/components/sections/Education').then((m) => ({ default: m.Education })),
);
const Skills = lazy(() =>
  import('@/components/sections/Skills').then((m) => ({ default: m.Skills })),
);
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
);

function SectionFallback() {
  return (
    <div className="flex h-64 items-center justify-center" role="status" aria-label="Loading section">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollProgress />
      <CursorSpotlight />
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />

        <Suspense fallback={<SectionFallback />}>
          <TechStack />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Mentorship />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
