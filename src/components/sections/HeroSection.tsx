import { ArrowDown, Download } from 'lucide-react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { FadeIn } from '../ui/FadeIn';
import { AnimatedRoles } from '../ui/AnimatedRoles';
import { MagneticButton } from '../ui/MagneticButton';
import { identity } from '../../data/site';

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(228,76,101,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(228,76,101,0.05)_0%,_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-20 text-center sm:pt-0">
        <FadeIn direction="down" delay={0} threshold={0}>
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-accent to-pink-400 opacity-40 blur-xl" />
              <img
                src={identity.avatar}
                alt={identity.name}
                className="relative h-72 w-auto max-w-[200px] rounded-3xl border-2 border-white/10 object-contain shadow-2xl"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={150} threshold={0}>
          <h1 className="mb-8 font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            {identity.name.split(' ')[0]}{' '}
            <span className="text-gradient">{identity.name.split(' ').slice(1).join(' ')}</span>
          </h1>
        </FadeIn>

        <div className="mb-8">
          <AnimatedRoles />
        </div>

        <FadeIn direction="up" delay={450} threshold={0}>
          <p className="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-white/40">
            {identity.tagline}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={550} threshold={0}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton>
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-light text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-dark hover:shadow-accent/40"
              >
                View Projects
              </button>
            </MagneticButton>
            <MagneticButton>
              <a
                href={identity.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-8 py-3 font-light text-white/70 transition-all duration-300 hover:border-accent/50 hover:text-white"
              >
                <Download size={16} />
                Download CV
              </a>
            </MagneticButton>
          </div>
        </FadeIn>
      </div>

      <button
        onClick={() => scrollTo('projects')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/30 transition-colors hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
}
