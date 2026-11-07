'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiArrowDown, FiGithub } from 'react-icons/fi';

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="64 64 896 896" aria-hidden="true">
      <rect x="64" y="64" width="896" height="896" rx="200" fill="#171717" />
      <g transform="translate(512 512) scale(9.739) rotate(-30) scale(1.25)" fill="none" strokeWidth="8" strokeLinecap="round">
        <path d="M8 -17H-9A8 8 0 0 0 -17 -9V5" stroke="#ffffff" />
        <path d="M8 -17H-9A8 8 0 0 0 -17 -9V5" stroke="#ffffff" transform="rotate(180)" />
        <path d="M-3 0H3" stroke="#0072F5" />
      </g>
    </svg>
  );
}

export function Brand() {
  return (
    <span className="brand">
      <Logo />
      <span className="brand-word">Evo Harness</span>
    </span>
  );
}

const LINKS = [
  ['/#engine', 'Engine'],
  ['/#features', 'Features'],
  ['/#webbridge', 'WebBridge'],
  ['/#download', 'Download'],
] as const;

/** The top bar, which turns into a floating pill once the page scrolls. */
export function SiteHeader() {
  const [floating, setFloating] = useState(false);
  useEffect(() => {
    const update = () => setFloating(window.scrollY > 120);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className={`site-header ${floating ? 'is-floating' : ''}`}>
      <div className="site-header-inner">
        <Link href="/" aria-label="Evo Harness home"><Brand /></Link>
        <span className="pill-tag">v4</span>
        <nav aria-label="Primary navigation">
          {LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <span className="grow" />
        <a className="btn btn-ghost btn-sm" href="https://github.com/evoelsewhere/evo-harness"><FiGithub /> <span className="hide-sm">GitHub</span></a>
        <Link className="btn btn-primary btn-sm" href="/#download"><FiArrowDown /> Download</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <Link href="/" aria-label="Evo Harness home"><Brand /></Link>
        <p>Open source · Apache-2.0 · © 2026 evoelsewhere</p>
        <nav aria-label="Footer navigation">
          <a href="https://github.com/evoelsewhere/evo-harness">GitHub</a>
          <a href="https://github.com/evoelsewhere/evo-webbridge">WebBridge</a>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
