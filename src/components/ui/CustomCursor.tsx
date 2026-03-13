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

    // Start hidden — JS owns opacity from here, React must not override it
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    glow.style.opacity = '0';
    // Start off-screen — JS owns transform from here
    dot.style.transform  = 'translate(-300px, -300px)';
    ring.style.transform = 'translate(-318px, -318px)';
    glow.style.transform = 'translate(-500px, -500px)';

    // Hide system cursor site-wide
    document.documentElement.setAttribute('data-custom-cursor', '');

    let mouseX = -300, mouseY = -300;
    let ringX  = -300, ringY  = -300;
    let glowX  = -300, glowY  = -300;
    let visible = false;
    let raf: number;

    const show = () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
      glow.style.opacity = '1';
      visible = true;
    };
    const hide = () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
      glow.style.opacity = '0';
      visible = false;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) show();
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

    const onBlur       = () => hide();
    const onFocus      = () => { if (visible) show(); };
    const onMouseLeave = () => hide();
    const onMouseEnter = () => { if (visible) show(); };

    window.addEventListener('mousemove', onMove,  { passive: true });
    window.addEventListener('mouseover', onOver,  { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('blur',  onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.removeAttribute('data-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('blur',  onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Ambient glow — replaces CursorGlow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full [@media(pointer:coarse)]:hidden [@media(prefers-reduced-motion:reduce)]:hidden"
        style={{
          background: 'radial-gradient(circle, rgba(228,76,101,0.07) 0%, transparent 70%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border [@media(pointer:coarse)]:hidden [@media(prefers-reduced-motion:reduce)]:hidden"
        style={{
          width: '36px',
          height: '36px',
          borderColor: 'rgba(255,255,255,0.25)',
          background: 'transparent',
          willChange: 'transform, opacity',
          transition: 'width 200ms ease, height 200ms ease, background 200ms ease, border-color 200ms ease',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-accent [@media(pointer:coarse)]:hidden [@media(prefers-reduced-motion:reduce)]:hidden"
        style={{
          width: '6px',
          height: '6px',
          willChange: 'transform, opacity',
          transition: 'opacity 150ms ease',
        }}
      />
    </>
  );
}
