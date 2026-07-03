import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 3, suffix: '+', label: 'Years of experience' },
  { value: 6, suffix: '+', label: 'Production projects' },
  { value: 2, suffix: '', label: 'Payment gateways integrated' },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div>
      <dd
        ref={ref as React.RefObject<HTMLElement>}
        className="font-display text-2xl font-semibold text-brand-500 dark:text-brand-400 sm:text-3xl"
      >
        {count}{suffix}
      </dd>
      <dd className="mt-1 text-xs text-paper-muted dark:text-ink-muted sm:text-sm">
        {label}
      </dd>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-label="About me" className="scroll-mt-16 py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeader
          eyebrow="About Me"
          title="I build platforms where downtime isn't an option"
          description="Web & ERP Developer at JECRC University, Jaipur — building and maintaining university websites, conference platforms, and ERP systems."
        />

        <div className="flex flex-col gap-8">
          <Animated variant="fade-up" delayMs={100} className="space-y-4 text-base leading-relaxed text-paper-muted dark:text-ink-muted">
            <p>
              I&apos;m Vishal, a full-stack developer based in Jaipur, Rajasthan. I currently
              work at JECRC University designing and maintaining web applications for university
              initiatives and international conferences, while supporting the university&apos;s
              ERP system for academic and administrative workflows.
            </p>
            <p>
              My work lives at the intersection of reliability and real-world constraints —
              building secure payment flows with Razorpay and Cashfree, OTP authentication,
              webhook verification, and duplicate-prevention logic for systems that handle
              live registrations and payments.
            </p>
            <p>
              I also mentor student interns at JECRC&apos;s AI internship program on projects
              like JU Bot (an AI university assistant), an AI-Powered HR Portal for automated
              resume screening, and various university automation initiatives.
            </p>
          </Animated>

          <Animated variant="fade-up" delayMs={180}>
            <dl className="grid grid-cols-3 gap-4 border-t border-paper-border pt-6 dark:border-ink-border">
              {stats.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </dl>
          </Animated>
        </div>
      </div>
    </section>
  );
}
