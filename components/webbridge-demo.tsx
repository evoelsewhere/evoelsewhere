'use client';

import { useRef } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiCheck,
  FiChevronDown,
  FiCircle,
  FiGlobe,
  FiLock,
  FiMoreVertical,
  FiPlus,
  FiRotateCw,
  FiShield,
  FiStar,
  FiX,
} from 'react-icons/fi';

import { Logo } from '@/components/site-chrome';
import { Stream, Typewriter, useInView, useTimeline } from '@/components/motion';

// A browser tab you are signed in to, the WebBridge extension, and Evo
// Harness: share the tab, pick what matters, it crosses a policy-checked
// relay, and the agent works with it. You release the tab at the end.

const ISSUES = [
  { n: 412, title: 'web_fetch gives up on the first 429', label: 'bug', who: 'mai@example.com' },
  { n: 408, title: 'Terminal loses focus after a split', label: 'desktop', who: 'an@example.com' },
  { n: 401, title: 'models.dev cache never refreshes offline', label: 'runtime', who: 'khoa@example.com' },
  { n: 397, title: 'Plugin marketplace example is out of date', label: 'docs', who: 'linh@example.com' },
  { n: 389, title: 'Usage page rounds tiny costs to $0', label: 'desktop', who: 'tuan@example.com' },
];

const REPLY = '#412 is the root cause of the other two failures in CI, so I will start there: retry 429 and 503 with Retry-After, then add tests. #408 and #401 are independent; want me to open a worktree for each?';

// 1 popover · 2 share · 3 select 1 · 4 select 3 · 5 send · 6 relay checks ·
// 7 arrives · 8 prompt typed · 9 sent · 10 tool · 11 reply · 12 released
const MARKS = [600, 1700, 2500, 2900, 3600, 4300, 5600, 6300, 8400, 9000, 9800, 14200];
const LOOP = 17500;

export function WebBridgeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const step = useTimeline(MARKS, { active: inView, loop: LOOP });
  const shared = step >= 2 && step < 12;
  const selected = (i: number) => (step >= 4 ? i < 3 : step >= 3 ? i === 0 : false);

  return (
    <div className="wbd" ref={ref} aria-label="WebBridge demo: a shared browser tab sends three selected issues through WebBridge to an Evo Harness chat" role="img">
      {/* ── Browser ── */}
      <div className="wbd-browser" aria-hidden="true">
        <div className="wbd-tabs">
          <span className="wbd-dots"><i /><i /><i /></span>
          <span className="wbd-tab is-active"><FiGlobe /> Issues · evo-harness <FiX /></span>
          <span className="wbd-tab"><FiGlobe /> Release notes <FiX /></span>
          <FiPlus className="wbd-newtab" />
        </div>
        <div className="wbd-toolbar">
          <FiArrowLeft /><FiArrowRight className="dim" /><FiRotateCw />
          <div className="wbd-omnibox"><FiLock /> github.com/evoelsewhere/evo-harness/issues <FiStar className="wbd-star" /></div>
          <span className={`wbd-ext ${step >= 1 ? 'is-on' : ''} ${shared ? 'is-shared' : ''}`}><Logo size={16} /></span>
          <FiMoreVertical />
        </div>
        {shared && <div className="wbd-sharebar fade-in"><span className="wbd-live" /> Shared with Evo Harness <span className="grow" /><b className={step >= 11 ? 'is-pressed' : ''}>Release</b></div>}
        {step >= 12 && <div className="wbd-sharebar is-released fade-in"><FiCheck /> Tab released · the agent no longer sees it</div>}

        <div className="wbd-page">
          <div className="wbd-page-head">
            <strong>Issues</strong>
            <span className="wbd-filter">is:open label:bug,desktop,runtime</span>
            <span className="wbd-newissue">New issue</span>
          </div>
          <div className="wbd-list">
            <div className="wbd-row wbd-row-head"><FiCircle /> 5 Open <span className="grow" />Author <FiChevronDown /> Label <FiChevronDown /></div>
            {ISSUES.map((issue, i) => (
              <div key={issue.n} className={`wbd-row ${selected(i) ? 'is-selected' : ''}`}>
                <FiCircle className="wbd-open" />
                <div className="wbd-row-main">
                  <strong>{issue.title}</strong>
                  <small>#{issue.n} opened by <span className={step >= 6 && selected(i) ? 'wbd-redacted' : ''}>{issue.who}</span></small>
                </div>
                <span className={`wbd-label l-${issue.label}`}>{issue.label}</span>
              </div>
            ))}
          </div>
          {step >= 3 && step < 12 && <div className="wbd-selcount fade-in">{step >= 4 ? '3 issues selected' : '1 issue selected'}</div>}
        </div>

        {step >= 1 && step < 3 && (
          <div className="wbd-popover fade-in">
            <div className="wbd-pop-head"><Logo size={18} /> <strong>WebBridge</strong> <span className="wbd-paired"><i /> Paired</span></div>
            <p>Share this tab with your Evo Harness chat?</p>
            <span className={`wbd-pop-btn ${step >= 2 ? 'is-pressed' : ''}`}>Share this tab</span>
          </div>
        )}
      </div>

      {/* ── Relay ── */}
      <div className={`wbd-relay ${step >= 5 && step < 12 ? 'is-active' : ''}`} aria-hidden="true">
        <div className="wbd-wire">
          {step >= 5 && step < 7 && <span className="wbd-packet">3 issues</span>}
        </div>
        <div className="wbd-relay-card">
          <FiShield />
          <strong>WebBridge</strong>
          <ul>
            <li className={step >= 5 ? 'ok' : ''}><FiCheck /> paired session</li>
            <li className={step >= 6 ? 'ok' : ''}><FiCheck /> tab in scope</li>
            <li className={step >= 6 ? 'ok' : ''}><FiCheck /> 3 emails redacted</li>
          </ul>
        </div>
        <div className="wbd-wire" />
      </div>

      {/* ── Evo Harness ── */}
      <div className="wbd-app" aria-hidden="true">
        <div className="wbd-app-bar"><Logo size={16} /> Evo Harness <span className="grow" /><span className="wbd-app-chat">Triage open issues</span></div>
        <div className="wbd-thread">
          {step >= 9 && (
            <div className="wbd-bubble fade-in">
              <span className="wbd-chip"><FiGlobe /> evo-harness/issues · 3 issues</span>
              Plan fixes for these, most urgent first.
            </div>
          )}
          {step >= 10 && (
            <div className="wbd-tool fade-in"><FiGlobe /> <span className={step >= 11 ? '' : 'shimmer'}>{step >= 11 ? 'Read browser context' : 'Reading browser context'}</span> <small>3 items · emails redacted</small></div>
          )}
          {step >= 11 && <p className="wbd-reply"><Stream text={REPLY} play={step >= 11} speed={34} /></p>}
        </div>
        <div className="wbd-composer">
          {step >= 7 && step < 9 && <span className="wbd-chip fade-in"><FiGlobe /> evo-harness/issues · 3 issues <FiX /></span>}
          <div className="wbd-input">
            {step >= 8 && step < 9 ? <Typewriter text="Plan fixes for these, most urgent first." play={step >= 8} speed={30} caret /> : <span className="wbd-ph">Ask anything…</span>}
          </div>
          <div className="wbd-composer-bar"><FiPlus /><span className="grow" /><span>GPT-5.1</span><span className={`wbd-send ${step === 8 ? 'is-ready' : ''}`}><FiArrowUp /></span></div>
        </div>
      </div>
    </div>
  );
}
