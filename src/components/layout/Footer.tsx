import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Palette, Mail } from 'lucide-react';
import { socialLinks } from '../../data/social';
import { identity } from '../../data/site';

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Palette,
  Mail,
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent hover:scale-110"
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
          </div>
          <p className="text-sm font-light text-white/30">
            &copy; {identity.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
