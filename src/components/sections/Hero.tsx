import { ArrowDown, ArrowRight, Linkedin, Github } from 'lucide-react';
import { Animated } from '@/components/ui/Animated';
import { socialLinks } from '@/data/socials';
import { HeroBackground } from '@/components/ui/HeroBackground';

const githubLink = socialLinks.find((link) => link.label === 'GitHub');
const linkedinLink = socialLinks.find((link) => link.label === 'LinkedIn');

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Animated 3D diamond background */}
      <HeroBackground />

      {/* Top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-glow-radial opacity-40 dark:opacity-100"
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        {/* Copy column */}
        <div className="flex flex-col gap-6">
          <Animated variant="fade-up">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-paper-border bg-paper-surface px-3 py-1 dark:border-ink-border dark:bg-ink-surface">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </span>
          </Animated>

          <Animated variant="fade-up" delayMs={80}>
            <h1 className="text-4xl font-semibold leading-[1.1] text-paper-text dark:text-ink-text sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{' '}
              <span className="text-brand-500 dark:text-brand-400">Vishal Tiwari</span>
              <span className="block">Web &amp; ERP Developer</span>
            </h1>
          </Animated>

          <Animated variant="fade-up" delayMs={160}>
            <p className="max-w-xl text-base leading-relaxed text-paper-muted dark:text-ink-muted sm:text-lg">
              I build reliable, payment-integrated web platforms — from university
              convocations to international conferences — where downtime isn&apos;t
              an option.
            </p>
          </Animated>

          <Animated variant="fade-up" delayMs={240} className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </Animated>

          <Animated variant="fade-up" delayMs={300} className="flex items-center gap-4 pt-2">
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Vishal Tiwari on GitHub"
                className="text-paper-muted transition-colors hover:text-brand-600 dark:text-ink-muted dark:hover:text-brand-400"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Vishal Tiwari on LinkedIn"
                className="text-paper-muted transition-colors hover:text-brand-600 dark:text-ink-muted dark:hover:text-brand-400"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </Animated>
        </div>

        {/* Mock code editor */}
        <Animated variant="scale" delayMs={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float rounded-xl border border-ink-border bg-ink-surface shadow-2xl shadow-brand-900/20">
            <div className="flex items-center gap-1.5 border-b border-ink-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              <span className="ml-3 font-mono text-xs text-ink-muted">developer.ts</span>
            </div>

            <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
              <code>
                <span className="text-ink-muted">{'// vishal-tiwari/developer.ts'}</span>
                {'\n\n'}
                <span className="text-[#C586C0]">const</span>{' '}
                <span className="text-[#9CDCFE]">developer</span>{' '}
                <span className="text-ink-text">=</span> {'{'}
                {'\n'}
                {'  '}
                <span className="text-[#9CDCFE]">name</span>
                <span className="text-ink-text">:</span>{' '}
                <span className="text-[#CE9178]">&apos;Vishal Tiwari&apos;</span>,
                {'\n'}
                {'  '}
                <span className="text-[#9CDCFE]">role</span>
                <span className="text-ink-text">:</span>{' '}
                <span className="text-[#CE9178]">&apos;Web &amp; ERP Developer&apos;</span>,
                {'\n'}
                {'  '}
                <span className="text-[#9CDCFE]">location</span>
                <span className="text-ink-text">:</span>{' '}
                <span className="text-[#CE9178]">&apos;Jaipur, Rajasthan, India&apos;</span>,
                {'\n'}
                {'  '}
                <span className="text-[#9CDCFE]">stack</span>
                <span className="text-ink-text">:</span> [
                <span className="text-[#CE9178]">&apos;React&apos;</span>,{' '}
                <span className="text-[#CE9178]">&apos;Next.js&apos;</span>,{' '}
                <span className="text-[#CE9178]">&apos;PHP&apos;</span>,{' '}
                <span className="text-[#CE9178]">&apos;MySQL&apos;</span>],
                {'\n'}
                {'  '}
                <span className="text-[#9CDCFE]">focus</span>
                <span className="text-ink-text">:</span> [
                {'\n'}
                {'    '}
                <span className="text-[#CE9178]">&apos;payment integrations&apos;</span>,
                {'\n'}
                {'    '}
                <span className="text-[#CE9178]">&apos;university platforms&apos;</span>,
                {'\n'}
                {'    '}
                <span className="text-[#CE9178]">&apos;ERP systems&apos;</span>,
                {'\n'}
                {'    '}
                <span className="text-[#CE9178]">&apos;conference websites&apos;</span>,
                {'\n'}
                {'  ]'},
                {'\n'}
                {'  '}
                <span className="text-[#9CDCFE]">availableForWork</span>
                <span className="text-ink-text">:</span>{' '}
                <span className="text-[#569CD6]">true</span>,
                {'\n'}
                {'}'}
                <span className="text-ink-text">;</span>
                <span className="ml-1 inline-block h-4 w-2 animate-blink bg-brand-400 align-middle" />
              </code>
            </pre>
          </div>

          {/* Floating tech badges */}
          {/* <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 hidden rotate-3 rounded-lg border border-ink-border bg-ink-elevated px-3 py-1.5 font-mono text-xs text-brand-400 shadow-lg sm:block"
          >
            Razorpay · Cashfree
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 hidden -rotate-2 rounded-lg border border-ink-border bg-ink-elevated px-3 py-1.5 font-mono text-xs text-brand-400 shadow-lg sm:block"
          >
            PHP · MySQL
          </div> */}
        </Animated>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-paper-muted dark:text-ink-muted md:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
