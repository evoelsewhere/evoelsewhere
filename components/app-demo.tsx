'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FiArrowUp,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiEdit,
  FiFileText,
  FiFolder,
  FiGlobe,
  FiLayout,
  FiMenu,
  FiMessageSquare,
  FiMinus,
  FiPlus,
  FiSearch,
  FiShield,
  FiSquare,
  FiTerminal,
  FiX,
} from 'react-icons/fi';

import { Stream, Typewriter, useCounter, useInView, useTimeline } from '@/components/motion';

// A replica of the Evo Harness window that plays one real kind of task: the
// agent finds the code, edits it, runs the tests and reports back. Designed at
// 1200x720 and scaled to fit, so it stays crisp at any width.

const W = 1200;
const H = 720;
const COMPACT_W = 560;
const COMPACT_H = 680;

const PROMPT = 'web_fetch gives up on the first 429. Add a retry with backoff (three tries, honour Retry-After) and cover it with tests.';
const REPLY =
  'web_fetch now retries rate-limited and unavailable pages instead of failing on the first answer. send_with_retry retries 429 and 503 up to three times, waiting for Retry-After or 1 s, 2 s and 4 s. Four new tests cover it; all 5 tests in evo-web pass.';

// Step marks (ms). The comments say what each one shows.
const MARKS = [
  300, // 1 prompt starts typing
  3200, // 2 sent: user bubble, run starts
  3700, // 3 thinking
  5000, // 4 thought + first text
  5500, // 5 grep running
  6300, // 6 grep done, read running
  7000, // 7 read done, Files opens
  7700, // 8 second text, edit running
  8700, // 9 edit done, diff lands in the editor
  9400, // 10 cargo test running
  11400, // 11 tests pass
  11900, // 12 reply streams
  15200, // 13 run finished
];
const LOOP = 21000;

type Phase = 'running' | 'done';

function ToolRow({ icon, live, done, verb, detail, extra }: { icon: React.ReactNode; live: boolean; done: boolean; verb: [string, string]; detail: string; extra?: React.ReactNode }) {
  if (!live && !done) return null;
  return (
    <div className={`ad-tool ${done ? 'is-done' : 'is-live'}`}>
      <span className="ad-tool-icon">{icon}</span>
      <span className={done ? '' : 'shimmer'}>{done ? verb[1] : verb[0]}</span>
      <span className="ad-tool-detail">{detail}</span>
      {extra}
      {done ? <FiChevronRight className="ad-tool-chev" /> : <span className="ad-spinner" />}
    </div>
  );
}

const CODE_BEFORE = [
  ['k', 'pub async fn '], ['f', 'fetch_page'], ['p', '(client: &Client, url: &Url) -> Result<Page> {'],
];

function Code({ edited, play }: { edited: boolean; play: boolean }) {
  const lines: { n: number; html: React.ReactNode; added?: boolean; removed?: boolean }[] = [
    { n: 82, html: <><span className="t-c">{'/// Fetch a public page as Markdown.'}</span></> },
    { n: 83, html: <>{CODE_BEFORE.map(([k, t], i) => <span key={i} className={`t-${k}`}>{t}</span>)}</> },
    { n: 84, html: <>{'    '}<span className="t-f">check_public</span>(url)?;</> },
    edited
      ? { n: 85, added: true, html: <>{'    '}<span className="t-k">let</span> response = <span className="t-f">send_with_retry</span>(client, url, <span className="t-t">RetryPolicy</span>::<span className="t-f">default</span>()).<span className="t-k">await</span>?;</> }
      : { n: 85, html: <>{'    '}<span className="t-k">let</span> response = client.<span className="t-f">get</span>(url.<span className="t-f">clone</span>()).<span className="t-f">send</span>().<span className="t-k">await</span>?;</> },
    { n: 86, html: <>{'    '}<span className="t-k">if</span> !response.<span className="t-f">status</span>().<span className="t-f">is_success</span>() {'{'}</> },
    { n: 87, html: <>{'        '}<span className="t-k">return</span> <span className="t-t">Err</span>(<span className="t-t">FetchError</span>::<span className="t-t">Status</span>(response.<span className="t-f">status</span>()));</> },
    { n: 88, html: <>{'    }'}</> },
    { n: 89, html: <>{'    '}<span className="t-t">Page</span>::<span className="t-f">from_response</span>(response).<span className="t-k">await</span></> },
    { n: 90, html: <>{'}'}</> },
    { n: 91, html: <>{' '}</> },
  ];
  const added = [
    <><span className="t-c">{'/// Retries 429 and 503, waiting Retry-After or 1 s, 2 s, 4 s.'}</span></>,
    <><span className="t-k">async fn </span><span className="t-f">send_with_retry</span>(client: &<span className="t-t">Client</span>, url: &<span className="t-t">Url</span>, policy: <span className="t-t">RetryPolicy</span>) {'{'}</>,
    <>{'    '}<span className="t-k">let mut</span> attempt = <span className="t-n">0</span>;</>,
    <>{'    '}<span className="t-k">loop</span> {'{'}</>,
    <>{'        '}<span className="t-k">let</span> response = client.<span className="t-f">get</span>(url.<span className="t-f">clone</span>()).<span className="t-f">send</span>().<span className="t-k">await</span>?;</>,
    <>{'        '}<span className="t-k">if</span> !policy.<span className="t-f">should_retry</span>(response.<span className="t-f">status</span>(), attempt) {'{'}</>,
    <>{'            '}<span className="t-k">return</span> <span className="t-t">Ok</span>(response);</>,
    <>{'        }'}</>,
    <>{'        '}tokio::time::<span className="t-f">sleep</span>(policy.<span className="t-f">delay</span>(&amp;response, attempt)).<span className="t-k">await</span>;</>,
    <>{'        '}attempt += <span className="t-n">1</span>;</>,
    <>{'    }'}</>,
    <>{'}'}</>,
  ];
  return (
    <div className="ad-code">
      {lines.map((line) => (
        <div key={line.n} className={`ad-line ${line.added ? 'is-added' : ''}`}>
          <span className="ad-ln">{line.n}</span>
          <span className="ad-gutter" />
          <span className="ad-src">{line.html}</span>
        </div>
      ))}
      {edited &&
        added.map((html, i) => (
          <div key={`a${i}`} className="ad-line is-added is-new" style={{ animationDelay: play ? `${i * 70}ms` : '0ms' }}>
            <span className="ad-ln">{92 + i}</span>
            <span className="ad-gutter" />
            <span className="ad-src">{html}</span>
          </div>
        ))}
    </div>
  );
}

