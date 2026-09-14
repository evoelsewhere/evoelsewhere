'use client';

import Link from 'next/link';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      window.localStorage.setItem('evoelsewhere-theme', next ? 'dark' : 'light');
    } catch {
      // Keep the toggle usable when browser storage is unavailable.
    }
    setDark(next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
}

export function Brand() {
  return (
    <span className="brand">
      <span className="brand-tile" aria-hidden="true"><span className="brand-glyph" /></span>
      <span className="brand-word">evo<span>elsewhere</span></span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header shell">
      <Link href="/" aria-label="evoelsewhere home"><Brand /></Link>
      <nav className={open ? 'header-nav open' : 'header-nav'} aria-label="Primary navigation">
        <Link href="/#features" onClick={() => setOpen(false)}>Features</Link>
        <Link href="/enterprise" onClick={() => setOpen(false)}>Teams</Link>
        <Link href="/evo-agent-specification-driven-development" onClick={() => setOpen(false)}>EASD</Link>
        <Link href="/privacy" onClick={() => setOpen(false)}>Privacy</Link>
        <a href="https://github.com/evoelsewhere">GitHub</a>
        <Link className="nav-cta" href="/#download" onClick={() => setOpen(false)}>Download ↘</Link>
        <ThemeToggle />
      </nav>
      <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span /><span />
      </button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <Link href="/" aria-label="evoelsewhere home"><Brand /></Link>
      <p>Build elsewhere. Own the outcome.</p>
      <nav aria-label="Footer navigation">
        <a href="https://github.com/evoelsewhere/evoflux">EvoFlux</a>
        <a href="https://github.com/evoelsewhere/evo-conductor">Conductor</a>
        <Link href="/enterprise">Teams</Link>
        <Link href="/evo-agent-specification-driven-development">EASD</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}
