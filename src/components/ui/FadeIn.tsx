import type { ReactNode, CSSProperties } from 'react';
import { useInView } from '../../hooks/useInView';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hiddenTranslate: Record<Direction, string> = {
  up: 'translateY(28px)',
  down: 'translateY(-28px)',
  left: 'translateX(28px)',
  right: 'translateX(-28px)',
  none: 'none',
};

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 650,
  threshold = 0.12,
  className = '',
}: FadeInProps) {
  const { ref, inView } = useInView({ threshold });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : hiddenTranslate[direction],
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