const TEST_LINES = [
  '   Compiling evo-web v0.1.0',
  '    Finished `test` profile in 6.84s',
  'running 5 tests',
  'test fetch::retries_429_then_succeeds ... ok',
  'test fetch::honours_retry_after ... ok',
  'test fetch::gives_up_after_three_tries ... ok',
  'test fetch::does_not_retry_404 ... ok',
  'test address::rejects_private_addresses ... ok',
];

function TestOutput({ step }: { step: number }) {
  // Lines print one by one while the tests run, all at once afterwards.
  const printed = useCounter(step === 10, TEST_LINES.length, 230);
  if (step < 10) return null;
  const shown = step >= 11 ? TEST_LINES.length : printed;
  return (
    <div className="ad-term">
      <div className="ad-term-cmd"><span>$</span> cargo test -p evo-web fetch</div>
      {TEST_LINES.slice(0, shown).map((line) => (
        <div key={line} className={line.endsWith('ok') ? 'ad-term-ok' : ''}>{line}</div>
      ))}
      {step >= 11 && <div className="ad-term-pass">test result: ok. 5 passed; 0 failed</div>}
    </div>
  );
}

function Working({ step }: { step: number }) {
  // Remounted for every run, so the clock starts from zero.
  const seconds = useCounter(step >= 2 && step < 13, 60, 1000);
  if (step < 2) return null;
  if (step >= 13) return <div className="ad-summary">Completed in 44s <FiChevronDown /></div>;
  return <div className="ad-summary shimmer">Working for {seconds}s</div>;
}

