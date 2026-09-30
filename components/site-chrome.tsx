'use client';

import Link from 'next/link';
import { useState } from 'react';

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
        <Link href="/#workspace" onClick={() => setOpen(false)}>Workspace</Link>
        <Link href="/#control" onClick={() => setOpen(false)}>App control</Link>
        <Link href="/#webbridge" onClick={() => setOpen(false)}>WebBridge</Link>
        <Link href="/privacy" onClick={() => setOpen(false)}>Privacy</Link>
        <a href="https://github.com/evoelsewhere">GitHub</a>
        <Link className="nav-cta" href="/#download" onClick={() => setOpen(false)}>Get EvoFlux ↗</Link>
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
        <Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}
