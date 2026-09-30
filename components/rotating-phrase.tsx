'use client';

import { useEffect, useState } from 'react';

const phrases = ['the handoff.', 'the busywork.', 'the context switch.'];

export function RotatingPhrase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % phrases.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="mimo-hero-rotator" aria-hidden="true"><span key={phrases[index]}>{phrases[index]}</span></span>;
}
