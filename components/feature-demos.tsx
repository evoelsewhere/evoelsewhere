'use client';

import { useRef } from 'react';
import {
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiCode,
  FiCornerDownLeft,
  FiCpu,
  FiFileText,
  FiGitBranch,
  FiLock,
  FiPackage,
  FiSearch,
  FiTerminal,
  FiZap,
} from 'react-icons/fi';

import { Ticker, Typewriter, useInView, useTimeline } from '@/components/motion';

function useDemo(marks: number[], loop: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const step = useTimeline(marks, { active: inView, loop });
  return { ref, step };
}

// ── Subagents ─────────────────────────────────────────────────────────────

const SUB_MARKS = [400, 1000, 1600, 2200, 2900, 3700, 4500, 5300, 6300, 7300];

export function SubagentDemo() {
  const { ref, step } = useDemo(SUB_MARKS, 11000);
  const rows = [
    { at: 2, icon: <FiFileText />, text: 'Read crates/evo-web/tests' },
    { at: 3, icon: <FiSearch />, text: 'Searched for Retry-After' },
    { at: 4, icon: <FiFileText />, text: 'Read src/fetch.rs' },
  ];
  return (
    <div className="fd fd-sub" ref={ref}>
      {step >= 1 && (
        <div className="fd-agent">
          <div className="fd-agent-head">
            <FiCpu /> <strong>explore</strong> <span>Find how fetch errors are tested</span>
            <em className={step >= 5 ? 'is-done' : 'shimmer'}>{step >= 5 ? 'done · 4s' : 'working'}</em>
          </div>
          <div className="fd-agent-steps">
            {rows.map((row) => step >= row.at && <div key={row.text} className="fd-step fade-in">{row.icon} {row.text}</div>)}
            {step >= 5 && <div className="fd-report fade-in">Report: tests mock the client in <code>tests/fetch.rs</code>; no retry case yet.</div>}
          </div>
        </div>
      )}
      {step >= 6 && (
        <div className="fd-agent fade-in">
          <div className="fd-agent-head">
            <FiCpu /> <strong>general</strong> <span>Implement it in a worktree</span>
            <em className={step >= 7 ? 'is-done' : 'shimmer'}>{step >= 7 ? 'done · 31s' : 'working'}</em>
          </div>
          {step >= 7 && (
            <div className="fd-worktree fade-in">
              <FiGitBranch /> Kept worktree <code>agent/retry-fetch</code> <b>+47</b> <i>−1</i>
              <span className="fd-grow" />
              <span className={`fd-btn ${step >= 8 ? 'is-pressed' : ''}`}>Apply</span>
              <span className="fd-btn fd-btn-quiet">Discard</span>
            </div>
          )}
        </div>
      )}
      {step >= 9 && <div className="fd-toast fade-in"><FiCheck /> Applied 2 files to the workspace</div>}
    </div>
  );
}

// ── Models ────────────────────────────────────────────────────────────────

const MODELS = [
  { name: 'GPT-5.1', provider: 'OpenAI' },
  { name: 'Gemini 3 Pro', provider: 'Google' },
  { name: 'DeepSeek V4', provider: 'DeepSeek' },
  { name: 'Kimi K2', provider: 'Moonshot' },
  { name: 'GLM-4.6', provider: 'Z.ai' },
  { name: 'Qwen3 Coder', provider: 'Ollama · local' },
];
const MODEL_MARKS = [600, 1400, 2000, 2600, 3200, 3800, 4600, 6400];

export function ModelDemo() {
  const { ref, step } = useDemo(MODEL_MARKS, 9000);
  const open = step >= 1 && step < 7;
  const hover = Math.min(Math.max(step - 1, 0), 5);
  const chosen = step >= 7 ? MODELS[5] : MODELS[0];
  return (
    <div className="fd fd-models" ref={ref}>
      <div className={`fd-menu ${open ? 'is-open' : ''}`}>
        <div className="fd-menu-search"><FiSearch /> Search models</div>
        {MODELS.map((model, i) => (
          <div key={model.name} className={`fd-menu-item ${open && i === hover ? 'is-hover' : ''}`}>
            <span>{model.name}</span>
            <small>{model.provider}</small>
            {chosen.name === model.name && <FiCheck />}
          </div>
        ))}
      </div>
      <div className="fd-composer">
        <span className="fd-composer-text">Ask anything…</span>
        <div className="fd-composer-bar">
          <span className="fd-grow" />
          <span className={`fd-model ${open ? 'is-open' : ''}`}>{chosen.name} <em>{step >= 7 ? 'Off' : 'Medium'}</em> <FiChevronDown /></span>
        </div>
      </div>
      <div className="fd-facts">
        <span><FiZap /> via models.dev</span>
        <span>{step >= 7 ? 'runs on this computer' : 'limits · prices · thinking'}</span>
      </div>
    </div>
  );
}

