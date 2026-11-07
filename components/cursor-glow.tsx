'use client';

import { useEffect, useRef } from 'react';

/** Cursor-following spotlight + grid reveal; also parallax-shifts the aurora. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const cur = { ...target };
    let raf = 0;
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      el.style.setProperty('--mx', `${cur.x}px`);
      el.style.setProperty('--my', `${cur.y}px`);
      const px = (cur.x / window.innerWidth - 0.5) * 2;
      const py = (cur.y / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty('--px', `${px * -40}px`);
      document.documentElement.style.setProperty('--py', `${py * -40}px`);
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = '1';
    };
    const leave = () => { el.style.opacity = '0'; };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
