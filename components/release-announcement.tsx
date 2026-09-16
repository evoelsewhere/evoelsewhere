'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowDown, FiCpu, FiExternalLink, FiFileText, FiGitBranch, FiUsers, FiX } from 'react-icons/fi';

const RELEASE_VERSION = '2.0.3';
const STORAGE_KEY = `evoflux-release-${RELEASE_VERSION}-dismissed`;

export function ReleaseAnnouncement() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage can be unavailable in private or hardened browsing modes.
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'true') return;
    } catch {
      // Show the announcement when persistence is unavailable.
    }
    const timer = window.setTimeout(() => setOpen(true), 550);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [dismiss, open]);

  if (!open) return null;

  return (
    <div className="release-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
      <section ref={dialogRef} className="release-modal" role="dialog" aria-modal="true" aria-labelledby="release-modal-title" aria-describedby="release-modal-description">
        <button ref={closeRef} className="release-modal-close" type="button" aria-label="Close release announcement" onClick={dismiss}><FiX /></button>

        <div className="release-modal-visual">
          <div className="release-modal-stamp"><span>Maintenance release</span><strong>2.0.3</strong></div>
        </div>

        <div className="release-modal-content">
          <p className="release-modal-kicker"><i /> Released · September 15, 2026</p>
          <h2 id="release-modal-title">EvoFlux 2.0.3<br />is ready.</h2>
          <p id="release-modal-description" className="release-modal-intro">A focused maintenance update for updater recovery, coding skill routing, and EASD workspace correctness.</p>

          <div className="release-modal-highlights" aria-label="Release highlights">
            <article><FiFileText aria-hidden="true" /><div><strong>Updater recovery</strong><p>See update progress, understand failures, and keep the desktop window usable when an update cannot complete.</p></div></article>
            <article><FiUsers aria-hidden="true" /><div><strong>Coding skill routing</strong><p>Thirteen overlapping coding skills are consolidated into four focused hubs with refreshed references and eval coverage.</p></div></article>
            <article><FiCpu aria-hidden="true" /><div><strong>Consistent observation</strong><p>Shared routing hubs now own observation limits so coding workflows use predictable context budgets.</p></div></article>
            <article><FiGitBranch aria-hidden="true" /><div><strong>EASD workspace correctness</strong><p>Runs keep the workspace selected for the run instead of inheriting one from a linked chat request.</p></div></article>
          </div>

          <div className="release-modal-actions">
            <Link className="release-modal-primary" href="/#download" onClick={dismiss}><span>Download 2.0.3</span><FiArrowDown aria-hidden="true" /></Link>
            <a className="release-modal-secondary" href="https://github.com/evoelsewhere/evoflux/releases/tag/v2.0.3" onClick={dismiss}><span>Release notes</span><FiExternalLink aria-hidden="true" /></a>
          </div>
          <p className="release-modal-footnote">macOS · Windows · Linux · Apache-2.0</p>
        </div>
      </section>
    </div>
  );
}
