import { useRef, useEffect, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  /** How strongly the element moves toward the cursor (0–1). Default 0.35. */
  strength?: number;
}

/**
 * Wraps any element so it subtly pulls toward the cursor when hovered.
 * On mouse-leave it springs back to its original position.
 */
export function MagneticButton({ children, strength = 0.35 }: MagneticButtonProps) {
  const ref       = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef    = useRef<number | null>(null);
  const hoverRef  = useRef(false);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startLoop = () => {
    const loop = () => {
      const el = ref.current;
      if (!el) return;

      const lerp = hoverRef.current ? 0.12 : 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

      el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;

      // Stop when close enough and not hovering
      const dist = Math.abs(targetRef.current.x - currentRef.current.x)
                 + Math.abs(targetRef.current.y - currentRef.current.y);
      if (!hoverRef.current && dist < 0.05) {
        el.style.transform = 'translate(0, 0)';
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(loop);
    }
  };

  const onEnter = () => {
    hoverRef.current = true;
    startLoop();
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width  / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    targetRef.current = { x: dx * strength, y: dy * strength };
  };

  const onLeave = () => {
    hoverRef.current = false;
    targetRef.current = { x: 0, y: 0 };
    startLoop();
  };

  return (
    <div
      ref={ref}
      className="inline-block"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
