import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Send, CheckCircle } from 'lucide-react';
import { Animated } from '@/components/ui/Animated';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { socialLinks } from '@/data/socials';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});

  function validate() {
    const e: Partial<typeof fields> = {};
    if (!fields.name.trim()) e.name = 'Name is required.';
    if (!fields.email.trim()) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = 'Enter a valid email address.';
    }
    if (!fields.message.trim()) e.message = 'Message is required.';
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof typeof fields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormState('submitting');

    try {
      const res = await fetch('https://formspree.io/f/xzdlkwge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          message: fields.message,
        }),
      });

      if (res.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="scroll-mt-16 border-t border-paper-border bg-paper-surface py-24 dark:border-ink-border dark:bg-ink-surface"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project, a role, or just a technical question? Fill in the form or reach out directly — I usually reply within a day."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — social links */}
          <Animated variant="fade-up" delayMs={60} className="flex flex-col gap-6">
            <p className="text-sm leading-relaxed text-paper-muted dark:text-ink-muted">
              Based in Jaipur, Rajasthan, India · Open to remote work worldwide.
              You can also reach me directly on any of the platforms below.
            </p>

            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card-surface group flex items-center justify-between gap-3 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-medium text-paper-text dark:text-ink-text">
                    <link.icon className="h-4 w-4 text-brand-500 dark:text-brand-400" aria-hidden="true" />
                    {link.label}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-paper-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-ink-muted"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </Animated>

          {/* Right — contact form */}
          <Animated variant="fade-up" delayMs={120}>
            {formState === 'success' ? (
              <div className="card-surface flex flex-col items-center gap-4 px-8 py-12 text-center">
                <CheckCircle className="h-10 w-10 text-emerald-500" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-paper-text dark:text-ink-text">
                  Message sent!
                </h3>
                <p className="text-sm text-paper-muted dark:text-ink-muted">
                  Thanks for reaching out. I&apos;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => { setFormState('idle'); setFields({ name: '', email: '', message: '' }); }}
                  className="btn-secondary mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="card-surface flex flex-col gap-5 p-6"
                aria-label="Contact form"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-medium text-paper-text dark:text-ink-text">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    className={`rounded-lg border bg-paper-elevated px-4 py-2.5 text-sm text-paper-text placeholder:text-paper-muted/60 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:bg-ink-elevated dark:text-ink-text dark:placeholder:text-ink-muted/60 ${
                      errors.name
                        ? 'border-red-400 dark:border-red-500'
                        : 'border-paper-border dark:border-ink-border'
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-xs text-red-500 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-medium text-paper-text dark:text-ink-text">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    className={`rounded-lg border bg-paper-elevated px-4 py-2.5 text-sm text-paper-text placeholder:text-paper-muted/60 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:bg-ink-elevated dark:text-ink-text dark:placeholder:text-ink-muted/60 ${
                      errors.email
                        ? 'border-red-400 dark:border-red-500'
                        : 'border-paper-border dark:border-ink-border'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-xs text-red-500 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium text-paper-text dark:text-ink-text">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity…"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                    className={`resize-none rounded-lg border bg-paper-elevated px-4 py-2.5 text-sm text-paper-text placeholder:text-paper-muted/60 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:bg-ink-elevated dark:text-ink-text dark:placeholder:text-ink-muted/60 ${
                      errors.message
                        ? 'border-red-400 dark:border-red-500'
                        : 'border-paper-border dark:border-ink-border'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-xs text-red-500 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formState === 'submitting' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send message
                    </>
                  )}
                </button>

                {formState === 'error' && (
                  <p role="alert" className="text-center text-xs text-red-500 dark:text-red-400">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            )}
          </Animated>
        </div>
      </div>
    </section>
  );
}
