import { useRef, type ReactNode } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    if (ref.current) ref.current.style.transition = 'transform 0.1s linear';
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width  / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    el.style.transform  = 'translate(0, 0)';
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
