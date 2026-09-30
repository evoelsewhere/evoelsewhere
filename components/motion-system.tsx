'use client';

import { useEffect } from 'react';

export function MotionSystem() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.setAttribute('data-reveal-visible', 'true'));
      return;
    }

    root.setAttribute('data-motion-ready', 'true');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).setAttribute('data-reveal-visible', 'true');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      root.removeAttribute('data-motion-ready');
    };
  }, []);

  return null;
}
