import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

interface ScrambleTextProps {
  text: string;
  delay?: number;       // ms before animation starts
  duration?: number;    // ms for full decode
  className?: string;
}

export function ScrambleText({ text, delay = 0, duration = 900, className = '' }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(() => randomString(text.length));
  const frameRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  function randomString(length: number) {
    return Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // How many chars are fully resolved (cascade left to right)
        const resolved = Math.floor(progress * text.length);

        setDisplayed(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < resolved) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      {displayed}
    </span>
  );
}