// ── Approvals ─────────────────────────────────────────────────────────────

const APPROVE_MARKS = [500, 1300, 3400, 3900, 5200];

export function ApprovalDemo() {
  const { ref, step } = useDemo(APPROVE_MARKS, 8500);
  return (
    <div className="fd fd-approve" ref={ref}>
      {step >= 1 && (
        <div className={`fd-confirm fade-in ${step >= 3 ? 'is-answered' : ''}`}>
          <div className="fd-confirm-head"><FiTerminal /> Run a command?</div>
          <code className="fd-confirm-cmd"><Typewriter text="cargo build --release && ./scripts/sign.sh" play={step >= 1} speed={24} /></code>
          <div className="fd-confirm-actions">
            <span className={`fd-btn ${step === 2 ? 'is-pressed' : ''} ${step >= 3 ? 'is-chosen' : ''}`}>Allow once <kbd><FiCornerDownLeft /></kbd></span>
            <span className="fd-btn fd-btn-quiet">Always allow</span>
            <span className="fd-btn fd-btn-quiet">Reject <kbd>Esc</kbd></span>
          </div>
        </div>
      )}
      {step >= 4 && (
        <div className="fd-step fade-in"><FiTerminal /> <span className={step >= 5 ? '' : 'shimmer'}>{step >= 5 ? 'Ran' : 'Running'}</span> cargo build --release {step >= 5 && <FiCheck className="ok" />}</div>
      )}
      <div className="fd-chips">
        <span><FiLock /> denied: **/.env</span>
        <span>max 10 min per command</span>
        <span>project trust</span>
      </div>
    </div>
  );
}

// ── Customize ─────────────────────────────────────────────────────────────

const SLASH = [
  { name: '/review', kind: 'skill', hint: 'Review the current diff' },
  { name: '/release-notes', kind: 'command', hint: 'Draft notes since the last tag' },
  { name: '/refactor', kind: 'plugin: evo-dev', hint: 'Plan a safe refactor' },
  { name: '/compact', kind: 'built-in', hint: 'Summarise older turns' },
];
const CUSTOM_MARKS = [500, 900, 1300, 2100, 2900];

export function CustomizeDemo() {
  const { ref, step } = useDemo(CUSTOM_MARKS, 8000);
  const typed = step >= 3 ? '/re' : step >= 2 ? '/r' : step >= 1 ? '/' : '';
  const items = SLASH.filter((s) => (typed.length > 1 ? s.name.startsWith(typed) : true));
  return (
    <div className="fd fd-custom" ref={ref}>
      <div className="fd-connectors">
        <span><i className="on" /> GitHub</span>
        <span><i className="on" /> Linear</span>
        <span><i className="ask" /> Postgres · ask</span>
        <span><FiPackage /> evo-dev plugin</span>
      </div>
      {step >= 1 && (
        <div className="fd-slash fade-in">
          {items.map((item, i) => (
            <div key={item.name} className={`fd-slash-item ${(step >= 4 ? 0 : -1) === i ? 'is-hover' : ''}`}>
              <strong>{item.name}</strong>
              <span>{item.hint}</span>
              <small>{item.kind}</small>
            </div>
          ))}
        </div>
      )}
      <div className="fd-composer">
        <span className="fd-composer-text">
          {step >= 5 ? <><span className="fd-token">/review</span> the retry change</> : typed ? <>{typed}<span className="caret" /></> : 'Ask anything — / for commands'}
        </span>
      </div>
    </div>
  );
}

// ── Code intelligence ─────────────────────────────────────────────────────

const LSP_MARKS = [500, 1500, 2600, 3600, 4600];

