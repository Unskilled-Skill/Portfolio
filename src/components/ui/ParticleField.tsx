import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  accent: boolean;
}

const PARTICLE_COUNT = 55;
const MOUSE_RADIUS   = 130;
const MOUSE_STRENGTH = 0.5;
const MAX_SPEED      = 1.5;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width     = window.innerWidth;
    let height    = window.innerHeight;
    let scrollY   = window.scrollY;
    let lastScrollY = scrollY;
    let raf: number;

    canvas.width  = width;
    canvas.height = height;

    const makeParticle = (): Particle => {
      const baseVx = (Math.random() - 0.5) * 0.25;
      const baseVy = (Math.random() - 0.5) * 0.25;
      return {
        x:      Math.random() * width,
        y:      Math.random() * height,
        vx:     baseVx,
        vy:     baseVy,
        baseVx,
        baseVy,
        size:    Math.random() * 1.4 + 0.3,
        opacity: Math.random() * 0.12 + 0.03,
        accent:  Math.random() < 0.15,
      };
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, makeParticle);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onResize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Shift particles with scroll so they feel world-space
      scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      for (const p of particles) {
        p.y -= scrollDelta;
        // Rewrap after scroll shift
        if (p.y < -10)         p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      for (const p of particles) {
        const dx   = p.x - mouseRef.current.x;
        const dy   = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Drift back toward base velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Cap speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10)         p.x = width  + 10;
        if (p.x > width  + 10) p.x = -10;
        if (p.y < -10)         p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const color = p.accent
          ? `rgba(228, 76, 101, ${p.opacity * 1.2})`
          : `rgba(255, 255, 255, ${p.opacity})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 [@media(prefers-reduced-motion:reduce)]:hidden"
    />
  );
}
