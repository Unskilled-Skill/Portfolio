import { useEffect, useRef } from 'react';

/**
 * Custom cursor: small dot (instant) + outer ring (lagged).
 * - Expands on hover over interactive elements
 * - Compresses on click
 * - Hidden on touch devices
 * - Also drives the ambient background glow (replaces CursorGlow)
 */
export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch devices or reduced-motion preference: keep system cursor
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    // Hide system cursor site-wide
    document.documentElement.setAttribute('data-custom-cursor', '');

    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let glowX  = -200, glowY  = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element).closest(
        'a, button, [role="button"], input, textarea, label, select, [tabindex]'
      );
      if (interactive) {
        // Expanded state: dot hides, ring becomes filled accent circle
        dot.style.opacity  = '0';
        dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(0)`;
        ring.style.width   = '52px';
        ring.style.height  = '52px';
        ring.style.background = 'rgba(228,76,101,0.12)';
        ring.style.borderColor = 'rgba(228,76,101,0.7)';
      } else {
        // Default state
        dot.style.opacity  = '1';
        ring.style.width   = '36px';
        ring.style.height  = '36px';
        ring.style.background = 'transparent';
        ring.style.borderColor = 'rgba(255,255,255,0.25)';
      }
    };

    const onDown = () => {
      dot.style.transform  = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(0.5)`;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(0.75)`;
    };

    const onUp = () => {
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(1)`;
    };

    const animate = () => {
      // Dot: instant follow
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;

      // Ring: smooth lag
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;

      // Background glow: very slow lag
      glowX += (mouseX - glowX) * 0.05;
      glowY += (mouseY - glowY) * 0.05;
      glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove,  { passive: true });
    window.addEventListener('mouseover', onOver,  { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.removeAttribute('data-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Ambient glow — replaces CursorGlow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(228,76,101,0.07) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border"
        style={{
          width: '36px',
          height: '36px',
          borderColor: 'rgba(255,255,255,0.25)',
          background: 'transparent',
          willChange: 'transform',
          transition: 'width 200ms ease, height 200ms ease, background 200ms ease, border-color 200ms ease',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-accent"
        style={{
          width: '6px',
          height: '6px',
          willChange: 'transform',
          transition: 'opacity 150ms ease',
        }}
      />
    </>
  );
}