export function CodeIntelDemo() {
  const { ref, step } = useDemo(LSP_MARKS, 8500);
  return (
    <div className="fd fd-lsp" ref={ref}>
      <div className="fd-code">
        <div><span className="ln">41</span><span className="t-k">let</span> wait = <span className="t-f">retry_after</span>(&amp;response);</div>
        <div><span className="ln">42</span><span className="t-k">if</span> attempt &gt; <span className="t-n">3</span> {'{'} <span className="t-k">return</span> Err(error); {'}'}</div>
        <div><span className="ln">43</span>sleep(<span className={step >= 1 && step < 5 ? 'fd-squiggle' : ''}>wait</span>).<span className="t-k">await</span>;</div>
        <div><span className="ln">44</span>attempt += <span className="t-n">1</span>;</div>
      </div>
      {step >= 2 && step < 5 && (
        <div className="fd-hover fade-in">
          <strong>error[E0308]: mismatched types</strong>
          <span>expected <code>Duration</code>, found <code>Option&lt;Duration&gt;</code></span>
          <small>rust-analyzer</small>
        </div>
      )}
      {step >= 3 && step < 5 && <div className="fd-step fade-in"><FiCode /> <span className="shimmer">lsp · definition of retry_after</span></div>}
      {step >= 5 && <div className="fd-step fade-in"><FiCheck className="ok" /> Fixed: <code>sleep(wait.unwrap_or(BACKOFF))</code> · 0 diagnostics</div>}
      <div className="fd-chips">
        <span>21 languages</span>
        <span>installed on demand</span>
        <span>changed lines in the gutter</span>
      </div>
    </div>
  );
}

// ── Scheduler and memory ──────────────────────────────────────────────────

const SCHED_MARKS = [300, 2900, 3500, 4300, 5300];

export function SchedulerDemo() {
  const { ref, step } = useDemo(SCHED_MARKS, 9500);
  return (
    <div className="fd fd-sched" ref={ref}>
      <div className="fd-prompt">
        <Typewriter text="Every weekday at 9:00, summarize open pull requests in two lines each." play={step >= 1} speed={26} caret />
      </div>
      {step >= 2 && (
        <div className="fd-step fade-in"><FiCalendar /> <span className={step >= 3 ? '' : 'shimmer'}>{step >= 3 ? 'Created scheduled task' : 'Creating scheduled task'}</span></div>
      )}
      {step >= 3 && (
        <div className="fd-task fade-in">
          <div><strong>Morning PR digest</strong><small>Weekdays · 09:00 · evo-harness</small></div>
          <span className="fd-switch is-on" />
          <div className="fd-task-next">Next run tomorrow 09:00</div>
        </div>
      )}
      {step >= 4 && (
        <div className="fd-memory fade-in"><FiFileText /> Remembered: <em>keeps PR summaries to two lines</em></div>
      )}
    </div>
  );
}

// ── Usage and cost ────────────────────────────────────────────────────────

const DAYS = [
  [22, 10, 6],
  [34, 12, 4],
  [18, 20, 8],
  [46, 14, 10],
  [30, 26, 6],
  [12, 8, 14],
  [38, 22, 12],
];

export function UsageDemo() {
  const { ref, step } = useDemo([300, 1800], 9000);
  const play = step >= 1;
  return (
    <div className="fd fd-usage" ref={ref}>
      <div className="fd-usage-totals">
        <div><small>Spend · 7 days</small><strong>$<Ticker to={4.82} play={play} format={(n) => n.toFixed(2)} /></strong></div>
        <div><small>Tokens</small><strong><Ticker to={3.4} play={play} format={(n) => `${n.toFixed(1)}M`} /></strong></div>
        <div><small>Cached</small><strong><Ticker to={99} play={play} format={(n) => `${Math.round(n)}%`} /></strong></div>
      </div>
      <div className="fd-bars">
        {DAYS.map((day, i) => (
          <div key={i} className="fd-bar" style={{ transitionDelay: `${i * 60}ms` }}>
            {day.map((value, j) => (
              <span key={j} className={`seg seg-${j}`} style={{ height: play ? `${value * 1.6}px` : '0px', transitionDelay: `${i * 70 + j * 40}ms` }} />
            ))}
          </div>
        ))}
      </div>
      <div className="fd-legend"><span><i className="seg-0" /> gpt-5.1</span><span><i className="seg-1" /> gemini-3-pro</span><span><i className="seg-2" /> qwen3-coder</span></div>
    </div>
  );
}
