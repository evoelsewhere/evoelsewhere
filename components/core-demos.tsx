'use client';

import { useRef, useState } from 'react';
import {
  FiArrowUp,
  FiBookOpen,
  FiCheck,
  FiCommand,
  FiCpu,
  FiEdit3,
  FiFileText,
  FiGitMerge,
  FiGlobe,
  FiGrid,
  FiLayers,
  FiLink,
  FiLock,
  FiMaximize2,
  FiMinus,
  FiMonitor,
  FiMousePointer,
  FiPackage,
  FiPlay,
  FiRotateCcw,
  FiShield,
  FiSidebar,
  FiTerminal,
  FiX,
  FiZap,
} from 'react-icons/fi';

import { Logo } from '@/components/site-chrome';
import { Stream, Typewriter, useInView, useTimeline } from '@/components/motion';
import { WebBridgeDemo } from '@/components/webbridge-demo';

function useDemo(marks: number[], loop: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const step = useTimeline(marks, { active: inView, loop });
  return { ref, step };
}

/** The agent's virtual cursor: an arrow that glides to a point (percent of its stage) and a ring at a press. */
function VirtualCursor({ x, y, press }: { x: number; y: number; press: number }) {
  return (
    <span className="vc" style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">
      {press > 0 && <i key={press} className="vc-ring" />}
      <svg viewBox="0 0 17 17" width="13" height="13">
        <path d="M2.8 2.8 L16.02 7.25 L8.6 8.6 L7.25 16.02 Z" fill="#9ccbff" stroke="#9ccbff" strokeWidth="3.4" strokeLinejoin="round" />
        <path d="M2.8 2.8 L16.02 7.25 L8.6 8.6 L7.25 16.02 Z" fill="#1c2033" stroke="#1c2033" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

// ── Customize ─────────────────────────────────────────────────────────────

const CUSTOMIZE_TABS = [
  { id: 'skills', label: 'Skills', icon: <FiBookOpen /> },
  { id: 'connectors', label: 'Connectors', icon: <FiLink /> },
  { id: 'plugins', label: 'Plugins', icon: <FiPackage /> },
  { id: 'hooks', label: 'Hooks', icon: <FiZap /> },
] as const;

const SKILLS = [
  { name: 'review', note: 'Review the current diff', who: 'Project', runs: '42 runs', on: true },
  { name: 'release-notes', note: 'Draft notes since the last tag', who: 'Personal', runs: '9 runs', on: true },
  { name: 'xlsx', note: 'Build and check spreadsheets', who: 'Built-in', runs: '17 runs', on: true },
  { name: 'migrate-db', note: 'Write a reversible migration', who: 'Project', runs: 'only /migrate-db', on: false },
];
const CONNECTORS = [
  { name: 'GitHub', note: 'OAuth · 38 tools', state: 'on' },
  { name: 'Linear', note: 'OAuth · 21 tools', state: 'on' },
  { name: 'Postgres', note: 'stdio · asks before each call', state: 'ask' },
  { name: 'Figma', note: 'Sign in to connect', state: 'off' },
];
const PLUGINS = [
  { name: 'evo-dev', note: '4 skills · 2 commands · 1 hook', from: 'evoelsewhere/plugins', installed: true },
  { name: 'docs-kit', note: '3 skills · 1 subagent', from: 'evoelsewhere/plugins', installed: false },
  { name: 'qa-flows', note: '2 commands · Playwright connector', from: 'git+https://…/qa.git', installed: false },
];
const HOOKS = [
  { event: 'PreToolUse', what: 'block `rm -rf` outside the workspace', kind: 'command', last: 'blocked 2 calls' },
  { event: 'PostToolUse', what: 'run `cargo fmt` after edits to *.rs', kind: 'command', last: 'ran 14 times' },
  { event: 'Stop', what: 'POST a summary to the team webhook', kind: 'web request', last: 'ok · 120 ms' },
];

// Each tab shows for a while; the switch, install and run marks fall inside them.
const CUSTOM_MARKS = [300, 1400, 3300, 4400, 6300, 7600, 9300, 10600];
const CUSTOM_LOOP = 12300;

export function CustomizeShowcase() {
  const { ref, step } = useDemo(CUSTOM_MARKS, CUSTOM_LOOP);
  const tab = step >= 7 ? 3 : step >= 5 ? 2 : step >= 3 ? 1 : 0;
  return (
    <div className="core-demo cz" ref={ref} role="img" aria-label="The Customize page cycling through skills, connectors, plugins and hooks">
      <div className="cz-window" aria-hidden="true">
        <div className="cz-top">
          <span className="cz-title"><FiCommand /> Customize</span>
          <span className="cz-scope"><b className="is-on">Personal</b><b>Project</b></span>
        </div>
        <div className="cz-body">
          <nav className="cz-tabs">
            {CUSTOMIZE_TABS.map((t, i) => (
              <span key={t.id} className={`cz-tab ${i === tab ? 'is-on' : ''}`}>{t.icon} {t.label}</span>
            ))}
            <span className="cz-tab is-quiet"><FiCpu /> Subagents</span>
            <span className="cz-tab is-quiet"><FiFileText /> Instructions</span>
          </nav>
          <div className="cz-pane" key={tab}>
            {tab === 0 && SKILLS.map((s, i) => (
              <div key={s.name} className="cz-row fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="cz-main"><strong>/{s.name}</strong><small>{s.note}</small></div>
                <span className="cz-meta">{s.who} · {s.runs}</span>
                <span className={`fd-switch ${s.on || (i === 3 && step >= 2) ? 'is-on' : ''}`} />
              </div>
            ))}
            {tab === 1 && CONNECTORS.map((c, i) => (
              <div key={c.name} className="cz-row fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <i className={`cz-dot is-${c.name === 'Figma' && step >= 4 ? 'on' : c.state}`} />
                <div className="cz-main"><strong>{c.name}</strong><small>{c.name === 'Figma' && step >= 4 ? 'OAuth · 12 tools' : c.note}</small></div>
                {c.name === 'Figma' && <span className={`fd-btn ${step >= 4 ? 'is-chosen' : 'fd-btn-quiet'}`}>{step >= 4 ? <><FiCheck /> Connected</> : 'Connect'}</span>}
              </div>
            ))}
            {tab === 2 && PLUGINS.map((p, i) => (
              <div key={p.name} className="cz-row fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <FiPackage className="cz-ico" />
                <div className="cz-main"><strong>{p.name}</strong><small>{p.note}</small></div>
                <span className="cz-meta">{p.from}</span>
                {p.installed || (i === 1 && step >= 6) ? <span className="cz-tag"><FiCheck /> Installed</span> : <span className={`fd-btn ${i === 1 ? 'is-pressed' : 'fd-btn-quiet'}`}>Install</span>}
              </div>
            ))}
            {tab === 3 && HOOKS.map((h, i) => (
              <div key={h.event} className="cz-row fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <FiZap className="cz-ico" />
                <div className="cz-main"><strong>{h.event}</strong><small>{h.what}</small></div>
                <span className="cz-meta">{h.kind} · {i === 0 && step >= 8 ? <b className="cz-blocked">blocked just now</b> : h.last}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cz-foot">
          <span><FiShield /> Project hooks and connectors run only after you trust the project</span>
        </div>
      </div>
    </div>
  );
}

// ── Browser: in the app ───────────────────────────────────────────────────

// 1 prompt · 2 open page · 3 card · 4 cursor to search · 5 typed · 6 cursor to result · 7 click · 8 page shows PR · 9 cursor to Approve · 10 press · 11 reply
const BROWSER_MARKS = [400, 1300, 2000, 2800, 3800, 4800, 5500, 6200, 7400, 8100, 8900];
const BROWSER_LOOP = 13500;
const BROWSER_REPLY = 'The checks are green and the review is approved. PR #128 is ready to merge; want me to merge it?';

function InAppBrowserDemo() {
  const { ref, step } = useDemo(BROWSER_MARKS, BROWSER_LOOP);
  const cursor = step >= 9 ? { x: 79, y: 70 } : step >= 6 ? { x: 30, y: 52 } : step >= 4 ? { x: 44, y: 22 } : { x: 70, y: 86 };
  const press = step >= 10 ? 3 : step >= 7 ? 2 : step >= 4 ? 1 : 0;
  const label = step >= 9 ? 'Clicking ref_31 "Approve"' : step >= 6 ? 'Clicking ref_12' : step >= 4 ? 'Typing "retry fetch"' : 'Opening github.com';
  return (
    <div className="core-demo bd" ref={ref} role="img" aria-label="An agent drives a page in the app's own browser while a floating card shows it live with a virtual cursor">
      <div className="bd-chat" aria-hidden="true">
        <div className="bd-chat-head"><Logo size={16} /> Ship the retry fix</div>
        <div className="bd-thread">
          {step >= 1 && <div className="bd-bubble fade-in">Check PR #128 on GitHub and approve it if the checks pass.</div>}
          {step >= 2 && <div className="bd-tool fade-in"><FiGlobe /> <span className={step >= 3 ? '' : 'shimmer'}>{step >= 3 ? 'Opened' : 'Opening'}</span> github.com/evoelsewhere/evo-harness</div>}
          {step >= 5 && <div className="bd-tool fade-in"><FiMousePointer /> Clicked, typed, read the page <small>4 steps</small></div>}
          {step >= 10 && <div className="bd-tool fade-in"><FiCheck className="ok" /> Approved the review</div>}
          {step >= 11 && <p className="bd-reply"><Stream text={BROWSER_REPLY} play={step >= 11} speed={40} /></p>}
        </div>
        <div className="bd-composer"><span>Ask anything…</span><span className="bd-send"><FiArrowUp /></span></div>
      </div>

      {step >= 3 && (
        <div className="bd-card fade-in" aria-hidden="true">
          <div className="bd-card-bar">
            <FiGlobe /> <strong>Pull request #128</strong>
            <span className="bd-card-act">· {label}</span>
            <span className="grow" />
            <FiSidebar /><FiMinus />
          </div>
          <div className="bd-page">
            <div className="bd-page-top">
              <span className="bd-gh" />
              <span className={`bd-search ${step >= 5 ? 'is-typed' : ''}`}>{step >= 5 ? 'retry fetch' : 'Search or jump to…'}</span>
            </div>
            {step < 8 ? (
              <div className="bd-results">
                {['Retry 429 and 503 with Retry-After', 'Terminal loses focus after a split', 'Usage page rounds tiny costs'].map((t, i) => (
                  <div key={t} className={`bd-result ${i === 0 && step >= 6 ? 'is-hover' : ''}`}><FiGitMerge /> {t} <small>#{128 - i * 7}</small></div>
                ))}
              </div>
            ) : (
              <div className="bd-pr fade-in">
                <strong>Retry 429 and 503 with Retry-After</strong>
                <div className="bd-checks"><FiCheck /> 6 checks passed</div>
                <div className="bd-files">crates/evo-web/src/fetch.rs <b>+47</b> <i>−1</i></div>
                <div className="bd-review"><span className={`bd-approve ${step >= 10 ? 'is-done' : ''}`}>{step >= 10 ? <><FiCheck /> Approved</> : 'Approve'}</span></div>
              </div>
            )}
            <VirtualCursor x={cursor.x} y={cursor.y} press={press} />
          </div>
          <div className="bd-card-foot">desktop layout · 1280 × 800 · click in the card to take over</div>
        </div>
      )}
    </div>
  );
}

/** The two browsers: the app's own, which the agent drives, and yours, through WebBridge. */
export function BrowserShowcase() {
  const [mode, setMode] = useState<'app' | 'bridge'>('app');
  return (
    <div className="bs">
      <div className="bs-switch" role="tablist" aria-label="Browser mode">
        <button role="tab" aria-selected={mode === 'app'} className={mode === 'app' ? 'is-on' : ''} onClick={() => setMode('app')}><FiMonitor /> In the app</button>
        <button role="tab" aria-selected={mode === 'bridge'} className={mode === 'bridge' ? 'is-on' : ''} onClick={() => setMode('bridge')}><FiLink /> Your browser · WebBridge</button>
      </div>
      {mode === 'app' ? <InAppBrowserDemo /> : <WebBridgeDemo />}
    </div>
  );
}

// ── Computer App Control ──────────────────────────────────────────────────

const CELLS = [
  ['Region', 'Q2', 'Q3', 'Change'],
  ['North', '11 820', '12 400', '+4.9%'],
  ['South', '9 310', '9 870', '+6.0%'],
  ['East', '7 640', '8 105', '+6.1%'],
  ['West', '10 050', '10 420', '+3.7%'],
];
// Cells the agent fills, in order: [row, col, at step]
const FILLS: [number, number, number][] = [
  [1, 2, 6], [2, 2, 7], [3, 2, 8], [4, 2, 9],
];
// 1 prompt · 2 approval · 3 allowed · 4 attach + card · 5 cursor to C2 · 6–9 fill C2..C5 · 10 read-back · 11 reply
const APP_MARKS = [400, 1300, 2700, 3300, 4100, 4800, 5500, 6200, 6900, 7700, 8500];
const APP_LOOP = 13000;
const APP_REPLY = 'Q3 is in for all four regions; each cell read back as typed. Budget.xlsx stays unsaved for you to check.';

export function ComputerAppDemo() {
  const { ref, step } = useDemo(APP_MARKS, APP_LOOP);
  const filling = FILLS.filter(([, , at]) => step >= at).length;
  const active = step >= 5 && step < 10 ? FILLS[Math.min(filling, FILLS.length - 1)] : null;
  const cursor = active ? { x: 58, y: 34 + active[0] * 11 } : step >= 10 ? { x: 58, y: 78 } : { x: 85, y: 92 };
  return (
    <div className="core-demo cad" ref={ref} role="img" aria-label="The agent fills a spreadsheet in Excel while Excel stays off your screen; a card shows it live">
      <div className="cad-chat" aria-hidden="true">
        <div className="bd-chat-head"><Logo size={16} /> Quarterly budget</div>
        <div className="bd-thread">
          {step >= 1 && <div className="bd-bubble fade-in">Put the Q3 numbers from this email into Budget.xlsx.</div>}
          {step >= 2 && step < 4 && (
            <div className={`cad-approve fade-in ${step >= 3 ? 'is-answered' : ''}`}>
              <div className="cad-approve-head"><FiShield /> Let the agent act in an app?</div>
              <ul>
                <li>attach Budget.xlsx — Excel</li>
                <li>type &quot;12 400&quot; (6 chars) into C2</li>
                <li>key enter ×3 · type 3 values</li>
              </ul>
              <div className="fd-confirm-actions">
                <span className={`fd-btn ${step >= 3 ? 'is-chosen is-pressed' : ''}`}>Allow</span>
                <span className="fd-btn fd-btn-quiet">Allow for this chat</span>
                <span className="fd-btn fd-btn-quiet">Deny</span>
              </div>
            </div>
          )}
          {step >= 4 && <div className="bd-tool fade-in"><FiGrid /> Used an app · attach, snapshot</div>}
          {step >= 6 && <div className="bd-tool fade-in"><FiGrid /> <span className={step >= 10 ? '' : 'shimmer'}>{step >= 10 ? 'Used an app' : 'Using an app'}</span> · type, key enter</div>}
          {step >= 10 && <div className="cad-readback fade-in"><FiCheck /> changed: C2:C5 value=12 400 · 9 870 · 8 105 · 10 420</div>}
          {step >= 11 && <p className="bd-reply"><Stream text={APP_REPLY} play={step >= 11} speed={40} /></p>}
        </div>
      </div>

      <div className="cad-right" aria-hidden="true">
        {step >= 4 && (
          <div className="cad-card fade-in">
            <div className="bd-card-bar">
              <FiGrid /> <strong>Budget.xlsx - Excel</strong>
              <span className="bd-card-act">· {step >= 10 ? 'Reading back' : active ? `Type "${CELLS[active[0]][2]}"` : 'Snapshot'}</span>
              <span className="grow" />
              <span className="cad-stop">Stop</span><FiMaximize2 /><FiX />
            </div>
            <div className="cad-sheet">
              <div className="cad-formula"><b>{active ? `C${active[0] + 1}` : 'C2'}</b><span>{active ? CELLS[active[0]][2] : ''}</span></div>
              <div className="cad-grid">
                {CELLS.map((row, r) => row.map((cell, c) => {
                  const fill = FILLS.find(([fr, fc]) => fr === r && fc === c);
                  const shown = !fill || step >= fill[2] || (c === 3 && step >= 10);
                  const isChange = c === 3 && r > 0;
                  return (
                    <span key={`${r}-${c}`} className={`cad-cell ${r === 0 ? 'is-head' : ''} ${active && active[0] === r && c === 2 ? 'is-active' : ''} ${fill && step >= fill[2] ? 'is-new' : ''}`}>
                      {isChange ? (step >= 10 ? cell : '') : shown ? cell : ''}
                    </span>
                  );
                }))}
              </div>
              <VirtualCursor x={cursor.x} y={cursor.y} press={filling} />
            </div>
          </div>
        )}
        <div className="cad-screens">
          <div className="cad-screen">
            <span className="cad-screen-label"><FiMonitor /> Your screen</span>
            <div className="cad-yours"><FiTerminal /> your editor, still in front</div>
            <small><FiMousePointer /> your mouse and keyboard stay yours</small>
          </div>
          <div className={`cad-parked ${step >= 4 && step < 12 ? 'is-on' : ''}`}>
            <span className="cad-screen-label"><FiLayers /> Off screen</span>
            <div className="cad-ghost"><FiGrid /> Excel</div>
            <small>back where it was when the turn ends</small>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Office documents ──────────────────────────────────────────────────────

// 1–4 slides build · 5 select area · 6 instruction typed · 7 sent · 8 chart redrawn · 9 version saved
const OFFICE_MARKS = [500, 1300, 2100, 2900, 4200, 5000, 7000, 7800, 8600];
const OFFICE_LOOP = 12500;

export function OfficeDemo() {
  const { ref, step } = useDemo(OFFICE_MARKS, OFFICE_LOOP);
  const built = Math.min(step, 4);
  const selecting = step >= 5 && step < 8;
  const bars = step >= 8;
  return (
    <div className="core-demo od" ref={ref} role="img" aria-label="A deck the agent builds appears slide by slide in the Office viewer; an area is selected and edited with an instruction">
      <div className="od-window" aria-hidden="true">
        <div className="od-top">
          <span className="od-file"><FiLayers /> Q3-review.pptx</span>
          <span className="od-views"><b className="is-on">Normal</b><b>Sorter</b><b>Reading</b></span>
          <span className="grow" />
          <span className={`od-select ${step >= 5 ? 'is-on' : ''}`}><FiEdit3 /> Select an area to edit</span>
          <span className="od-hist"><FiRotateCcw /> {step >= 9 ? 'v4' : 'v3'}</span>
        </div>
        <div className="od-body">
          <div className="od-thumbs">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`od-thumb ${i < built ? 'is-built' : 'is-pending'} ${i === 1 ? 'is-on' : ''}`}>
                {i < built ? <i /> : <em className="shimmer">…</em>}
              </span>
            ))}
          </div>
          <div className="od-stage">
            <div className="od-slide">
              {built < 2 ? (
                <div className="od-placeholder"><span /><span /><span className="od-placeholder-block shimmer" /></div>
              ) : (
              <>
              <strong className="fade-in">Revenue by region</strong>
              <small>Q3 compared with Q2</small>
              <div className={`od-chart ${bars ? 'is-bars' : 'is-pie'}`}>
                {bars ? (
                  [62, 49, 41, 52].map((h, i) => <span key={i} className="od-bar" style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />)
                ) : (
                  <span className="od-pie" />
                )}
              </div>
              </>
              )}
              {selecting && <span className="od-area fade-in"><b>1</b></span>}
            </div>
            {step < 4 && <div className="od-building"><FiPlay /> Building slide {built + 1} of 4…</div>}
          </div>
        </div>
        <div className="od-composer">
          {step >= 5 && step < 7 && <span className="od-chip fade-in">Annotations: 1 <FiX /></span>}
          <span className="od-input">
            {step >= 6 && step < 7 ? <Typewriter text="Make this a bar chart, one bar per region." play={step >= 6} speed={28} caret /> : step >= 7 ? <span className="od-sent"><FiCheck /> Edited the chart · saved as v4</span> : <span className="od-ph">Ask about this deck…</span>}
          </span>
        </div>
      </div>
      <div className="od-facts" aria-hidden="true">
        <span><FiFileText /> .docx</span><span><FiLayers /> .pptx</span><span><FiGrid /> .xlsx</span><span><FiLock /> no Office needed</span>
      </div>
    </div>
  );
}
