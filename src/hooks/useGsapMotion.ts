import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * useGsapMotion — scroll-reveal + kinetic-headline motion, ported from the
 * design reference. Mounted once in Layout and re-run on every route change.
 *
 * Safety contract (from the prototype): content is NEVER authored at opacity:0
 * in markup. This hook hides `[data-reveal]` imperatively and always restores
 * it — via ScrollTrigger, and via a hard 3.2s safety net — so a missed trigger
 * can only ever mean "visible, un-animated", never a blank page.
 */
function runCount(el: HTMLElement) {
  if (el.dataset.counting) return;
  el.dataset.counting = '1';
  el.dataset.done = '1';
  const target = parseFloat(el.getAttribute('data-count') || '0') || 0;
  const pad = el.getAttribute('data-pad');
  const duration = 1300;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    let v = String(Math.round(eased * target));
    if (pad) v = v.padStart(2, '0');
    el.textContent = v;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function useGsapMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    let killed = false;
    const splits: SplitText[] = [];
    let mm: ReturnType<typeof gsap.matchMedia> | null = null;
    let safety = 0;

    // Let the new route's DOM commit before measuring.
    const startT = window.setTimeout(() => {
      if (killed) return;
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      const counters = gsap.utils.toArray<HTMLElement>('[data-count]');

      counters.forEach((el) =>
        ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => runCount(el) }),
      );

      mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: '(min-width: 900px)',
          isMobile: '(max-width: 899px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const c = ctx.conditions as { isDesktop: boolean; isMobile: boolean; reduce: boolean };
          const dist = c.reduce ? 0 : c.isMobile ? 16 : 30;
          const dur = c.reduce ? 0.25 : c.isMobile ? 0.6 : 0.85;
          const stagger = c.isMobile ? 0.06 : 0.1;

          gsap.set(reveals, { opacity: 0, y: dist });
          ScrollTrigger.batch(reveals, {
            start: c.isMobile ? 'top 96%' : 'top 90%',
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: dur, ease: 'power3.out', stagger, overwrite: true }),
          });

          if (c.isDesktop && !c.reduce) {
            const fontsReady = document.fonts?.ready ?? Promise.resolve();
            fontsReady.then(() => {
              if (killed) return;
              const h1 = document.querySelector<HTMLElement>('[data-hero-title]');
              if (h1) {
                try {
                  const sp = new SplitText(h1, { type: 'chars' });
                  splits.push(sp);
                  gsap.from(sp.chars, { yPercent: 115, opacity: 0, stagger: 0.018, duration: 0.7, ease: 'power3.out' });
                } catch { /* noop */ }
              }
              document.querySelectorAll<HTMLElement>('[data-kinetic]').forEach((h2) => {
                const isContact = h2.dataset.kinetic === 'settle';
                try {
                  const s = new SplitText(h2, { type: isContact ? 'chars' : 'words' });
                  splits.push(s);
                  const items = isContact ? s.chars : s.words;
                  gsap.from(items, {
                    opacity: 0,
                    yPercent: isContact ? 0 : 110,
                    y: isContact ? 24 : 0,
                    rotateZ: isContact ? 3 : 0,
                    stagger: isContact ? 0.014 : 0.05,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: h2, start: 'top 85%', once: true },
                  });
                } catch { /* noop */ }
              });
              ScrollTrigger.refresh();
            });
          }
          ScrollTrigger.refresh();
        },
      );
    }, 60);

    // Absolute safety net — nothing may stay hidden.
    safety = window.setTimeout(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        if (getComputedStyle(el).opacity !== '1') gsap.set(el, { opacity: 1, y: 0 });
      });
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        if (!el.dataset.done) runCount(el);
      });
    }, 3200);

    return () => {
      killed = true;
      clearTimeout(startT);
      clearTimeout(safety);
      splits.forEach((s) => { try { s.revert(); } catch { /* noop */ } });
      mm?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);
}
