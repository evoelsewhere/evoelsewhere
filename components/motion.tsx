'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from 'react';

const REDUCED = '(prefers-reduced-motion: reduce)';

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/** The reader asked the system for less motion. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
}

/** Whether `ref` is on screen (with a margin), updated as the page scrolls. */
export function useInView<T extends Element>(ref: RefObject<T | null>, { once = false, margin = '0px 0px -10% 0px' } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, once, margin]);
  return inView;
}

/**
 * A scripted demo: `marks` are the times (ms) of its steps. Returns how many
 * steps have happened. Plays while `active`, pauses off screen, and loops
 * after `loop` ms. With reduced motion it shows the finished state.
 */
export function useTimeline(marks: number[], { active, loop }: { active: boolean; loop: number }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const elapsed = useRef(0);

  useEffect(() => {
    if (reduced || !active) return;
    let started = performance.now() - elapsed.current;
    let frame = 0;
    const tick = (now: number) => {
      let t = now - started;
      if (t >= loop) {
        started = now;
        t = 0;
      }
      elapsed.current = t;
      let next = 0;
      while (next < marks.length && marks[next] <= t) next++;
      setStep((current) => (current === next ? current : next));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, loop, marks, reduced]);

  return reduced ? marks.length : step;
}

/**
 * Counts up from 0 every `every` ms while `play` is on (restarting each time
 * it turns on); stops at `to`. Shows `to` at once with reduced motion.
 */
export function useCounter(play: boolean, to: number, every: number) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!play || reduced) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setCount(index);
      if (index >= to) window.clearInterval(timer);
    }, every);
    // A fresh run starts from nothing (the first tick sets 1).
    const reset = window.setTimeout(() => setCount((current) => (index === 0 ? 0 : current)), 0);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(reset);
    };
  }, [every, play, reduced, to]);
  if (!play) return 0;
  return reduced ? to : Math.min(count, to);
}

/** Types `text` out once `play` turns on; shows it whole with reduced motion. */
export function Typewriter({ text, play, speed = 28, caret = false }: { text: string; play: boolean; speed?: number; caret?: boolean }) {
  const count = useCounter(play, text.length, speed);
  return (
    <>
      {text.slice(0, count)}
      {caret && play && count < text.length && <span className="caret" aria-hidden="true" />}
    </>
  );
}

/** Streams `text` a word at a time, like a model reply. */
export function Stream({ text, play, speed = 45 }: { text: string; play: boolean; speed?: number }) {
  const words = text.split(/(\s+)/);
  const count = useCounter(play, words.length, speed);
  return <>{words.slice(0, count).join('')}</>;
}

/** A number that eases from 0 to `to` while `play` is on. */
export function Ticker({ to, play, format = (n: number) => String(Math.round(n)), duration = 1200 }: { to: number; play: boolean; format?: (n: number) => string; duration?: number }) {
  const steps = 40;
  const count = useCounter(play, steps, duration / steps);
  const p = count / steps;
  return <>{format(to * (1 - Math.pow(1 - p, 3)))}</>;
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'article' | 'header' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
