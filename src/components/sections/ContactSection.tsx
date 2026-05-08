import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BriefcaseBusiness, CodeXml, Palette, Mail, Copy, Check, Download } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

const iconMap: Record<string, LucideIcon> = {
  Github: CodeXml,
  Linkedin: BriefcaseBusiness,
  Palette,
  Mail,
};

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { identity, socialLinks, ui } = settings;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-surface/50" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FadeIn direction="up">
          <div className="mb-12">
            <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
              {ui.contact}
            </p>
            <h2 className="mb-4 text-3xl font-thin tracking-tight md:text-4xl">
              {ui.contact}
            </h2>
            <p className="mx-auto max-w-md font-light text-white/55">
              {identity.tagline}
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={150}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-lg font-light text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-dark hover:shadow-accent/40"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? ui.copied : ui.copyEmail}
            </button>
            <a
              href={identity.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-8 py-4 text-lg font-light text-white/70 transition-all duration-300 hover:border-accent/50 hover:text-white"
            >
              <Download size={18} />
              {ui.downloadCv}
            </a>
          </div>
          <p className="mt-4 text-sm font-light text-white/30">{identity.email}</p>
        </FadeIn>

        <FadeIn direction="up" delay={250}>
          <div className="mt-10 flex items-center justify-center gap-5">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={link.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent hover:scale-110"
                >
                  {Icon && <Icon size={20} />}
                </a>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
