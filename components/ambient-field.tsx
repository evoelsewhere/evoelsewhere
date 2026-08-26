'use client';

import { useEffect, useRef } from 'react';

export function AmbientField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePointer(event: PointerEvent) {
      const field = fieldRef.current;
      if (!field) return;
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / Math.max(window.innerHeight, 1);
      field.style.setProperty('--ambient-x', `${Math.round(x * 100)}%`);
      field.style.setProperty('--ambient-y', `${Math.round(y * 100)}%`);
      field.style.setProperty('--ambient-shift-x', `${(x - 0.5) * 26}px`);
      field.style.setProperty('--ambient-shift-y', `${(y - 0.5) * 18}px`);
    }

    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  return (
    <div ref={fieldRef} className="ambient-field" aria-hidden="true">
      <span className="ambient-orb ambient-orb-coral" />
      <span className="ambient-orb ambient-orb-violet" />
      <span className="ambient-orb ambient-orb-blue" />
      <span className="ambient-cursor" />
    </div>
  );
}
