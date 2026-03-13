import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Palette, Mail, Send, Download } from 'lucide-react';
import { socialLinks } from '../../data/social';
import { FadeIn } from '../ui/FadeIn';
import { identity } from '../../data/site';

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Palette,
  Mail,
};

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-surface/50" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FadeIn direction="up">
          <div className="mb-12">
            <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
              Contact
            </p>
            <h2 className="mb-4 text-3xl font-thin tracking-tight md:text-4xl">
              Let's Connect
            </h2>
            <p className="mx-auto max-w-md font-light text-white/55">
              Interested in collaborating or just want to say hi? Feel free to reach out.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={150}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-lg font-light text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-dark hover:shadow-accent/40 hover:gap-3"
            >
              <Send size={18} />
              Send a Message
            </a>
            <a
              href={identity.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-8 py-4 text-lg font-light text-white/70 transition-all duration-300 hover:border-accent/50 hover:text-white"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>
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