export function AppDemo() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame);
  const step = useTimeline(MARKS, { active: inView, loop: LOOP });
  const [width, setWidth] = useState(W);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  // On narrow screens only the chat is shown, at a size that stays readable.
  const compact = width < 720;
  const designWidth = compact ? COMPACT_W : W;
  const scale = width / designWidth;

  const phase: Phase = step >= 13 ? 'done' : 'running';
  const running = step >= 2 && phase === 'running';
  const filesOpen = step >= 7;

  return (
    <div className={`app-demo ${compact ? 'is-compact' : ''}`} ref={frame} style={{ height: (compact ? COMPACT_H : H) * scale }} aria-label="Evo Harness playing a task: it finds the code, edits it, runs the tests and reports back" role="img">
      <div className="ad-window" style={{ width: designWidth, height: compact ? COMPACT_H : H, transform: `scale(${scale})` }} aria-hidden="true">
        <div className="ad-titlebar">
          <FiMenu /><FiLayout /><FiChevronLeft className="dim" /><FiChevronRight className="dim" />
          <span className="ad-grow" />
          <FiBell /><FiMinus /><FiSquare /><FiX />
        </div>
        <div className="ad-body">
          <aside className="ad-sidebar">
            <div className="ad-search"><FiSearch /> Search chats… <kbd>Ctrl P</kbd></div>
            <div className="ad-nav"><FiEdit /> New chat</div>
            <div className="ad-nav"><FiCalendar /> Scheduler</div>
            <div className="ad-nav"><FiBarChart2 /> Usage</div>
            <div className="ad-nav"><FiCpu /> Customize</div>
            <div className="ad-group">Workspaces</div>
            <div className="ad-ws">evo-harness <FiChevronDown /></div>
            <div className="ad-chat is-active"><b className={running ? 'shimmer' : ''}>Retry web_fetch on 429</b> <span>now</span></div>
            <div className="ad-chat">Explain the session mesh <span>42m</span></div>
            <div className="ad-chat">Review the LSP installer <i className="ad-unread" /></div>
            <div className="ad-chat">Speed up chat search <span>1d</span></div>
            <div className="ad-ws">website <FiChevronDown /></div>
            <div className="ad-chat">Write the 4.0 release notes <span>1h</span></div>
            <div className="ad-chat">Fix the pricing layout <span>2d</span></div>
          </aside>

          <section className="ad-main">
            <div className="ad-head"><FiFolder /> evo-harness <FiChevronDown /><span className="ad-grow" /><span className="ad-ctx"><i style={{ width: step >= 12 ? '22%' : step >= 2 ? '9%' : '2%' }} /></span></div>
            <div className="ad-thread">
              {step >= 2 && <div className="ad-bubble">{PROMPT}</div>}
              <Working step={step} />
              {step >= 3 && (
                <div className={`ad-reason ${step >= 4 ? '' : 'shimmer'}`}>
                  <FiCpu /> {step >= 4 ? 'Thought for 1s' : 'Thinking'}
                  {step >= 4 && <span className="ad-reason-text">Find where web_fetch sends the request, then wrap it in a retry…</span>}
                </div>
              )}
              {step >= 4 && <p className="ad-text">I&apos;ll find where <code>web_fetch</code> sends its request.</p>}
              <ToolRow icon={<FiSearch />} live={step >= 5} done={step >= 6} verb={['Searching for', 'Searched for']} detail="fn fetch_page" />
              <ToolRow icon={<FiFileText />} live={step >= 6} done={step >= 7} verb={['Reading', 'Read']} detail="crates/evo-web/src/fetch.rs" />
              {step >= 8 && <p className="ad-text">One request, no retry. I&apos;ll route it through a small retry helper.</p>}
              <ToolRow icon={<FiEdit />} live={step >= 8} done={step >= 9} verb={['Editing', 'Edited']} detail="fetch.rs" extra={step >= 9 ? <span className="ad-diffstat"><b>+13</b> <i>−1</i></span> : null} />
              <ToolRow icon={<FiTerminal />} live={step >= 10} done={step >= 11} verb={['Running', 'Ran']} detail="cargo test -p evo-web fetch" />
              <TestOutput step={step} />
              {step >= 12 && (
                <p className="ad-text ad-reply">
                  <Stream text={REPLY} play={step >= 12} speed={38} />
                </p>
              )}
              {step >= 13 && <div className="ad-meta">gpt-5.1 · 44s · 79.1k tokens · 99% cached · $0.012</div>}
            </div>
            <div className="ad-composer">
              <div className="ad-input">
                {step < 2 ? (
                  step >= 1 ? <Typewriter text={PROMPT} play={step >= 1} speed={22} caret /> : <span className="ad-placeholder">Ask anything — @ to tag files, / for commands</span>
                ) : (
                  <span className="ad-placeholder">Ask anything — @ to tag files, / for commands</span>
                )}
              </div>
              <div className="ad-composer-bar">
                <FiPlus />
                <span className="ad-grow" />
                <span className="ad-model">GPT-5.1 <em>Medium</em> <FiChevronDown /></span>
                <span className="ad-perm"><FiShield /> Ask every time</span>
                <span className={`ad-send ${step === 1 ? 'is-ready' : ''} ${running ? 'is-busy' : ''}`}>{running ? <i /> : <FiArrowUp />}</span>
              </div>
            </div>
          </section>

          <section className={`ad-files ${filesOpen ? 'is-open' : ''}`}>
            <div className="ad-files-tabs"><span className="ad-tab"><FiFileText /> fetch.rs <FiX /></span></div>
            <div className="ad-files-path">crates/evo-web/src/fetch.rs {step >= 9 && <span className="ad-mod">M</span>}</div>
            <Code edited={step >= 9} play={step === 9} />
          </section>

          <nav className="ad-rail">
            <FiTerminal />
            <FiGlobe />
            <FiFolder className={filesOpen ? 'is-on' : ''} />
            <FiMessageSquare />
            <span className="ad-grow" />
            <FiCheck className={step >= 13 ? 'is-ok' : 'dim'} />
          </nav>
        </div>
      </div>
    </div>
  );
}
