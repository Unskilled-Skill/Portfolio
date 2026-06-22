import { useState } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { identity, socialLinks, ui } = settings;

  const externals = socialLinks.filter((l) => !l.url.startsWith('mailto:'));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-white/[0.08] bg-rf-bg/[0.42] px-[clamp(20px,5vw,72px)] py-[clamp(80px,14vh,160px)]"
    >
      <div className="relative z-[1] mx-auto max-w-shell">
        <div data-reveal>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-rf-accent">(04) {ui.contact}</span>
          <h2
            data-kinetic="settle"
            className="mt-[18px] max-w-[16ch] font-display text-[clamp(42px,7vw,104px)] font-extrabold leading-[0.94] tracking-[-0.035em]"
          >
            {ui.contactHeadline}
            <span className="text-rf-accent">.</span>
          </h2>
        </div>

        <div data-reveal className="mt-[clamp(40px,6vh,72px)] flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-rf-ink/[0.34]">{ui.emailLabel}</div>
            <a
              href={`mailto:${identity.email}`}
              className="border-b-2 border-rf-accent/50 pb-1.5 font-display text-[clamp(22px,3vw,40px)] font-semibold tracking-[-0.02em] text-rf-ink transition-colors hover:border-rf-accent"
            >
              {identity.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2.5 bg-rf-accent px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-rf-accentHover"
            >
              {copied ? ui.copied : ui.copyEmail}
            </button>
            <a
              href={identity.cvPath}
              download
              className="inline-flex items-center gap-2.5 border border-white/[0.16] px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.08em] text-rf-ink/[0.85] transition-colors hover:border-rf-accent hover:text-white"
            >
              {ui.downloadCv} ↓
            </a>
          </div>
        </div>

        <div data-reveal className="mt-[clamp(48px,7vh,80px)] flex flex-wrap gap-[clamp(20px,4vw,56px)] border-t border-white/[0.08] pt-8">
          {externals.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] uppercase tracking-[0.08em] text-rf-ink/[0.6] transition-colors hover:text-rf-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
